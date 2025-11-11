//* ------------------ICONS------------------
import dashboardLogo from "/images/dashboard-logo/dashboard.svg";
import usersLogo from "/images/dashboard-logo/users.svg";
import serviceApprovalLogo from "/images/dashboard-logo/serviceApproval.svg";
import categoryLogo from "/images/dashboard-logo/category.svg";
import messageLogo from "/images/dashboard-logo/message.svg";
import serviceManagementLogo from "/images/dashboard-logo/serviceManagement.svg";
import earningLogo from "/images/dashboard-logo/earning.svg";

//* ------------------IMPORT COMPONENTS------------------
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Notifications from "../pages/Common/Notifications";
import AdminAllCategory from "../pages/Admin/AdminAllCategory";
import MessagePage from "../pages/Admin/MessagePage";
import AdminAllTransaction from "../pages/Admin/AdminAllTransaction";
import AdminAllProviders from "../pages/Admin/Users/AdminAllProviders";
import AdminAllContractors from "../pages/Admin/Users/AdminAllContractors";
import AdminAllServices from "../pages/Admin/AdminAllServices";
import AdminAllServicesManagement from "../pages/Admin/AdminAllServiceManagement";
import AdminAllServiceApprovals from "../pages/Admin/AdminAllServiceApprovals";

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
  {
    path: "service-approvals",
    element: <AdminAllServiceApprovals />,
    key: "service-approvals",
    name: "Service Approvals",
    icon: serviceApprovalLogo,
  },
  {
    path: "category",
    element: <AdminAllCategory />,
    key: "category",
    name: "Category",
    icon: categoryLogo,
  },
  {
    path: "messages",
    element: <MessagePage />,
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
    element: <AdminAllTransaction />,
    key: "earning",
    name: "Earning",
    icon: earningLogo,
  },

  {
    path: "notifications",
    element: <Notifications />,
    key: "notifications",
  },
];
