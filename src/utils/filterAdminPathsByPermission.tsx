import { adminPaths } from "../Routes/admin.route";
import { IJwtPayload } from "../types";
import { categoryRoutesMap } from "../ui/categorySelection";

const alwaysAllowed = [
  "overview",
  "profile",
  "notifications",
  "setting/change-password",
];

export const filterAdminPathsByUser = (user: IJwtPayload) => {
  const userCategories = user?.categoryPermissions || [];
  const hasAllPermission = userCategories.includes("all");

  const filterItems = (items: typeof adminPaths): typeof adminPaths => {
    return items
      .map((item) => {
        const allowedRoutes = userCategories.flatMap(
          (cat) => categoryRoutesMap[cat] || []
        );

        const isAllowed =
          hasAllPermission ||
          (item.path && allowedRoutes.includes(item.path)) ||
          (item.children &&
            item.children.some((child) =>
              allowedRoutes.includes(child.path || "")
            )) ||
          (item.path && alwaysAllowed.includes(item.path));

        if (!isAllowed) return null;

        const filteredChildren = item.children
          ? filterItems(item.children as unknown as typeof adminPaths)
          : undefined;

        return { ...item, children: filteredChildren };
      })
      .filter(Boolean) as typeof adminPaths;
  };

  return filterItems(adminPaths);
};
