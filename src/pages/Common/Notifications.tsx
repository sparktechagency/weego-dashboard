/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaRegBell } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";
import useUserData from "../../hooks/useUserData";
import { useGetAllNotificationsQuery } from "../../redux/features/users/usersApi";
import { FadeLoader } from "react-spinners";
import { formatDateTime } from "../../utils/dateFormet";
import { Pagination } from "antd";

const Notifications = () => {
  const [page, setPage] = useState(1);
  const limit = 12;
  const userData = useUserData();
  const { data: notification, isFetching: notificationFetching } =
    useGetAllNotificationsQuery(
      { page: page, limit: limit },
      {
        skip: userData?.role?.[0] !== "admin" || !open,
        refetchOnMountOrArgChange: true,
      }
    );

  const allNotifications = notification?.data?.attributes?.notification || [];
  if (notificationFetching) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <FadeLoader color="#aa8fff" />
      </div>
    );
  }
  return (
    <div className=" bg-slate-50  rounded-xl">
      <div className="flex items-center bg-secondary-color gap-1 py-3 px-5 mb-3 rounded-tl-xl rounded-tr-xl">
        <MdArrowBackIos
          className="text-xl sm:text-2xl lg:text-3xl text-primary-color cursor-pointer "
          onClick={() => window.history.back()}
        />

        <h1 className="text-3xl font-bold text-primary-color font-integralcf">
          All Notification
        </h1>
      </div>
      <div className="px-4 sm:px-6 md:px-8 ">
        {allNotifications?.map((notification: any) => (
          <div
            key={notification?._id}
            className="flex items-center space-x-3 p-2 border-b border-gray-300 last:border-none"
          >
            {/* Icon */}
            <div className="bg-[#EAECFE] p-2 rounded">
              <FaRegBell className="text-secondary-color" />
            </div>

            {/* Notification text */}
            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-700">
                {notification?.message?.en}
              </span>
              <span className="text-sm text-gray-500">
                {formatDateTime(notification?.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="py-10 flex items-center justify-center">
        {" "}
        <Pagination
          current={page}
          onChange={(page) => setPage(page)}
          total={notification?.data?.attributes?.pagination?.totalResults}
        />
      </div>
    </div>
  );
};
export default Notifications;
