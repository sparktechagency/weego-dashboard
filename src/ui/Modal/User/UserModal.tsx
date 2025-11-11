import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { IContractor, IProvider } from "../../../types";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { useGetUserDetailsQuery } from "../../../redux/features/users/usersApi";
import SpinLoader from "../../SpinLoader";
import { formatDate } from "../../../utils/dateFormet";
import { MdOutlineEmail } from "react-icons/md";
import { TbCalendarUser } from "react-icons/tb";
import { FaRegMap, FaTransgender } from "react-icons/fa6";
import { IoLanguage } from "react-icons/io5";

interface UserModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IProvider | null;
  isContractor?: boolean;
}

const UserModal: React.FC<UserModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  isContractor = false,
}) => {
  const { data, isFetching } = useGetUserDetailsQuery(currentRecord?._id, {
    skip: !isViewModalVisible || !currentRecord?._id,
    refetchOnMountOrArgChange: true,
  });
  const userData: IProvider | IContractor = data?.data?.attributes;
  const serverUrl = getImageUrl();

  console.log(userData);
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      {isFetching ? (
        <div className="h-80 w-full flex justify-center items-center">
          <SpinLoader />
        </div>
      ) : (
        <div className="p-2">
          <div className="text-base-color">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-base-color">
              User Details
            </h3>
            <div className="flex flex-col justify-center items-center gap-2 mt-5">
              {/* Avatar */}
              <img
                src={AllImages.profile}
                alt={
                  serverUrl + userData?.image
                    ? serverUrl + userData?.image
                    : AllImages.profile
                }
                className="w-32 h-32 object-cover rounded"
              />
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-base-color">
                {userData?.fullName || ""}
              </h2>
            </div>

            <div className="my-5">
              <div className="text-xs sm:text-sm lg:text-base  mt-3">
                <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
                  <span className="font-semibold flex items-center gap-1">
                    <MdOutlineEmail className="size-5" />
                    Email:
                  </span>
                  <span>{userData?.email || "abc572@example.com"}</span>
                </div>
                <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
                  <span className="font-semibold flex items-center gap-1">
                    <TbCalendarUser className="size-5" />
                    Date of Birth :
                  </span>
                  <span>{formatDate(userData?.dob) || ""}</span>
                </div>
                <div className="flex items-center justify-between border-b border-input-color py-1 gap-2 mb-2">
                  <span className="font-semibold flex items-center gap-1">
                    <FaTransgender className="size-5" />
                    Gender:{" "}
                  </span>
                  <span className="">{userData?.gender || ""}</span>
                </div>
                <div className="flex items-center justify-between border-b border-input-color py-1 gap-2 mb-2">
                  <span className="font-semibold flex items-center gap-1">
                    <IoLanguage className="size-5" />
                    Language:{" "}
                  </span>
                  <span className="">{userData?.language || ""}</span>
                </div>
                {isContractor && (
                  <div>
                    <div className="flex items-center justify-between border-b border-input-color py-1 gap-2 mb-2">
                      <span className="font-semibold flex items-center gap-1">
                        <FaRegMap className="size-5" />
                        Coverage Area:{" "}
                      </span>
                      <span className="">{userData?.coverageArea || ""}</span>
                    </div>
                    {/* <div className="flex items-center justify-between border-b border-input-color py-1 gap-2 mb-2">
                      <span className="font-semibold flex items-center gap-1">Overall Earnings: </span>
                      <span className="">
                        {userData?.earning || "10:00 AM - 6:00 PM"}
                      </span>
                    </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UserModal;
