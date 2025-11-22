//* ------------------ICONS------------------
import dashboardLogo from "/images/dashboard-logo/dashboard.svg";
import usersLogo from "/images/dashboard-logo/users.svg";
import categoryLogo from "/images/dashboard-logo/category.svg";
import messageLogo from "/images/dashboard-logo/message.svg";
import serviceManagementLogo from "/images/dashboard-logo/serviceManagement.svg";
import earningLogo from "/images/dashboard-logo/earning.svg";
import reportLogo from "/images/dashboard-logo/report.svg";
import deleteLogo from "/images/dashboard-logo/delete.svg";
import adminLogo from "/images/dashboard-logo/admin.svg";
import appReportLogo from "/images/dashboard-logo/appReport.svg";
import improvementLogo from "/images/dashboard-logo/improvement.svg";

//* ------------------IMPORT COMPONENTS------------------
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Notifications from "../pages/Common/Notifications";
import AdminAllCategory from "../pages/Admin/AdminAllCategory";
import AdminAllTransaction from "../pages/Admin/AdminAllTransaction";
import AdminAllProviders from "../pages/Admin/Users/AdminAllProviders";
import AdminAllContractors from "../pages/Admin/Users/AdminAllContractors";
import AdminAllServices from "../pages/Admin/AdminAllServices";
import AdminAllServicesManagement from "../pages/Admin/AdminAllServiceManagement";
import AdminAllReports from "../pages/Admin/AdminAllReports";
import AdminDeletedUsers from "../pages/Admin/AdminDeletedUsers";
import AdminAllAdmin from "../pages/Admin/AdmiAllAdmin";
import AdminAllEarning from "../pages/Admin/AdminAllEarning";
import AdminAllAppReport from "../pages/Admin/AdminAllAppReport";
import AdminImprovementSuggestion from "../pages/Admin/AdminImprovementSuggestion";
import ConversationPage from "../pages/Admin/ConversationPage";

export const adminPaths = [
  {
    path: "overview",
    element: <AdminDashboard />,
    key: "overview",
    name: "Dashboard",
    icon: dashboardLogo,
  },
  {
    key: "users",
    name: "User's",
    icon: usersLogo,
    children: [
      {
        key: "providers",
        path: "users/providers",
        name: "Providers",
        icon: <span>&#8226;</span>,
        element: <AdminAllProviders />,
      },
      {
        key: "contractors",
        path: "users/contractors",
        name: "Contractors",
        icon: <span>&#8226;</span>,
        element: <AdminAllContractors />,
      },
    ],
  },
  // {
  //   path: "service-approvals",
  //   element: <AdminAllServiceApprovals />,
  //   key: "service-approvals",
  //   name: "Service Approvals",
  //   icon: serviceApprovalLogo,
  // },
  {
    path: "category",
    element: <AdminAllCategory />,
    key: "category",
    name: "Category",
    icon: categoryLogo,
  },
  {
    path: "messages",
    element: <ConversationPage />,
    key: "messages",
    name: "Messages",
    icon: messageLogo,
  },
  {
    path: "all-services",
    element: <AdminAllServices />,
    key: "all-services",
    name: "All Services",
    icon: categoryLogo,
  },
  {
    path: "services-management",
    element: <AdminAllServicesManagement />,
    key: "services-management",
    name: "Service Management",
    icon: serviceManagementLogo,
  },
  {
    path: "earning",
    element: <AdminAllEarning />,
    key: "earning",
    name: "Earning",
    icon: earningLogo,
  },
  {
    path: "transaction",
    element: <AdminAllTransaction />,
    key: "transaction",
    name: "Transaction",
    icon: earningLogo,
  },
  {
    path: "reports",
    element: <AdminAllReports />,
    key: "reports",
    name: "Reports",
    icon: reportLogo,
  },
  {
    path: "deleted-accounts",
    element: <AdminDeletedUsers />,
    key: "deleted-accounts",
    name: "Deleted Accounts",
    icon: deleteLogo,
  },
  {
    path: "all-admin",
    element: <AdminAllAdmin />,
    key: "all-admin",
    name: "Manage Admin",
    icon: adminLogo,
  },
  {
    path: "app-report",
    element: <AdminAllAppReport />,
    key: "app-report",
    name: "App Reports",
    icon: appReportLogo,
  },
  {
    path: "improvement-suggestions",
    element: <AdminImprovementSuggestion />,
    key: "improvement-suggestions",
    name: "Improvement Suggestions",
    icon: improvementLogo,
  },

  {
    path: "notifications",
    element: <Notifications />,
    key: "notifications",
  },
];
