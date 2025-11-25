/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarsOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { FaBell, FaRegBell } from "react-icons/fa6";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";
import { getImageUrl } from "../../helpers/config/envConfig";
import { useGetAllNotificationsQuery } from "../../redux/features/users/usersApi";
import { useState } from "react";
import { FadeLoader } from "react-spinners";
import { formatDateTime } from "../../utils/dateFormet";

const Topbar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState(false);

  const { data } = useGetProfileQuery({});

  const profileData = data?.data?.attributes;
  console.log(profileData);

  const { data: notification, isFetching: notificationFetching } =
    useGetAllNotificationsQuery(
      { page: 1, limit: 6 },
      {
        skip: profileData?.role?.[0] !== "admin" || !open,
        refetchOnMountOrArgChange: open,
      }
    );

  const allNotifications = notification?.data?.attributes?.notification || [];

  const handleMenuClick = () => {
    setCollapsed(false);
  };

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-full text-center bg-white p-4 rounded-lg min-w-60"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
      onClick={handleMenuClick}
    >
      {notificationFetching ? (
        <div className="flex items-center justify-center h-[200px] !w-[300px]">
          <FadeLoader color="#aa8fff" />
        </div>
      ) : (
        allNotifications?.map((notification: any) => (
          <div className="test-start" key={notification?._id}>
            <div className="flex items-center gap-2">
              <div className="bg-[#EAECFE] p-2 rounded">
                <FaRegBell className="text-secondary-color" />
              </div>
              <div className="flex flex-col items-start">
                <p>{notification?.message?.en}</p>
                <p className="text-gray-400">
                  {formatDateTime(notification?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
      <Link
        to={`/${profileData?.role?.[0]}/notifications`}
        className="w-2/3 mx-auto !bg-secondary-color !text-primary-color rounded-xl h-8 py-1"
      >
        See More
      </Link>
    </div>
  );
  const serverUrl = getImageUrl();
  return (
    <div className="py-2  flex justify-between gap-0 items-center">
      <div className="flex items-center gap-2 text-base-color ">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl text-primary-color"
        />
      </div>
      <div className="flex items-center justify-center  gap-5">
        <Dropdown
          overlay={notificationMenu}
          trigger={["hover"]}
          onOpenChange={(open: boolean) => {
            setOpen(open);
          }}
          placement="bottomRight"
          className="cursor-pointer"
        >
          <FaBell className="text-2xl text-secondary-color" />
        </Dropdown>
        <Link to="profile">
          <img
            src={
              profileData?.image
                ? serverUrl + profileData?.image
                : AllImages.profile
            }
            alt="profile_pic"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
            className="rounded-full border border-secondary-color"
          />
        </Link>
      </div>
    </div>
  );
};
export default Topbar;
