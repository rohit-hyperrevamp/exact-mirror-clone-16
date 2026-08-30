import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle,
  ChevronDown,
  Clock,
  Droplet,
  FlaskConical,
  Gift,
  Loader2,
  LogOut,
  Utensils,
  XCircle,
} from "lucide-react";
import useSEO from "@/hooks/useSEO";
import { toast } from "@/hooks/use-toast";
import {
  BookingPolicy,
  PortalOrder,
  PortalRewards,
  clearPatientSession,
  friendlyError,
  getPatientProfile,
  getPatientToken,
  portal,
  setPatientSession,
} from "@/lib/patientPortal";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none focus:border-secondary";

const fmt = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—";

const minDateTime = () => {
  const d = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const statusStyles: Record<string, string> = {
  confirmed: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  phlebotomist_on_the_way: "bg-blue-50 text-blue-700",
  sample_collected: "bg-blue-50 text-blue-700",
  sample_received: "bg-indigo-50 text-indigo-700",
  in_lab: "bg-indigo-50 text-indigo-700",
  report_ready: "bg-emerald-50 text-emerald-700",
  report_delivered: "bg-emerald-50 text-emerald-700",
  completed: "bg-sky-50 text-sky-700",
  cancelled: "bg-rose-50 text-rose-700",
};

const statusText: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  phlebotomist_on_the_way: "Collector on the way",
  sample_collected: "Sample collected",
  sample_received: "Sample received at lab",
  in_lab: "Testing in progress",
  report_ready: "Report ready",
  report_delivered: "Report delivered",
  completed: "Completed",
  cancelled: "Cancelled",
};

