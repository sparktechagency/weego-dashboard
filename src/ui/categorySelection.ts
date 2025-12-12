export const categoryRoutesMap: Record<string, string[]> = {
  all: ["*"], // access to everything
  users: ["users/providers", "users/contractors"], // matches adminPaths children
  category: ["category"],
  message: ["messages"],
  "all-services": ["all-services"],
  "services-management": ["services-management"],
  earning: ["earning"],
  transaction: ["transaction"],
  reports: ["reports"],
  "deleted-accounts": ["deleted-accounts"],
  "all-admin": ["all-admin"],
  "app-report": ["app-report"],
  "improvement-suggestion": ["improvement-suggestions"],
};
