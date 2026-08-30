import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Droplet, Home, Loader2, Utensils } from "lucide-react";
import useSEO from "@/hooks/useSEO";
import { PortalTest, portal } from "@/lib/patientPortal";



/** Health concerns are matched automatically against each package's name, description and inclusions. */
const CONCERNS: { id: string; label: string; keywords: string[] }[] = [
  { id: "full-body", label: "Full body checkup", keywords: ["wellness", "supreme", "advanced", "essential", "basic", "full body"] },
  { id: "diabetes", label: "Diabetes & sugar", keywords: ["diabet", "hba1c", "blood sugar", "glucose"] },
  { id: "heart", label: "Heart & cholesterol", keywords: ["heart", "lipid", "cholesterol", "cpk", "cardiac"] },
  { id: "thyroid", label: "Thyroid & hormones", keywords: ["thyroid", "tsh", "t3", "t4"] },
  { id: "liver", label: "Liver", keywords: ["liver", "lft", "sgot", "sgpt", "bilirubin", "amylase", "lipase"] },
  { id: "kidney", label: "Kidney", keywords: ["kidney", "kft", "creatinine", "urea", "urine"] },
  { id: "vitamins", label: "Vitamins & deficiency", keywords: ["vitamin", "b12", "vit. d", "iron", "ferritin"] },
  { id: "anaemia", label: "Anaemia & blood count", keywords: ["cbc", "complete blood count", "haemoglobin", "hemoglobin", "esr", "iron"] },
  { id: "immunity", label: "Immunity & inflammation", keywords: ["crp", "esr", "ra factor", "ige", "allergy", "immun"] },
  { id: "pollution", label: "Pollution & lungs", keywords: ["pollution", "ige", "allerg"] },
  { id: "pre-marriage", label: "Pre-marriage & infection screening", keywords: ["marriage", "hiv", "hbsag", "hcv", "std", "hepatitis"] },
  { id: "cancer", label: "Cancer markers", keywords: ["psa", "ca-125", "ca/psa", "tumour", "tumor", "cancer"] },
];

const haystackOf = (t: PortalTest) =>
  [t.name, t.category ?? "", t.description ?? "", ...(t.parameters ?? [])].join(" ").toLowerCase();

const concernsOf = (t: PortalTest) => {
  const hay = haystackOf(t);
  return CONCERNS.filter((c) => c.keywords.some((k) => hay.includes(k))).map((c) => c.id);
};