const MyTests = () => {
  useSEO({
    title: "My Tests | Aarvak Diagnostics Patient Portal",
    description: "View, reschedule or cancel your booked diagnostic tests and health checkup packages at Aarvak Diagnostics Gurugram.",
    canonical: "/my-tests",
    noindex: true,
  });

  const [loggedIn, setLoggedIn] = useState(Boolean(getPatientToken()));
  const [profile, setProfile] = useState(getPatientProfile());
  const [orders, setOrders] = useState<PortalOrder[]>([]);
  const [policy, setPolicy] = useState<BookingPolicy | null>(null);
  const [rewards, setRewards] = useState<PortalRewards | null>(null);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  // login state
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // dialogs
  const [rescheduleFor, setRescheduleFor] = useState<PortalOrder | null>(null);
  const [newSlot, setNewSlot] = useState("");
  const [cancelFor, setCancelFor] = useState<PortalOrder | null>(null);
  const [quote, setQuote] = useState<{ percent: number; amount: number } | null>(null);

  const load = useCallback(() => {
    if (!getPatientToken()) return;
    setLoading(true);
    portal<{ orders: PortalOrder[]; policy: BookingPolicy }>("my_bookings")
      .then((res) => {
        setOrders(res.orders ?? []);
        setPolicy(res.policy);
      })
      .catch((e) => {
        if (String((e as Error).message) === "unauthorized") setLoggedIn(false);
        else toast({ title: friendlyError(e), variant: "destructive" });
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loggedIn) load();
  }, [loggedIn, load]);

  useEffect(() => {
    if (!loggedIn) return;
    let alive = true;
    portal<PortalRewards>("my_rewards")
      .then((r) => alive && setRewards(r))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [loggedIn, orders.length]);

  const sendOtp = async () => {
    setBusy(true);
    try {
      await portal("send_otp", { phone });
      setOtpSent(true);
      toast({ title: "OTP sent", description: "Use 111111 to sign in to this demo portal." });
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
        { phone, code: otp },
      );
      setPatientSession(res.token, res.customer);
      setProfile(res.customer);
      setLoggedIn(true);
    } catch (e) {
      toast({ title: friendlyError(e), variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const signOut = () => {
    clearPatientSession();
    setLoggedIn(false);
    setOrders([]);
    setOtpSent(false);
    setOtp("");
  };

  const openCancel = async (order: PortalOrder) => {
    setCancelFor(order);
    setQuote(null);
    try {
      const res = await portal<{ percent: number; amount: number }>("cancellation_quote", { order_id: order.id });
      setQuote({ percent: res.percent, amount: res.amount });
    } catch {
      setQuote(null);
    }
  };

  const doReschedule = async () => {
    if (!rescheduleFor || !newSlot) return;
    setBusy(true);
    try {
      await portal("reschedule", { order_id: rescheduleFor.id, scheduled_at: new Date(newSlot).toISOString() });
      toast({ title: "Appointment rescheduled", description: `New slot: ${fmt(new Date(newSlot).toISOString())}` });
      setRescheduleFor(null);
      setNewSlot("");
      load();
    } catch (e) {
      toast({ title: friendlyError(e), variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const doCancel = async () => {
    if (!cancelFor) return;
    setBusy(true);
    try {
      const res = await portal<{ refund: { percent: number; amount: number } }>("cancel", { order_id: cancelFor.id });
      toast({
        title: "Booking cancelled",
        description:
          res.refund.amount > 0
            ? `A refund of ₹${res.refund.amount} (${res.refund.percent}%) will be processed in 5–7 working days.`
            : "As per the cancellation policy, no refund is applicable for this booking.",
      });
      setCancelFor(null);
      load();
    } catch (e) {
      toast({ title: friendlyError(e), variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  /* ---------------- Login screen ---------------- */
  if (!loggedIn) {
    return (
      <main className="bg-muted/40 min-h-[70vh] flex items-center px-4 py-14">
        <div className="w-full max-w-md mx-auto bg-background rounded-2xl shadow-sm p-6 md:p-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Patient login</h1>
          <p className="text-muted-foreground text-[15px] mb-6">
            Sign in with your mobile number to see your booked tests.
          </p>

          {!otpSent ? (
            <>
              <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="pt-phone">Mobile number</label>
              <input
                id="pt-phone"
                className={inputClass}
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="10-digit mobile"
              />
              <button
                type="button"
                onClick={sendOtp}
                disabled={busy || phone.length !== 10}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-secondary text-white font-semibold px-6 py-3.5 disabled:opacity-60"
              >
                {busy && <Loader2 className="w-4 h-4 animate-spin" />}Send OTP
              </button>
            </>
          ) : (
            <>
              <p className="text-[15px] text-muted-foreground mb-4">
                Enter the OTP sent to +91 {phone}. Demo OTP: <strong className="text-foreground">111111</strong>
              </p>
              <input
                className={`${inputClass} tracking-[0.4em] text-center text-lg`}
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="______"
                aria-label="One time password"
              />
              <button
                type="button"
                onClick={verifyOtp}
                disabled={busy || otp.length !== 6}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-secondary text-white font-semibold px-6 py-3.5 disabled:opacity-60"
              >
                {busy && <Loader2 className="w-4 h-4 animate-spin" />}Verify &amp; sign in
              </button>
              <button type="button" onClick={() => setOtpSent(false)} className="mt-3 w-full text-sm text-muted-foreground hover:text-foreground">
                Change number
              </button>
            </>
          )}
        </div>
      </main>
    );
  }

  /* ---------------- Portal ---------------- */
  return (
    <main className="bg-muted/40 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div>
            <h1 className="text-2xl md:text-[32px] font-bold text-foreground">My tests</h1>
            <p className="text-muted-foreground text-[15px]">
              {profile?.name ? `${profile.name} · ` : ""}+91 {profile?.phone}
            </p>
          </div>
          <button type="button" onClick={signOut} className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground">
            <LogOut className="w-4 h-4" />Sign out
          </button>
        </div>

        {/* Rewards & loyalty */}
        <div className="mb-8 rounded-2xl bg-background shadow-sm p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Gift className="w-4 h-4 text-secondary" />Rewards &amp; loyalty
              </p>
              <p className="text-muted-foreground text-[14px] mt-1">
                {rewards?.config
                  ? `Earn ${rewards.config.earn_percent}% of every booking back as points. 1 point = ₹${rewards.config.point_to_rupee}.`
                  : "Earn points on every test you book with us."}
              </p>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-2xl font-bold text-foreground tabular-nums">{rewards?.member?.points_balance ?? 0}</p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Points</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground tabular-nums">{rewards?.member?.lifetime_points ?? 0}</p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Lifetime</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground capitalize">{rewards?.member?.tier ?? "—"}</p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Tier</p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-secondary" /></div>
        ) : orders.length === 0 ? (
          <div className="bg-background rounded-2xl shadow-sm p-8 md:p-12 text-center">
            <FlaskConical className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">You do not have any test</h2>
            <p className="text-muted-foreground text-[15px] mb-6">
              You have not booked any diagnostic test or health checkup with us yet.
            </p>
            <Link to="/departments/health-checkups" className="inline-block rounded-lg bg-secondary text-white font-semibold px-6 py-3">
              Click here to browse tests
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => {
              const open = expanded === o.id;
              const item = o.items[0];
              const active = !["cancelled", "completed"].includes(o.status);
              return (
                <div key={o.id} className="bg-background rounded-2xl shadow-sm overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setExpanded(open ? null : o.id)}
                    aria-expanded={open}
                    className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${statusStyles[o.status] ?? "bg-muted text-muted-foreground"}`}>
                          {statusText[o.status] ?? o.status.replace(/_/g, " ")}
                        </span>
                        <span className="text-xs text-muted-foreground">{o.order_no}</span>
                      </div>
                      <h2 className="text-[17px] font-bold text-foreground truncate">{item?.test_name ?? "Diagnostic test"}</h2>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                        <CalendarClock className="w-4 h-4 flex-shrink-0" />{fmt(o.scheduled_at)}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-foreground">₹ {o.total}</p>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground ml-auto mt-2 transition ${open ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  {open && (
                    <div className="px-5 md:px-6 pb-6 border-t border-border pt-5">
                      <dl className="grid sm:grid-cols-2 gap-y-3 gap-x-6 text-[14px]">
                        <div><dt className="text-muted-foreground">Payment</dt><dd className="text-foreground font-medium">{o.payment_status === "paid" ? "Paid online" : o.payment_status.replace(/_/g, " ")}</dd></div>
                        <div><dt className="text-muted-foreground">Collection</dt><dd className="text-foreground font-medium">{o.collection_type === "home_collection" ? "Home collection" : "Walk-in at lab"}</dd></div>
                        {o.address && <div className="sm:col-span-2"><dt className="text-muted-foreground">Address</dt><dd className="text-foreground">{o.address}</dd></div>}
                        <div><dt className="text-muted-foreground">Booked on</dt><dd className="text-foreground">{fmt(o.created_at)}</dd></div>
                        {o.reschedule_count > 0 && <div><dt className="text-muted-foreground">Rescheduled</dt><dd className="text-foreground">{o.reschedule_count} time(s)</dd></div>}
                      </dl>

                      <div className="mt-5 grid gap-2.5 text-[14px] text-foreground">
                        <p className="flex items-start gap-2">
                          <Utensils className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                          {item?.test?.fasting_required ? "Fasting required — 8 to 12 hours before sample collection (water is allowed)." : "No fasting required for this test."}
                        </p>
                        {item?.test?.turnaround && (
                          <p className="flex items-start gap-2"><Clock className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />Reports available in {item.test.turnaround}.</p>
                        )}
                        {item?.test?.sample_type && (
                          <p className="flex items-start gap-2"><Droplet className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />Sample type: {item.test.sample_type}.</p>
                        )}
                        {item?.test?.prep_instructions && (
                          <p className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />{item.test.prep_instructions}</p>
                        )}
                      </div>

                      {item?.test?.parameters && item.test.parameters.length > 0 && (
                        <div className="mt-5">
                          <p className="text-sm font-semibold text-foreground mb-2">What is included</p>
                          <ul className="grid sm:grid-cols-2 gap-1.5">
                            {item.test.parameters.map((p) => (
                              <li key={p} className="flex items-start gap-2 text-[14px] text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />{p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {o.status === "cancelled" ? (
                        <p className="mt-5 text-sm text-rose-700 bg-rose-50 rounded-lg px-4 py-3 flex items-start gap-2">
                          <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          Cancelled on {fmt(o.cancelled_at)}.{" "}
                          {o.refund_amount > 0 ? `Refund of ₹${o.refund_amount} (${o.refund_percent}%) is being processed.` : "No refund applicable as per the cancellation policy."}
                        </p>
                      ) : active ? (
                        <div className="mt-6 flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => { setRescheduleFor(o); setNewSlot(""); }}
                            className="inline-flex items-center gap-2 rounded-lg bg-secondary text-white font-semibold px-5 py-2.5 text-sm"
                          >
                            <CalendarClock className="w-4 h-4" />Reschedule
                          </button>
                          <button
                            type="button"
                            onClick={() => openCancel(o)}
                            className="inline-flex items-center gap-2 rounded-lg border border-rose-200 text-rose-700 font-semibold px-5 py-2.5 text-sm"
                          >
                            <XCircle className="w-4 h-4" />Cancel
                          </button>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="text-center pt-2">
              <Link to="/departments/health-checkups" className="text-sm font-semibold text-secondary hover:underline">
                Browse more tests
              </Link>
            </div>
          </div>
        )}

        {policy?.policy_text && (
          <p className="text-xs text-muted-foreground mt-8 leading-relaxed">
            <strong className="text-foreground">Cancellation &amp; reschedule policy:</strong> {policy.policy_text}
          </p>
        )}
      </div>

      {/* Reschedule dialog */}
      {rescheduleFor && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-label="Reschedule booking">
          <div className="bg-background rounded-2xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-foreground mb-2">Are you sure you want to reschedule?</h2>
            <p className="text-[15px] text-muted-foreground mb-4">
              Current slot: {fmt(rescheduleFor.scheduled_at)}. Rescheduling is free of charge — choose a new future date and time.
            </p>
            <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="rs-slot">New date &amp; time</label>
            <input id="rs-slot" type="datetime-local" className={inputClass} min={minDateTime()} value={newSlot} onChange={(e) => setNewSlot(e.target.value)} />
            <div className="flex flex-wrap gap-3 mt-6">
              <button type="button" onClick={doReschedule} disabled={busy || !newSlot} className="inline-flex items-center gap-2 rounded-lg bg-secondary text-white font-semibold px-5 py-2.5 disabled:opacity-60">
                {busy && <Loader2 className="w-4 h-4 animate-spin" />}Confirm reschedule
              </button>
              <button type="button" onClick={() => setRescheduleFor(null)} className="rounded-lg border border-border px-5 py-2.5 font-semibold text-foreground">
                Keep existing slot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel dialog */}
      {cancelFor && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-label="Cancel booking">
          <div className="bg-background rounded-2xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-foreground mb-2">Are you sure you want to cancel?</h2>
            <p className="text-[15px] text-muted-foreground">
              {cancelFor.items[0]?.test_name} on {fmt(cancelFor.scheduled_at)} will be cancelled.
            </p>
            <div className="mt-4 rounded-lg bg-amber-50 text-amber-800 px-4 py-3 text-sm flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {quote
                ? quote.amount > 0
                  ? `As per our policy you will receive a ${quote.percent}% refund of ₹${cancelFor.total} — ₹${quote.amount}.`
                  : `Cancellations within ${policy?.no_refund_hours ?? 24} hours of the appointment are not eligible for a refund.`
                : "Checking your refund eligibility…"}
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <button type="button" onClick={doCancel} disabled={busy} className="inline-flex items-center gap-2 rounded-lg bg-rose-600 text-white font-semibold px-5 py-2.5 disabled:opacity-60">
                {busy && <Loader2 className="w-4 h-4 animate-spin" />}Yes, cancel booking
              </button>
              <button type="button" onClick={() => setCancelFor(null)} className="rounded-lg border border-border px-5 py-2.5 font-semibold text-foreground">
                Keep my booking
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyTests;
