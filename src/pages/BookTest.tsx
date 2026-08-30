import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BadgePercent, CheckCircle, Clock, Droplet, Gift, Home, Loader2, Lock, MapPin, Navigation, ShieldCheck, Utensils } from "lucide-react";
import useSEO from "@/hooks/useSEO";
import { toast } from "@/hooks/use-toast";
import {
  BookingPolicy,
  PortalCenter,
  PortalOrder,
  PortalPromo,
  PortalTest,
  distanceKm,
  friendlyError,
  getPatientProfile,
  getPatientToken,
  portal,
  setPatientSession,
} from "@/lib/patientPortal";

type Step = "details" | "otp" | "payment" | "done";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none focus:border-secondary";

const minDateTime = () => {
  const d = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const BookTest = () => {
  const { slug = "" } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState<PortalTest | null>(null);
  const [policy, setPolicy] = useState<BookingPolicy | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [busy, setBusy] = useState(false);

  const profile = getPatientProfile();
  const [step, setStep] = useState<Step>("details");
  const [name, setName] = useState(profile?.name ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [otp, setOtp] = useState("");
  const [collectionType, setCollectionType] = useState<"home_collection" | "walk_in">("home_collection");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [notes, setNotes] = useState("");
  const [order, setOrder] = useState<PortalOrder | null>(null);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [pointsSpent, setPointsSpent] = useState(0);

  const [promos, setPromos] = useState<PortalPromo[]>([]);
  const [promoInput, setPromoInput] = useState("");
  const [applied, setApplied] = useState<{ code: string; discount: number } | null>(null);
  const [promoBusy, setPromoBusy] = useState(false);

  const [rewards, setRewards] = useState<PortalRewards | null>(null);
  const [usePoints, setUsePoints] = useState(false);
  const [pointsInput, setPointsInput] = useState(0);

  const [centers, setCenters] = useState<PortalCenter[]>([]);
  const [centerId, setCenterId] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoState, setGeoState] = useState<"idle" | "locating" | "done" | "denied">("idle");
  const [showAllCenters, setShowAllCenters] = useState(false);
  const [centerPickedManually, setCenterPickedManually] = useState(false);

  useSEO({
    title: test ? `Book ${test.name} in Gurugram | Aarvak Diagnostics` : "Book a Test | Aarvak Diagnostics",
    description: test
      ? `Book ${test.name} at Aarvak Diagnostics Gurugram for ₹${test.price}. Home sample collection, quick reports and secure online booking.`
      : "Book diagnostic tests and full body health checkup packages online at Aarvak Diagnostics, Sector 67 Gurugram.",
    canonical: `/book/${slug}`,
    noindex: true,
  });

  useEffect(() => {
    let alive = true;
    setLoading(true);
    Promise.all([
      portal<{ test: PortalTest }>("test", { slug }),
      portal<{ policy: BookingPolicy }>("policy"),
    ])
      .then(([t, p]) => {
        if (!alive) return;
        setTest(t.test);
        setPolicy(p.policy);
      })
      .catch(() => alive && setNotFound(true))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [slug]);

  // Load enabled collection centres once
  useEffect(() => {
    let alive = true;
    portal<{ centers: PortalCenter[] }>("centers")
      .then((r) => alive && setCenters(r.centers ?? []))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  // Promo codes available for this order value
  useEffect(() => {
    if (!test) return;
    let alive = true;
    portal<{ promos: PortalPromo[] }>("promos", { subtotal: test.price })
      .then((r) => alive && setPromos(r.promos ?? []))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [test]);

  const applyPromo = async (raw: string) => {
    const code = raw.trim().toUpperCase();
    if (!code || !test) return;
    setPromoBusy(true);
    try {
      const res = await portal<{ discount: number; promo: { code: string } }>("quote_promo", { code, subtotal: test.price });
      setApplied({ code: res.promo.code, discount: res.discount });
      setPromoInput(res.promo.code);
      toast({ title: `Promo ${res.promo.code} applied`, description: `You saved ₹${res.discount}.` });
    } catch (e) {
      setApplied(null);
      toast({ title: friendlyError(e), variant: "destructive" });
    } finally {
      setPromoBusy(false);
    }
  };

  const payable = Math.max(0, (test?.price ?? 0) - (applied?.discount ?? 0));

  const locate = () => {
    if (!("geolocation" in navigator)) {
      setGeoState("denied");
      return;
    }
    setGeoState("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoState("done");
      },
      () => setGeoState("denied"),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 },
    );
  };

  // Ask for location only when the patient chooses to visit a centre
  useEffect(() => {
    if (collectionType === "walk_in" && geoState === "idle") locate();
  }, [collectionType, geoState]);

  /** Centres sorted by distance from the patient when coordinates are known. */
  const rankedCenters = useMemo(() => {
    const withDistance = centers.map((c) => ({
      center: c,
      km:
        coords && c.latitude != null && c.longitude != null
          ? distanceKm(coords.lat, coords.lng, Number(c.latitude), Number(c.longitude))
          : null,
    }));
    if (!coords) return withDistance;
    return [...withDistance].sort((a, b) => (a.km ?? Infinity) - (b.km ?? Infinity));
  }, [centers, coords]);

  const recommended = rankedCenters[0] ?? null;

  // Preselect the nearest centre until the patient picks one themselves
  useEffect(() => {
    if (collectionType !== "walk_in" || !recommended || centerPickedManually) return;
    setCenterId(recommended.center.id);
  }, [collectionType, recommended, centerPickedManually]);

  const selectedCenter = centers.find((c) => c.id === centerId) ?? null;

  const detailsValid = useMemo(() => {
    if (!name.trim() || !/^[6-9]\d{9}$/.test(phone.replace(/\D/g, "").slice(-10))) return false;
    if (!scheduledAt) return false;
    if (collectionType === "home_collection" && address.trim().length < 8) return false;
    if (collectionType === "walk_in" && !centerId) return false;
    return true;
  }, [name, phone, scheduledAt, collectionType, address, centerId]);

  const continueFromDetails = async () => {
    if (!detailsValid) {
      toast({ title: "Please complete all required details", variant: "destructive" });
      return;
    }
    if (getPatientToken()) {
      setStep("payment");
      return;
    }
    setBusy(true);
    try {
      await portal("send_otp", { phone });
      setStep("otp");
      toast({ title: "OTP sent", description: "Use 111111 to verify this demo booking." });
    } catch (e) {
      toast({ title: friendlyError(e), variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const verifyOtp = async () => {
    setBusy(true);
    try {
      const res = await portal<{ token: string; customer: { id: string; name: string | null; phone: string } }>(
        "verify_otp",
        { phone, code: otp, name },
      );
      setPatientSession(res.token, res.customer);
      setStep("payment");
    } catch (e) {
      toast({ title: friendlyError(e), variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const payAndBook = async () => {
    setBusy(true);
    try {
      const res = await portal<{ order: PortalOrder; points_earned?: number }>("create_booking", {
        slug,
        name,
        email,
        collection_type: collectionType,
        center_id: collectionType === "walk_in" ? centerId : undefined,
        address,
        pincode,
        scheduled_at: new Date(scheduledAt).toISOString(),
        notes,
        promo_code: applied?.code,
      });
      setOrder(res.order);
      setPointsEarned(res.points_earned ?? 0);
      setStep("done");
    } catch (e) {
      toast({ title: friendlyError(e), variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-secondary" />
      </main>
    );
  }

  if (notFound || !test) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold text-foreground">This test is not available online</h1>
        <p className="text-muted-foreground text-[15px]">Browse our health checkup packages or call us to book.</p>
        <Link to="/departments/health-checkups" className="rounded-full bg-secondary text-white px-6 py-3 font-semibold text-sm">
          Browse tests
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-muted/40">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-secondary">Home</Link> / {" "}
          <Link to="/departments/health-checkups" className="hover:text-secondary">Health Checkups</Link> / {" "}
          <span className="text-foreground">{test.name}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">
          {/* Left: flow */}
          <div className="bg-background rounded-2xl shadow-sm p-5 md:p-8 order-2 lg:order-1">
            {step === "details" && (
              <>
                <h1 className="text-2xl md:text-[32px] font-bold text-foreground mb-1">Book {test.name}</h1>
                <p className="text-muted-foreground text-[15px] mb-6">
                  Confirm your details and preferred appointment slot.
                </p>

                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="bk-name">Full name *</label>
                    <input id="bk-name" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="bk-phone">Mobile number *</label>
                      <input
                        id="bk-phone"
                        className={inputClass}
                        inputMode="numeric"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="10-digit mobile"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="bk-email">Email (optional)</label>
                      <input id="bk-email" type="email" className={inputClass} value={email ?? ""} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <span className="block text-sm font-medium text-foreground mb-1.5">Sample collection *</span>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {([
                        { key: "home_collection", label: "Home collection", desc: "Our phlebotomist visits you" },
                        { key: "walk_in", label: "Visit a collection centre", desc: "We suggest the one nearest to you" },
                      ] as const).map((o) => (
                        <button
                          key={o.key}
                          type="button"
                          onClick={() => setCollectionType(o.key)}
                          className={`text-left rounded-xl border p-4 transition ${
                            collectionType === o.key ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/50"
                          }`}
                        >
                          <span className="block font-semibold text-[15px] text-foreground">{o.label}</span>
                          <span className="block text-xs text-muted-foreground mt-0.5">{o.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {collectionType === "home_collection" && (
                    <div className="grid sm:grid-cols-[1fr_140px] gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="bk-addr">Collection address *</label>
                        <textarea id="bk-addr" rows={3} className={inputClass} value={address} onChange={(e) => setAddress(e.target.value)} maxLength={300} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="bk-pin">Pincode</label>
                        <input id="bk-pin" className={inputClass} inputMode="numeric" value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))} />
                      </div>
                    </div>
                  )}

                  {collectionType === "walk_in" && (
                    <div className="rounded-xl border border-border p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-sm font-medium text-foreground">Choose your collection centre *</span>
                        {geoState === "locating" && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Finding centres near you…
                          </span>
                        )}
                        {geoState !== "locating" && !coords && (
                          <button
                            type="button"
                            onClick={locate}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary"
                          >
                            <Navigation className="w-3.5 h-3.5" /> Use my location
                          </button>
                        )}
                      </div>

                      {geoState === "denied" && !coords && (
                        <p className="text-xs text-muted-foreground mb-3">
                          Location access is off, so we can&apos;t auto-suggest the closest centre. Please pick one below.
                        </p>
                      )}

                      <div className="space-y-2">
                        {(showAllCenters ? rankedCenters : rankedCenters.slice(0, 1)).map(({ center: c, km }, i) => {
                          const isRecommended = coords != null && rankedCenters[0]?.center.id === c.id;
                          void i;
                          return (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => {
                                setCenterId(c.id);
                                setCenterPickedManually(true);
                              }}
                              className={`w-full text-left rounded-xl border p-4 transition ${
                                centerId === c.id ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/50"
                              }`}
                            >
                              <span className="flex flex-wrap items-center gap-2">
                                <span className="font-semibold text-[15px] text-foreground">{c.name}</span>
                                {isRecommended && (
                                  <span className="rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wide px-2 py-0.5">
                                    Nearest to you
                                  </span>
                                )}
                                {km != null && (
                                  <span className="text-xs text-muted-foreground">{km < 1 ? "under 1 km" : `${km.toFixed(1)} km away`}</span>
                                )}
                              </span>
                              <span className="mt-1 flex items-start gap-1.5 text-xs text-muted-foreground">
                                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                                <span>{c.address || c.location || c.city}</span>
                              </span>
                              {c.timings && <span className="block text-xs text-muted-foreground mt-1">{c.timings}</span>}
                            </button>
                          );
                        })}
                      </div>

                      {rankedCenters.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setShowAllCenters((v) => !v)}
                          className="mt-3 text-xs font-semibold text-secondary"
                        >
                          {showAllCenters
                            ? "Show only the recommended centre"
                            : `Choose a different centre (${rankedCenters.length - 1} more)`}
                        </button>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="bk-slot">Preferred date &amp; time *</label>
                    <input id="bk-slot" type="datetime-local" className={inputClass} min={minDateTime()} value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="bk-notes">Notes for the team (optional)</label>
                    <input id="bk-notes" className={inputClass} value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={200} />
                  </div>

                  <button
                    type="button"
                    onClick={continueFromDetails}
                    disabled={busy}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-secondary text-white font-semibold px-6 py-3.5 disabled:opacity-60"
                  >
                    {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                    Continue
                  </button>
                </div>
              </>
            )}

            {step === "otp" && (
              <>
                <h1 className="text-2xl font-bold text-foreground mb-1">Verify your mobile number</h1>
                <p className="text-muted-foreground text-[15px] mb-6">
                  We sent a 6-digit OTP to +91 {phone}. Demo OTP: <strong className="text-foreground">111111</strong>
                </p>
                <input
                  className={`${inputClass} tracking-[0.4em] text-center text-lg max-w-xs`}
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="______"
                  aria-label="One time password"
                />
                <div className="flex flex-wrap gap-3 mt-6">
                  <button
                    type="button"
                    onClick={verifyOtp}
                    disabled={busy || otp.length !== 6}
                    className="inline-flex items-center gap-2 rounded-lg bg-secondary text-white font-semibold px-6 py-3 disabled:opacity-60"
                  >
                    {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                    Verify &amp; continue
                  </button>
                  <button type="button" onClick={() => setStep("details")} className="rounded-lg border border-border px-6 py-3 font-semibold text-foreground">
                    Change details
                  </button>
                </div>
              </>
            )}

            {step === "payment" && (
              <>
                <h1 className="text-2xl font-bold text-foreground mb-1">Confirm &amp; pay</h1>
                <p className="text-muted-foreground text-[15px] mb-6">Secure demo payment — no real money is charged.</p>

                <dl className="rounded-xl border border-border divide-y divide-border text-[15px]">
                  {[
                    ["Test", test.name],
                    ["Patient", `${name} · +91 ${phone}`],
                    ["Collection", collectionType === "home_collection"
                      ? `Home collection — ${address}`
                      : `Visit ${selectedCenter?.name ?? "collection centre"}${selectedCenter?.address ? ` — ${selectedCenter.address}` : ""}`],
                    ["Appointment", scheduledAt ? new Date(scheduledAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-col sm:flex-row sm:justify-between gap-1 px-4 py-3">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="text-foreground sm:text-right sm:max-w-[60%]">{v}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between px-4 py-3">
                    <dt className="text-muted-foreground">Package price</dt>
                    <dd className="text-foreground">₹ {test.price}</dd>
                  </div>
                  {applied && (
                    <div className="flex justify-between px-4 py-3">
                      <dt className="text-muted-foreground">Promo {applied.code}</dt>
                      <dd className="text-emerald-700 font-medium">− ₹ {applied.discount}</dd>
                    </div>
                  )}
                  <div className="flex justify-between px-4 py-3 bg-muted/50">
                    <dt className="font-semibold text-foreground">Amount payable</dt>
                    <dd className="font-bold text-foreground">₹ {payable}</dd>
                  </div>
                </dl>

                {/* Promo code */}
                <div className="mt-5 rounded-xl border border-border p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                    <BadgePercent className="w-4 h-4 text-secondary" />Have a promo code?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <input
                      aria-label="Promo code"
                      className={`${inputClass} flex-1 min-w-[180px] uppercase`}
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase().slice(0, 24))}
                      placeholder="Enter code"
                    />
                    {applied ? (
                      <button
                        type="button"
                        onClick={() => {
                          setApplied(null);
                          setPromoInput("");
                        }}
                        className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => applyPromo(promoInput)}
                        disabled={promoBusy || !promoInput.trim()}
                        className="inline-flex items-center gap-2 rounded-lg bg-secondary text-white px-5 py-3 text-sm font-semibold disabled:opacity-60"
                      >
                        {promoBusy && <Loader2 className="w-4 h-4 animate-spin" />}Apply
                      </button>
                    )}
                  </div>

                  {promos.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Available offers</p>
                      <ul className="space-y-2">
                        {promos.map((p) => (
                          <li key={p.code} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted/50 px-3 py-2.5">
                            <span className="min-w-0">
                              <span className="block font-semibold text-sm text-foreground">{p.code}</span>
                              <span className="block text-xs text-muted-foreground">
                                {p.description ||
                                  (p.discount_type === "percent" ? `${p.discount_value}% off` : `₹${p.discount_value} off`)}
                                {p.discount ? ` · saves ₹${p.discount}` : ""}
                              </span>
                            </span>
                            <button
                              type="button"
                              onClick={() => applyPromo(p.code)}
                              disabled={promoBusy || applied?.code === p.code}
                              className="text-xs font-bold uppercase tracking-wide text-secondary disabled:opacity-50"
                            >
                              {applied?.code === p.code ? "Applied" : "Apply"}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {policy?.policy_text && (
                  <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                    <strong className="text-foreground">Cancellation policy:</strong> {policy.policy_text}
                  </p>
                )}

                <button
                  type="button"
                  onClick={payAndBook}
                  disabled={busy}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-secondary text-white font-semibold px-6 py-3.5 disabled:opacity-60"
                >
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                  Pay ₹{payable} (mock)
                </button>
              </>
            )}

            {step === "done" && order && (
              <div className="text-center py-4">
                <CheckCircle className="w-14 h-14 text-secondary mx-auto mb-4" />
                <h1 className="text-2xl md:text-[30px] font-bold text-foreground mb-2">Your test has been booked</h1>
                <p className="text-muted-foreground text-[15px] mb-6">
                  Booking <strong className="text-foreground">{order.order_no}</strong> is confirmed and payment received.
                </p>
                <div className="text-left rounded-xl border border-border divide-y divide-border text-[15px] max-w-md mx-auto">
                  <div className="flex justify-between px-4 py-3"><span className="text-muted-foreground">Test</span><span className="text-foreground">{test.name}</span></div>
                  <div className="flex justify-between px-4 py-3">
                    <span className="text-muted-foreground">Appointment</span>
                    <span className="text-foreground">{order.scheduled_at ? new Date(order.scheduled_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—"}</span>
                  </div>
                  {Number(order.discount ?? 0) > 0 && (
                    <div className="flex justify-between px-4 py-3">
                      <span className="text-muted-foreground">Promo discount</span>
                      <span className="text-emerald-700">− ₹ {order.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between px-4 py-3"><span className="text-muted-foreground">Paid</span><span className="text-foreground">₹ {order.total}</span></div>
                </div>
                {pointsEarned > 0 && (
                  <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800">
                    <Gift className="w-4 h-4" />You earned {pointsEarned} reward points on this booking.
                  </p>
                )}
                <div className="flex flex-wrap gap-3 justify-center mt-6">
                  <button type="button" onClick={() => navigate("/my-tests")} className="rounded-lg bg-secondary text-white font-semibold px-6 py-3">
                    View my tests
                  </button>
                  <Link to="/departments/health-checkups" className="rounded-lg border border-border px-6 py-3 font-semibold text-foreground">
                    Book another test
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right: test summary */}
          <aside className="bg-background rounded-2xl shadow-sm p-5 md:p-6 order-1 lg:order-2 lg:sticky lg:top-24">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-1">{test.category}</p>
            <h2 className="text-xl font-bold text-foreground">{test.name}</h2>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-2xl font-bold text-foreground">₹ {test.price}</span>
              {test.mrp && test.mrp > test.price ? (
                <span className="text-sm text-muted-foreground line-through">₹ {test.mrp}</span>
              ) : null}
            </div>

            <ul className="mt-5 space-y-2.5 text-[14px] text-foreground">
              <li className="flex items-start gap-2"><Utensils className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />{test.fasting_required ? "Fasting required (8–12 hours)" : "No fasting required"}</li>
              {test.turnaround && <li className="flex items-start gap-2"><Clock className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />Reports in {test.turnaround}</li>}
              {test.sample_type && <li className="flex items-start gap-2"><Droplet className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />Sample: {test.sample_type}</li>}
              {test.home_collection && <li className="flex items-start gap-2"><Home className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />Home sample collection available</li>}
              <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />NABL protocols followed</li>
            </ul>

            {test.parameters && test.parameters.length > 0 && (
              <div className="mt-5">
                <p className="text-sm font-semibold text-foreground mb-2">Includes</p>
                <ul className="space-y-1.5">
                  {test.parameters.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[14px] text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />{p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {test.prep_instructions && (
              <p className="mt-5 text-[13px] text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Preparation:</strong> {test.prep_instructions}
              </p>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
};

export default BookTest;
