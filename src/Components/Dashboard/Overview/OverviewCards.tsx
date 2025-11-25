import { BiTask } from "react-icons/bi";
import { HiMiniUserGroup, HiMiniUsers } from "react-icons/hi2";
import { MdAttachMoney } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa6";
import { useGetAllCountsQuery } from "../../../redux/features/users/usersApi";

const OverviewCards = () => {
  const { data } = useGetAllCountsQuery({});
  const counts = data?.data?.attributes?.userCount;
  const countData = [
    {
      id: 1,
      background: "#ffffff",
      name: "Total Users",
      icon: <HiMiniUserGroup className="size-6 text-secondary-color" />,
      count: counts?.users?.total,
      difference: counts?.users?.comparison?.difference || 0,
      reason: counts?.users?.comparison?.status,
    },
    {
      id: 2,
      background: "#ffffff",
      name: "Providers",
      icon: <HiMiniUsers className="size-6 text-secondary-color" />,
      count: counts?.providers?.total,
      difference: counts?.providers?.comparison?.difference || 0,
      reason: counts?.providers?.comparison?.status,
    },
    {
      id: 3,
      background: "#ffffff",
      name: "Contractors",
      icon: <FaUserCheck className="size-6 text-secondary-color" />,
      count: counts?.contractors?.total,
      difference: counts?.contractors?.comparison?.difference || 0,
      reason: counts?.contractors?.comparison?.status,
    },
    {
      id: 4,
      background: "#ffffff",
      name: "Overall Task Completed",
      icon: <BiTask className="size-6 text-secondary-color" />,
      count: counts?.services?.totalCompleted,
      difference: counts?.services?.comparison?.difference || 0,
      reason: counts?.services?.comparison?.status,
    },
    {
      id: 4,
      background: "#ffffff",
      name: "Earrings From Commission",
      icon: <MdAttachMoney className="size-6 text-secondary-color" />,
      count: `$${counts?.earnings?.totalCommission}`,
      difference: counts?.earnings?.comparison?.difference || 0,
      reason: counts?.earnings?.comparison?.status,
    },
  ];
  return (
    <div className="flex flex-row flex-wrap gap-1 lg:gap-3 mb-5 ">
      {/* Company  */}
      {countData?.map((item) => (
        <div
          key={item.id}
          className={`flex rounded-2xl w-full my-2 lg:my-0 flex-1 border border-[#E1E1E1] p-6`}
          style={{
            backgroundColor: item.background,
            boxShadow: "0px 0px 3px 0.5px #00000010",
          }}
        >
          <div className="!w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-xs sm:text-sm lg:text-base  font-semibold mb-1  tracking-tight w-full text-nowrap">
                {item.name}
              </p>
              <p>{item?.icon}</p>
            </div>
            <p className="text-xl sm:text-2xl lg:text-3xl  font-extrabold capitalize">
              {item.count}
            </p>
            <p className="text-xs lg:text-sm capitalize  mt-2 font-medium">
              <span
                className={`${
                  item.reason === "more"
                    ? "text-green-500"
                    : item.reason === "same"
                    ? "text-gray-500"
                    : "text-red-500"
                }`}
              >
                {" "}
                {item.reason === "more"
                  ? "+"
                  : item.reason === "same"
                  ? ""
                  : "-"}{" "}
                {item.difference}
              </span>{" "}
              from last month
            </p>
            {/* <div className="bg-[#FAF4FF] p-3 rounded-full">{item.icon}</div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
