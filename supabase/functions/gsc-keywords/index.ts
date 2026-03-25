const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface GSCRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

async function getAccessToken(serviceAccount: any, scopes: string[]): Promise<string> {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: serviceAccount.client_email,
    scope: scopes.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const encoder = new TextEncoder();
  const headerB64 = btoa(String.fromCharCode(...encoder.encode(JSON.stringify(header))))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const claimB64 = btoa(String.fromCharCode(...encoder.encode(JSON.stringify(claim))))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const signInput = `${headerB64}.${claimB64}`;

  const pemContents = serviceAccount.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\n/g, '');
  const binaryKey = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    encoder.encode(signInput)
  );

  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const jwt = `${signInput}.${sigB64}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    throw new Error(`Token exchange failed: ${err}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const serviceAccountJson = Deno.env.get('GSC_SERVICE_ACCOUNT_JSON');
    if (!serviceAccountJson) {
      throw new Error('GSC_SERVICE_ACCOUNT_JSON is not configured');
    }

    const serviceAccount = JSON.parse(serviceAccountJson);
    
    const url = new URL(req.url);
    const mode = url.searchParams.get('mode') || 'keywords';
    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    if (mode === 'analytics') {
      const accessToken = await getAccessToken(serviceAccount, ['https://www.googleapis.com/auth/analytics.readonly']);
      const propertyId = url.searchParams.get('ga_property') || '';

      if (!propertyId) {
        throw new Error('GA4 property ID not provided');
      }

      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(endDate.getMonth() - 16);

      const res = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dateRanges: [{ startDate: formatDate(startDate), endDate: formatDate(endDate) }],
            dimensions: [{ name: 'pagePath' }],
            metrics: [
              { name: 'screenPageViews' },
              { name: 'activeUsers' },
            ],
            limit: 500,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`GA4 API error [${res.status}]: ${err}`);
      }

      const data = await res.json();
      const pages: Record<string, { views: number; users: number }> = {};

      for (const row of (data.rows || [])) {
        const path = row.dimensionValues[0].value;
        pages[path] = {
          views: parseInt(row.metricValues[0].value, 10),
          users: parseInt(row.metricValues[1].value, 10),
        };
      }

      return new Response(
        JSON.stringify({ pages }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const siteUrl = 'sc-domain:aarvakdiagnostics.com';
    const accessToken = await getAccessToken(serviceAccount, ['https://www.googleapis.com/auth/webmasters.readonly']);

    if (mode === 'pages') {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(endDate.getMonth() - 16);

      const res = await fetch(
        `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
            dimensions: ['page'],
            rowLimit: 500,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`GSC API error [${res.status}]: ${err}`);
      }

      const data = await res.json();
      const pages: Record<string, { clicks: number; impressions: number }> = {};

      for (const row of (data.rows || []) as GSCRow[]) {
        const page = row.keys[0]
          .replace('https://www.aarvakdiagnostics.com', '')
          .replace('https://aarvakdiagnostics.com', '') || '/';
        pages[page] = { clicks: row.clicks, impressions: row.impressions };
      }

      return new Response(
        JSON.stringify({ pages }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Default: keyword mode
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 28);
    
    const prevEndDate = new Date(startDate);
    prevEndDate.setDate(prevEndDate.getDate() - 1);
    const prevStartDate = new Date(prevEndDate);
    prevStartDate.setDate(prevStartDate.getDate() - 28);

    const fetchGSC = async (start: string, end: string) => {
      const res = await fetch(
        `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startDate: start,
            endDate: end,
            dimensions: ['query', 'page'],
            rowLimit: 500,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`GSC API error [${res.status}]: ${err}`);
      }

      return res.json();
    };

    const [currentData, previousData] = await Promise.all([
      fetchGSC(formatDate(startDate), formatDate(endDate)),
      fetchGSC(formatDate(prevStartDate), formatDate(prevEndDate)),
    ]);

    const keywordMap: Record<string, { position: number; clicks: number; impressions: number; ctr: number; page: string }> = {};
    
    for (const row of (currentData.rows || []) as GSCRow[]) {
      const keyword = row.keys[0];
      const page = row.keys[1];
      if (!keywordMap[keyword] || row.position < keywordMap[keyword].position) {
        keywordMap[keyword] = {
          position: Math.round(row.position * 10) / 10,
          clicks: row.clicks,
          impressions: row.impressions,
          ctr: Math.round(row.ctr * 10000) / 100,
          page: page.replace('https://www.aarvakdiagnostics.com', '').replace('https://aarvakdiagnostics.com', '') || '/',
        };
      }
    }

    const prevMap: Record<string, number> = {};
    for (const row of (previousData.rows || []) as GSCRow[]) {
      const keyword = row.keys[0];
      if (!prevMap[keyword] || row.position < prevMap[keyword]) {
        prevMap[keyword] = Math.round(row.position * 10) / 10;
      }
    }

    const keywords = Object.entries(keywordMap).map(([keyword, data]) => {
      const prevPosition = prevMap[keyword] ?? null;
      let trend: 'up' | 'down' | 'stable' | 'new' = 'new';
      let change = 0;
      
      if (prevPosition !== null) {
        change = Math.round((prevPosition - data.position) * 10) / 10;
        if (change > 0.5) trend = 'up';
        else if (change < -0.5) trend = 'down';
        else trend = 'stable';
      }

      return {
        keyword,
        position: data.position,
        clicks: data.clicks,
        impressions: data.impressions,
        ctr: data.ctr,
        page: data.page,
        prevPosition,
        change,
        trend,
      };
    });

    keywords.sort((a, b) => a.position - b.position);

    return new Response(
      JSON.stringify({
        keywords,
        period: { start: formatDate(startDate), end: formatDate(endDate) },
        totalKeywords: keywords.length,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('GSC Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