const Packages = () => {
  useSEO({
    title: "Health Checkup Packages | Book by Health Concern | Aarvak Diagnostics",
    description:
      "Book health checkup packages by health concern — diabetes, heart, thyroid, liver, kidney, vitamins and full body. Transparent pricing and reports in 6–8 hours.",
    canonical: "/packages",
  });

  const [tests, setTests] = useState<PortalTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const [concern, setConcern] = useState("all");

  useEffect(() => {
    let alive = true;
    portal<{ tests: PortalTest[] }>("catalog")
      .then((r) => alive && setTests(r.tests ?? []))
      .catch(() => alive && setFailed(true))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  /** Only show concern chips that actually match at least one live package. */
  const concernOptions = useMemo(() => {
    const counts = new Map<string, number>();
    tests.forEach((t) => concernsOf(t).forEach((id) => counts.set(id, (counts.get(id) ?? 0) + 1)));
    return CONCERNS.filter((c) => (counts.get(c.id) ?? 0) > 0).map((c) => ({
      ...c,
      count: counts.get(c.id) ?? 0,
    }));
  }, [tests]);

  const visible = useMemo(
    () => (concern === "all" ? tests : tests.filter((t) => concernsOf(t).includes(concern))),
    [tests, concern],
  );

  const resetFilters = () => setConcern("all");

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-[13px] font-medium transition ${
      active
        ? "border-secondary bg-secondary text-white"
        : "border-border bg-background text-muted-foreground hover:border-secondary/60"
    }`;


  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="px-2 md:px-3">
        <div className="relative w-full overflow-hidden rounded-2xl">
          <img
            src="/images/package.png"
            alt="Health checkup packages at Aarvak Diagnostics"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
          <div className="relative z-10 mx-auto max-w-5xl px-4 py-14 text-center text-primary-foreground md:py-20">
            <p className="text-xs font-medium uppercase tracking-[0.25em] opacity-80">Packages</p>
            <h1 className="mt-3 text-2xl font-bold leading-tight md:text-4xl lg:text-[44px]">
              Health Checkup Packages
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm opacity-90 md:text-base">
              Choose by what you want checked — sugar, heart, thyroid, liver, kidney, vitamins or a
              full body checkup — and complete your booking online in a few steps.
            </p>
          </div>
        </div>
      </section>


      {/* Filters */}
      <section className="px-4 pt-10 md:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-border bg-muted/50 p-4 md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What do you want checked?
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => setConcern("all")} className={chip(concern === "all")}>
              All packages
            </button>
            {concernOptions.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setConcern(concern === c.id ? "all" : c.id)}
                className={chip(concern === c.id)}
              >
                {c.label} ({c.count})
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* Results */}
      <section className="px-4 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="flex items-center justify-center gap-3 py-20 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" /> Loading packages…
            </div>
          ) : failed ? (
            <div className="rounded-2xl border border-border p-10 text-center">
              <p className="text-[15px] text-muted-foreground">
                We could not load the packages right now. Please refresh, or call us on{" "}
                <a href="tel:+919266333711" className="font-semibold text-secondary">
                  +91 92663 33711
                </a>
                .
              </p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-muted-foreground">
                Showing {visible.length} of {tests.length} packages
              </p>
              {visible.length === 0 ? (
                <div className="rounded-2xl border border-border p-10 text-center">
                  <p className="text-[15px] text-muted-foreground">
                    No packages match these filters.
                  </p>
                  <button onClick={resetFilters} className="mt-4 font-semibold text-secondary">
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {visible.map((t) => {
                    const hasOffer = Boolean(t.mrp) && Number(t.mrp) > Number(t.price);
                    const off = hasOffer
                      ? Math.round(((Number(t.mrp) - Number(t.price)) / Number(t.mrp)) * 100)
                      : 0;
                    return (
                      <article
                        key={t.id}
                        className="flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:shadow-md"
                      >
                        <div className="relative p-6 text-white" style={{ background: "linear-gradient(135deg, #1b75a6, #0c3f5d)" }}>
                          {hasOffer && (
                            <span className="absolute right-4 top-4 rounded-full bg-aarvak-yellow px-3 py-1 text-xs font-bold text-foreground">
                              {off}% off
                            </span>
                          )}
                          <h2 className="pr-20 text-lg font-bold leading-snug">{t.name}</h2>
                          <p className="mt-1 text-xs opacity-80">{t.category}</p>
                          <div className="mt-4 flex items-end gap-2">
                            <span className="text-2xl font-bold">₹ {Number(t.price).toLocaleString("en-IN")}</span>
                            {hasOffer && (
                              <span className="text-sm line-through opacity-70">
                                ₹ {Number(t.mrp).toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          {t.description && (
                            <p className="mb-4 text-sm text-muted-foreground">{t.description}</p>
                          )}
                          {t.parameters?.length ? (
                            <ul className="mb-5 space-y-2">
                              {t.parameters.slice(0, 6).map((p) => (
                                <li key={p} className="flex items-start gap-2 text-sm text-foreground">
                                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" />
                                  <span>{p}</span>
                                </li>
                              ))}
                              {t.parameters.length > 6 && (
                                <li className="pl-6 text-sm text-muted-foreground">
                                  + {t.parameters.length - 6} more inclusions
                                </li>
                              )}
                            </ul>
                          ) : null}

                          <div className="mb-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                            {t.turnaround && (
                              <span className="inline-flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" /> {t.turnaround}
                              </span>
                            )}
                            {t.sample_type && (
                              <span className="inline-flex items-center gap-1.5">
                                <Droplet className="h-3.5 w-3.5" /> {t.sample_type}
                              </span>
                            )}
                            {t.home_collection && (
                              <span className="inline-flex items-center gap-1.5">
                                <Home className="h-3.5 w-3.5" /> Home collection
                              </span>
                            )}
                            {t.fasting_required && (
                              <span className="inline-flex items-center gap-1.5">
                                <Utensils className="h-3.5 w-3.5" /> Fasting required
                              </span>
                            )}
                          </div>

                          <Link
                            to={`/book/${t.slug}`}
                            className="mt-auto block rounded-xl bg-secondary py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
                          >
                            Book Now
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Help strip */}
      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 rounded-2xl bg-muted p-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-xl font-bold text-foreground">Not sure which package suits you?</h2>
            <p className="mt-1 text-[15px] text-muted-foreground">
              Our team can help you choose the right checkup for your age and health history.
            </p>
          </div>
          <a
            href="tel:+919266333711"
            className="rounded-full bg-secondary px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Call +91 92663 33711
          </a>
        </div>
      </section>
    </div>
  );
};

export default Packages;
