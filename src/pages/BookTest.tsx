import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CheckCircle, Clock, Droplet, Home, Loader2, Lock, ShieldCheck, Utensils } from "lucide-react";
import useSEO from "@/hooks/useSEO";
import { toast } from "@/hooks/use-toast";
import {
  BookingPolicy,
  PortalOrder,
  PortalTest,
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

  const detailsValid = useMemo(() => {
    if (!name.trim() || !/^[6-9]\d{9}$/.test(phone.replace(/\D/g, "").slice(-10))) return false;
    if (!scheduledAt) return false;
    if (collectionType === "home_collection" && address.trim().length < 8) return false;
    return true;
  }, [name, phone, scheduledAt, collectionType, address]);

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
      const res = await portal<{ order: PortalOrder }>("create_booking", {
        slug,
        name,
        email,
        collection_type: collectionType,
        address,
        pincode,
        scheduled_at: new Date(scheduledAt).toISOString(),
        notes,
      });
      setOrder(res.order);
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
                        { key: "walk_in", label: "Visit the lab", desc: "Sector 67, Gurugram" },
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
                    ["Collection", collectionType === "home_collection" ? `Home collection — ${address}` : "Walk-in at Sector 67, Gurugram"],
                    ["Appointment", scheduledAt ? new Date(scheduledAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-col sm:flex-row sm:justify-between gap-1 px-4 py-3">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="text-foreground sm:text-right sm:max-w-[60%]">{v}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between px-4 py-3 bg-muted/50">
                    <dt className="font-semibold text-foreground">Amount payable</dt>
                    <dd className="font-bold text-foreground">₹ {test.price}</dd>
                  </div>
                </dl>

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
                  Pay ₹{test.price} (mock)
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
                  <div className="flex justify-between px-4 py-3"><span className="text-muted-foreground">Paid</span><span className="text-foreground">₹ {order.total}</span></div>
                </div>
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
