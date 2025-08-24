import { useEffect, useMemo, useState } from "react";
import { api, Rule, RuleCreate, Operation } from "../lib/api";
import {
  X,
  Plus,
  Trash2,
  Save,
  PlayCircle,
  Undo2,
  FolderSearch,
  Loader2,
} from "lucide-react";
import { open } from "@tauri-apps/plugin-dialog";
import { readDir } from "@tauri-apps/plugin-fs";

type Props = { onClose: () => void };

const emptyRule = (): RuleCreate => ({
  name: "",
  priority: 100,
  enabled: true,
  stop_on_match: true,
  conditions: {
    extensions: [],
    name_regex: "",
    contains_text: "",
    source_contains: "",
  },
  actions: {
    move_to: "",
    rename_template: "{name}_{date}{ext}",
    delete: false,
  },
});

export default function RuleBuilder({ onClose }: Props) {
  const [rules, setRules] = useState<Rule[]>([]);
  const [form, setForm] = useState<RuleCreate>(emptyRule());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [folder, setFolder] = useState<string>("");
  const [preview, setPreview] = useState<Operation[]>([]);
  const [lastJobId, setLastJobId] = useState<string | null>(null);
  const [loading, setLoading] = useState<
    "rules" | "preview" | "apply" | "idle"
  >("rules");

  useEffect(() => {
    api.listRules().then((r) => {
      setRules(r);
      setLoading("idle");
    });
  }, []);

  const planned = useMemo(
    () => preview.filter((p) => p.action !== "none"),
    [preview]
  );

  async function pickFolder() {
    const result = await open({
      directory: true, // enable folder selection
      multiple: false, // single folder
    });

    if (typeof result === "string") {
      // You can now read its contents with fs plugin if needed
      const files = await readDir(result);
      setFolder(result);
    }
  }

  async function runPreview() {
    if (!folder) return;
    setLoading("preview");
    const ops = await api.preview(folder, 1000);
    setPreview(ops);
    setLoading("idle");
  }

  async function saveRule() {
    const body: RuleCreate = {
      ...form,
      conditions: {
        extensions: (form.conditions.extensions || [])
          .map((e) => e.trim())
          .filter(Boolean),
        name_regex: form.conditions.name_regex?.trim() || undefined,
        contains_text: form.conditions.contains_text?.trim() || undefined,
        source_contains: form.conditions.source_contains?.trim() || undefined,
        size_min_kb: form.conditions.size_min_kb,
        size_max_kb: form.conditions.size_max_kb,
      },
      actions: {
        move_to: form.actions.move_to?.trim() || undefined,
        rename_template: form.actions.rename_template?.trim() || undefined,
        delete: !!form.actions.delete,
      },
    };

    let saved: Rule;
    if (editingId) {
      saved = await api.updateRule(editingId, body);
    } else {
      saved = await api.createRule(body);
    }

    const next = await api.listRules();
    setRules(next);
    setForm(emptyRule());
    setEditingId(null);
  }

  function startEdit(r: Rule) {
    setEditingId(r.id);
    setForm({
      name: r.name,
      priority: r.priority,
      enabled: r.enabled,
      stop_on_match: r.stop_on_match,
      conditions: {
        ...r.conditions,
        extensions: r.conditions.extensions || [],
      },
      actions: { ...r.actions },
    });
  }

  async function removeRule(id: number) {
    await api.deleteRule(id);
    const next = await api.listRules();
    setRules(next);
  }

  async function applyOps() {
    const ops = planned;
    if (!ops.length) return;
    setLoading("apply");
    const res = await api.apply(ops);
    setLastJobId(res.job_id || null);
    setLoading("idle");
    // Refresh preview after apply
    if (folder) await runPreview();
  }

  async function undoLast() {
    if (!lastJobId) return;
    setLoading("apply");
    await api.undo(lastJobId);
    setLoading("idle");
    if (folder) await runPreview();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-4 overflow-auto">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-6 relative">
        <button
          type="button"
          title="close"
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Rule Builder</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rule Form */}
          <div className="lg:col-span-1 border rounded-xl p-4">
            <h3 className="font-semibold mb-3">
              {editingId ? "Edit Rule" : "New Rule"}
            </h3>

            <label className="block text-sm font-medium mt-2">Name</label>
            <input
              className="w-full border rounded-lg p-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Invoices to Finance"
            />

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <label className="block text-sm font-medium">Priority</label>
                <input
                  title="number"
                  type="number"
                  className="w-full border rounded-lg p-2"
                  value={form.priority}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      priority: Number(e.target.value) || 100,
                    })
                  }
                />
              </div>
              <div className="flex items-center gap-2 mt-6">
                <input
                  title="checkbox"
                  type="checkbox"
                  checked={form.enabled}
                  onChange={(e) =>
                    setForm({ ...form, enabled: e.target.checked })
                  }
                />
                <span className="text-sm">Enabled</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                title="checkbox"
                type="checkbox"
                checked={form.stop_on_match}
                onChange={(e) =>
                  setForm({ ...form, stop_on_match: e.target.checked })
                }
              />
              <span className="text-sm">Stop on match</span>
            </div>

            <h4 className="mt-4 font-semibold">Conditions</h4>
            <label className="block text-sm mt-1">
              Extensions (comma separated)
            </label>
            <input
              className="w-full border rounded-lg p-2"
              value={form.conditions.extensions.join(",")}
              onChange={(e) =>
                setForm({
                  ...form,
                  conditions: {
                    ...form.conditions,
                    extensions: e.target.value.split(",").map((s) => s.trim()),
                  },
                })
              }
              placeholder="pdf, docx, png"
            />

            <label className="block text-sm mt-2">Name regex</label>
            <input
              className="w-full border rounded-lg p-2"
              value={form.conditions.name_regex || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  conditions: {
                    ...form.conditions,
                    name_regex: e.target.value,
                  },
                })
              }
              placeholder="(invoice|receipt)"
            />

            <label className="block text-sm mt-2">
              Contains text (small files)
            </label>
            <input
              className="w-full border rounded-lg p-2"
              value={form.conditions.contains_text || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  conditions: {
                    ...form.conditions,
                    contains_text: e.target.value,
                  },
                })
              }
              placeholder="Valid Flow"
            />

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <label className="block text-sm">Min size KB</label>
                <input
                  title="number"
                  type="number"
                  className="w-full border rounded-lg p-2"
                  value={form.conditions.size_min_kb || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      conditions: {
                        ...form.conditions,
                        size_min_kb: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm">Max size KB</label>
                <input
                  type="number"
                  title="number"
                  className="w-full border rounded-lg p-2"
                  value={form.conditions.size_max_kb || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      conditions: {
                        ...form.conditions,
                        size_max_kb: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      },
                    })
                  }
                />
              </div>
            </div>

            <label className="block text-sm mt-2">Source path contains</label>
            <input
              className="w-full border rounded-lg p-2"
              value={form.conditions.source_contains || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  conditions: {
                    ...form.conditions,
                    source_contains: e.target.value,
                  },
                })
              }
              placeholder="Downloads"
            />

            <h4 className="mt-4 font-semibold">Actions</h4>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                title="checkbox"
                checked={!!form.actions.delete}
                onChange={(e) =>
                  setForm({
                    ...form,
                    actions: { ...form.actions, delete: e.target.checked },
                  })
                }
              />
              <span className="text-sm">Delete (skip move and rename)</span>
            </div>

            {!form.actions.delete && (
              <>
                <label className="block text-sm mt-2">Move to folder</label>
                <input
                  className="w-full border rounded-lg p-2"
                  value={form.actions.move_to || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      actions: { ...form.actions, move_to: e.target.value },
                    })
                  }
                  placeholder="C:\Users\ValidFlow\Documents"
                />
                <label className="block text-sm mt-2">Rename template</label>
                <input
                  className="w-full border rounded-lg p-2"
                  value={form.actions.rename_template || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      actions: {
                        ...form.actions,
                        rename_template: e.target.value,
                      },
                    })
                  }
                  placeholder="{name}_{date}{ext}"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Placeholders: {"{name} {date} {ext}"}
                </p>
              </>
            )}

            <div className="flex gap-2 mt-4">
              <button
                onClick={saveRule}
                className="px-3 py-2 rounded-lg bg-yellow-300 font-semibold flex items-center gap-2"
              >
                <Save size={16} /> {editingId ? "Update" : "Save"}
              </button>
              <button
                onClick={() => {
                  setForm(emptyRule());
                  setEditingId(null);
                }}
                className="px-3 py-2 rounded-lg bg-gray-100"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Rules List */}
          <div className="lg:col-span-1 border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Rules</h3>
              <button
                className="px-2 py-1 rounded-lg bg-yellow-100 flex items-center gap-1"
                onClick={() => {
                  setForm(emptyRule());
                  setEditingId(null);
                }}
              >
                <Plus size={16} /> New
              </button>
            </div>
            <div className="mt-3 space-y-2 max-h-[420px] overflow-auto">
              {rules.map((r) => (
                <div
                  key={r.id}
                  className="border rounded-lg p-2 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-gray-500">
                      Priority {r.priority} •{" "}
                      {r.enabled ? "Enabled" : "Disabled"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEdit(r)}
                      className="text-sm px-2 py-1 rounded bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      title="remove"
                      onClick={() => removeRule(r.id)}
                      className="text-red-600 p-1 rounded hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {!rules.length && (
                <div className="text-sm text-gray-500">
                  No rules yet. Create one.
                </div>
              )}
            </div>
          </div>

          {/* Preview and Apply */}
          <div className="lg:col-span-1 border rounded-xl p-4">
            <h3 className="font-semibold mb-2">Dry-Run Preview</h3>
            <div className="flex gap-2">
              <button
                onClick={pickFolder}
                className="px-3 py-2 rounded-lg bg-gray-100 flex items-center gap-2"
              >
                <FolderSearch size={16} />{" "}
                {folder ? "Change Folder" : "Pick Folder"}
              </button>
              <button
                onClick={runPreview}
                disabled={!folder || loading === "preview"}
                className="px-3 py-2 rounded-lg bg-yellow-200 font-semibold flex items-center gap-2 disabled:opacity-50"
              >
                {loading === "preview" ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <PlayCircle size={16} />
                )}{" "}
                Preview
              </button>
            </div>

            <div className="text-xs text-gray-600 mt-2">
              {folder || "No folder selected"}
            </div>

            <div className="mt-3 max-h-[260px] overflow-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="text-left p-2">Action</th>
                    <th className="text-left p-2">Source</th>
                    <th className="text-left p-2">Destination</th>
                    <th className="text-left p-2">Rule</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.map((op, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{op.action}</td>
                      <td className="p-2 truncate max-w-[220px]" title={op.src}>
                        {op.src}
                      </td>
                      <td
                        className="p-2 truncate max-w-[220px]"
                        title={op.dest || ""}
                      >
                        {op.dest || ""}
                      </td>
                      <td className="p-2">{op.reason || ""}</td>
                    </tr>
                  ))}
                  {!preview.length && (
                    <tr>
                      <td className="p-3 text-gray-500" colSpan={4}>
                        No preview yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={applyOps}
                disabled={!planned.length || loading === "apply"}
                className="px-3 py-2 rounded-lg bg-yellow-300 font-semibold flex items-center gap-2 disabled:opacity-50"
              >
                {loading === "apply" ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <PlayCircle size={16} />
                )}{" "}
                Apply ({planned.length})
              </button>
              <button
                onClick={undoLast}
                disabled={!lastJobId || loading === "apply"}
                className="px-3 py-2 rounded-lg bg-gray-100 flex items-center gap-2 disabled:opacity-50"
              >
                <Undo2 size={16} /> Undo
              </button>
            </div>
            {lastJobId && (
              <div className="text-xs text-gray-500 mt-1">
                Last job: {lastJobId}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
