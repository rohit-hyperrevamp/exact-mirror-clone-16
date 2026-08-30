import { useEffect, useState } from "react";
import { Loader2, Save, ShieldAlert } from "lucide-react";
import { commerce } from "@/lib/admin/commerceApi";
import { toast } from "@/hooks/use-toast";

type Policy = {
  no_refund_hours: number;
  partial_refund_hours: number;
  partial_refund_percent: number;
  reschedule_allowed: boolean;
  reschedule_min_hours: number;
  policy_text: string;
};

const DEFAULTS: Policy = {
  no_refund_hours: 24,
  partial_refund_hours: 72,
  partial_refund_percent: 50,
  reschedule_allowed: true,
  reschedule_min_hours: 24,
  policy_text: "",
};

const field = "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#0172B6]";

const AdminBookingPolicy = () => {
  const [policy, setPolicy] = useState<Policy>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    commerce<{ policy: Policy }>("get_booking_policy")
      .then((r) => setPolicy({ ...DEFAULTS, ...r.policy }))
      .catch(() => toast({ title: "Could not load the cancellation policy", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const r = await commerce<{ policy: Policy }>("update_booking_policy", { row: policy });
      setPolicy({ ...DEFAULTS, ...r.policy });
      toast({ title: "Cancellation policy saved" });
    } catch {
      toast({ title: "Could not save the policy", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const set = <K extends keyof Policy>(k: K, v: Policy[K]) => setPolicy((p) => ({ ...p, [k]: v }));

  if (loading) {
    return <div className="p-10 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-[#0172B6]" /></div>;
  }

  return (
    <div className="p-5 md:p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">Cancellation Policy</h1>
      <p className="text-sm text-slate-500 mt-1 mb-6">
        Controls the refund a patient receives when they cancel a booking from the website, and whether they may reschedule.
      </p>

      <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 space-y-6">
        <section>
          <h2 className="text-sm font-semibold text-slate-900 mb-3">Refund windows</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5" htmlFor="p1">No refund within (hours)</label>
              <input id="p1" type="number" min={0} className={field} value={policy.no_refund_hours} onChange={(e) => set("no_refund_hours", Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5" htmlFor="p2">Partial refund from (hours)</label>
              <input id="p2" type="number" min={0} className={field} value={policy.partial_refund_hours} onChange={(e) => set("partial_refund_hours", Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5" htmlFor="p3">Partial refund (%)</label>
              <input id="p3" type="number" min={0} max={100} className={field} value={policy.partial_refund_percent} onChange={(e) => set("partial_refund_percent", Number(e.target.value))} />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
            Current rule: cancellations less than {policy.no_refund_hours} hours before the appointment get no refund; cancellations {policy.no_refund_hours} hours or more before the appointment (including {policy.partial_refund_hours} hours or more) get a {policy.partial_refund_percent}% refund.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-slate-900 mb-3">Rescheduling</h2>
          <label className="flex items-center gap-3 text-sm text-slate-700">
            <input type="checkbox" checked={policy.reschedule_allowed} onChange={(e) => set("reschedule_allowed", e.target.checked)} className="w-4 h-4" />
            Allow patients to reschedule online (free of charge)
          </label>
          <div className="mt-4 max-w-xs">
            <label className="block text-xs font-medium text-slate-600 mb-1.5" htmlFor="p4">Minimum notice to reschedule (hours)</label>
            <input id="p4" type="number" min={0} className={field} value={policy.reschedule_min_hours} onChange={(e) => set("reschedule_min_hours", Number(e.target.value))} />
          </div>
        </section>

        <section>
          <label className="block text-sm font-semibold text-slate-900 mb-2" htmlFor="p5">Policy text shown to patients</label>
          <textarea id="p5" rows={5} className={field} value={policy.policy_text} onChange={(e) => set("policy_text", e.target.value)} />
        </section>

        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-[#001260] text-white font-semibold px-5 py-2.5 text-sm disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}Save policy
        </button>
      </div>
    </div>
  );
};

export default AdminBookingPolicy;
