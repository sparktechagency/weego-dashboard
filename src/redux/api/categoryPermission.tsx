import { Navigate, useLocation } from "react-router-dom";
import { IJwtPayload } from "../../types";
import { categoryRoutesMap } from "../../ui/categorySelection";

const normalizeRoute = (route: string) => route.split("/")[0];

const CategoryProtectedRoute = ({
  user,
  routeName,
  children,
}: {
  user: IJwtPayload;
  routeName: string;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const cleanRoute = normalizeRoute(routeName);

  // Always allow profile, logout, settings
  if (
    ["profile", "notifications", "setting/change-password"].includes(cleanRoute)
  ) {
    return children;
  }

  const userCategories = user?.categoryPermissions || [];

  const allowed = userCategories.some((category) => {
    const allowedRoutes = categoryRoutesMap[category];
    return allowedRoutes?.includes(cleanRoute) || allowedRoutes?.includes("*");
  });

  if (!allowed) {
    return <Navigate to="/not-found" state={{ from: location }} replace />;
  }

  return children;
};

export default CategoryProtectedRoute;
