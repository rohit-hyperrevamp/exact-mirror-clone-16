import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { commerce, type LabTest } from "@/lib/admin/commerceApi";
import { AdminLoadError, AdminPageHeader, Btn, Field, Input, Select, Textarea } from "@/lib/admin/ui";
import { ArrowLeft } from "lucide-react";

const AdminCatalogDetail = () => {
  const { id = "" } = useParams();
  const nav = useNavigate();
  const { data, error } = useQuery({
    queryKey: ["admin-test", id],
    queryFn: () => commerce<{ row: LabTest }>("get_test", { id }),
    retry: false,
  });
  const [form, setForm] = useState<Partial<LabTest>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data?.row) setForm(data.row);
  }, [data]);

  const set = (k: keyof LabTest, v: unknown) => {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  };

  async function save() {
    setSaving(true);
    try {
      const patch = {
        name: form.name,
        slug: form.slug,
        category: form.category,
        department: form.department,
        sub: form.sub,
        sample_type: form.sample_type,
        price: Number(form.price ?? 0),
        mrp: form.mrp === null || form.mrp === undefined || form.mrp === ("" as unknown) ? null : Number(form.mrp),
        fasting_required: !!form.fasting_required,
        turnaround: form.turnaround,
        parameters: Array.isArray(form.parameters) ? form.parameters : [],
        description: form.description,
        prep_instructions: form.prep_instructions,
        home_collection: !!form.home_collection,
        image_url: form.image_url || null,
        status: form.status,
        sort_order: Number(form.sort_order ?? 0),
      };
      await commerce("update_test", { id, patch });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Link to="/admin/catalog" className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500 hover:text-slate-900">
        <ArrowLeft className="h-3 w-3" /> Back to catalog
      </Link>
      <AdminPageHeader
        kicker="Commerce · Catalog"
        title={form.name || "Test"}
        subtitle="Pricing, sample requirements, preparation notes and parameters for this test."
        actions={
          <>
            <Btn variant="outline" onClick={() => nav("/admin/catalog")}>
              Cancel
            </Btn>
            <Btn onClick={save} disabled={saving}>
              {saving ? "Saving…" : saved ? "Saved" : "Save changes"}
            </Btn>
          </>
        }
      />
      {error && <AdminLoadError label="Test" error={error} />}

      <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-6 md:grid-cols-2">
        <Field label="Test name">
          <Input value={form.name ?? ""} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label="Slug">
          <Input value={form.slug ?? ""} onChange={(e) => set("slug", e.target.value)} />
        </Field>
        <Field label="Category">
          <Select value={form.category ?? "Pathology"} onChange={(e) => set("category", e.target.value)}>
            {["Pathology", "Radiology", "Health Checkups"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Department">
          <Input value={form.department ?? ""} onChange={(e) => set("department", e.target.value)} />
        </Field>
        <Field label="Group / sub-category">
          <Input value={form.sub ?? ""} onChange={(e) => set("sub", e.target.value)} />
        </Field>
        <Field label="Sample type">
          <Input value={form.sample_type ?? ""} onChange={(e) => set("sample_type", e.target.value)} />
        </Field>
        <Field label="Price (₹)">
          <Input type="number" value={String(form.price ?? 0)} onChange={(e) => set("price", e.target.value)} />
        </Field>
        <Field label="MRP (₹)" help="Shown struck-through when higher than price">
          <Input type="number" value={String(form.mrp ?? "")} onChange={(e) => set("mrp", e.target.value)} />
        </Field>
        <Field label="Turnaround">
          <Input value={form.turnaround ?? ""} onChange={(e) => set("turnaround", e.target.value)} />
        </Field>
        <Field label="Status">
          <Select value={form.status ?? "live"} onChange={(e) => set("status", e.target.value)}>
            <option value="live">live</option>
            <option value="draft">draft</option>
          </Select>
        </Field>
        <Field label="Fasting required">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!form.fasting_required} onChange={(e) => set("fasting_required", e.target.checked)} />
            Patient must fast before this test
          </label>
        </Field>
        <Field label="Home collection">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!form.home_collection} onChange={(e) => set("home_collection", e.target.checked)} />
            Available for home sample collection
          </label>
        </Field>
        <Field label="Description" span={2}>
          <Textarea rows={3} value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} />
        </Field>
        <Field label="Preparation instructions" span={2}>
          <Textarea rows={2} value={form.prep_instructions ?? ""} onChange={(e) => set("prep_instructions", e.target.value)} />
        </Field>
        <Field label="Included parameters" help="One per line" span={2}>
          <Textarea
            rows={5}
            value={(form.parameters ?? []).join("\n")}
            onChange={(e) =>
              set(
                "parameters",
                e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean),
              )
            }
          />
        </Field>
        <Field label="Image URL" span={2}>
          <Input value={form.image_url ?? ""} onChange={(e) => set("image_url", e.target.value)} />
        </Field>
      </div>
    </>
  );
};

export default AdminCatalogDetail;
