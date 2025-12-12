/* eslint-disable react-refresh/only-export-components */
import {
  createBrowserRouter,
  RouteObject,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

import Loading from "../ui/Loading";
import { routeGenerator } from "../utils/routesGenerator";
import ProtectedRoute from "./ProtectedRoute";

//* Auth
import SignIn from "../pages/Auth/SignIn";
import ForgotPassword from "../pages/Auth/ForgetPassword";
import OtpPage from "../pages/Auth/OtpPage";
import UpdatePassword from "../pages/Auth/UpdatePassword";

import NotFound from "../ui/NotFound/NotFound";
import DashboardLayout from "../Components/Layout/DashboardLayout";
import { commonPaths } from "./common.route";

import Cookies from "js-cookie";
import { decodedToken } from "../utils/jwt";
import { filterAdminPathsByUser } from "../utils/filterAdminPathsByPermission";
import useUserData from "../hooks/useUserData";

// ========================
// Auth Redirect Component
// ========================
function AuthRedirect() {
  const user = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user?.role?.[0] === "admin") {
      navigate(`/${user?.role?.[0]}/overview`, { replace: true });
    } else {
      navigate("/sign-in", { replace: true });
    }
  }, [navigate, user]);

  return <Loading />;
}

// ========================
// Get Current User from Cookie
// ========================
const token = Cookies.get("weego_accessToken");
const currentUser = token ? decodedToken(token) : null;

// Filter admin routes based on user
const filteredAdminPaths = filterAdminPathsByUser(currentUser);

// ========================
// ROUTER CONFIG
// ========================
const router: RouteObject[] = [
  // Redirect root
  {
    path: "/",
    index: true,
    element: <AuthRedirect />,
  },
  {
    path: "/dashboard",
    index: true,
    element: <AuthRedirect />,
  },
  {
    path: "/admin",
    index: true,
    element: <AuthRedirect />,
  },

  // =============================
  // Main ADMIN LAYOUT (Only once!)
  // =============================
  {
    path: "admin",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      ...routeGenerator(filteredAdminPaths), // Filtered by permission
      ...routeGenerator(commonPaths), // Always allowed
    ],
  },

  // =============================
  // AUTH ROUTES
  // =============================
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "forgot-password/verify-otp",
    element: <OtpPage />,
  },
  {
    path: "update-password",
    element: <UpdatePassword />,
  },

  // Catch-all 404
  {
    path: "*",
    element: <NotFound />,
  },
];

// Create the router
const routes = createBrowserRouter(router);

export default routes;
