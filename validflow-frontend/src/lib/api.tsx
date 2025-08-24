import axios from "axios";

const BASE = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:4427";

export type ErrorLog = {
  id: number;
  error_name: string;
  category: string;
  message?: string;
  file_path?: string;
  line_number?: number;
  stack_trace?: string;
  timestamp: string;
};

export type RuleCondition = {
  extensions: string[];
  name_regex?: string;
  contains_text?: string;
  size_min_kb?: number;
  size_max_kb?: number;
  source_contains?: string;
};

export type RuleAction = {
  move_to?: string;
  rename_template?: string;
  delete?: boolean;
};

export type Rule = {
  id: number;
  name: string;
  priority: number;
  enabled: boolean;
  stop_on_match: boolean;
  conditions: RuleCondition;
  actions: RuleAction;
};

export type RuleCreate = Omit<Rule, "id">;

export type Operation = {
  src: string;
  dest?: string | null;
  rule_id?: number | null;
  action: "move" | "delete" | "none";
  reason?: string | null;
};

// Create axios instance for common config
const apiClient = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  async listRules(): Promise<Rule[]> {
    const { data } = await apiClient.get<Rule[]>("/rules");
    return data;
  },
  async createRule(body: RuleCreate): Promise<Rule> {
    const { data } = await apiClient.post<Rule>("/rules", body);
    return data;
  },
  async updateRule(id: number, body: RuleCreate): Promise<Rule> {
    const { data } = await apiClient.put<Rule>(`/rules/${id}`, body);
    return data;
  },
  async deleteRule(id: number) {
    const { data } = await apiClient.delete(`/rules/${id}`);
    return data;
  },
  async preview(folder: string, limit_files = 1000): Promise<Operation[]> {
    const { data } = await apiClient.post<Operation[]>("/preview", {
      folder,
      limit_files,
    });
    return data;
  },
  async apply(operations: Operation[]) {
    const { data } = await apiClient.post("/rules/apply", { operations });
    return data;
  },
  async undo(job_id: string) {
    const { data } = await apiClient.post("/rules/undo", { job_id });
    return data;
  },
  async listErrorLogs(): Promise<ErrorLog[]> {
    const { data } = await apiClient.get<ErrorLog[]>("/error-logs");
    return data;
  },
};
