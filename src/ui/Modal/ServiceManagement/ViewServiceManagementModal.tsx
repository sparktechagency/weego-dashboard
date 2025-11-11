/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { FaUser, FaUserCheck } from "react-icons/fa6";
import { MdCalendarToday } from "react-icons/md";
import { formatDateTime } from "../../../utils/dateFormet";
import { useGetBookingDetailsQuery } from "../../../redux/features/booking/bookingApi";
import { IBooking } from "../../../types/booking.type";
import SpinLoader from "../../SpinLoader";

interface ViewServiceManagementModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any; // পরিবর্তে তুমি strongly typed interface ব্যবহার করতে পারো
}

const ViewServiceManagementModal: React.FC<ViewServiceManagementModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const { data, isFetching } = useGetBookingDetailsQuery(currentRecord?._id, {
    skip: !isViewModalVisible || !currentRecord?._id,
    refetchOnMountOrArgChange: true,
  });
  const bookingData: IBooking = data?.data?.attributes?.[0] || {};

  console.log(bookingData);
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[750px]"
    >
      {isFetching ? (
        <div className="h-96 w-full flex justify-center items-center">
          <SpinLoader />
        </div>
      ) : (
        <div className="p-2 text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">
            Task Details
          </h3>

          <div className="flex flex-col gap-2 mt-5">
            <div className="flex justify-between items-center gap-5 mb-3">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                Delivery
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                {bookingData?.status === "completed" ? (
                  <span className="text-success-color">Completed</span>
                ) : bookingData?.status === "pending" ? (
                  <span className="text-warning-color">Pending</span>
                ) : bookingData?.status === "cancelled" ? (
                  <span className="text-error-color">Cancel</span>
                ) : (
                  <span className="text-base-color">{bookingData?.status}</span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <MdCalendarToday className="text-base sm:text-lg lge:text-xl font-semibold" />
              <p className="text-xs sm:text-sm lge:text-lg font-semibold">
                Created: {formatDateTime(bookingData?.createdAt)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <MdCalendarToday className="text-base sm:text-lg lge:text-xl font-semibold" />
              <p className="text-xs sm:text-sm lge:text-lg font-semibold">
                Scheduled:{" "}
                {bookingData?.date ? formatDateTime(bookingData.date) : "N/A"}
              </p>
            </div>
          </div>

          <div className="my-5 h-[1px] bg-base-color/20"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <FaUser className="text-secondary-color text-sm sm:text-base md:text-lg lg:text-xl font-bold" />
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                  Requesting User
                </p>
              </div>
              <div className="bg-slate-100 p-4 rounded-xl mt-3">
                <p className="text-xs sm:text-sm lge:text-lg mb-1 font-bold">
                  {bookingData?.contractorName || "N/A"}
                </p>
                <p className="text-xs sm:text-sm lge:text-lg mb-1">
                  {bookingData?.contractorEmail || "N/A"}
                </p>
                <p className="text-xs sm:text-sm lge:text-lg">
                  {bookingData?.addressDetails?.fullAddress || "N/A"}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <FaUserCheck className="text-secondary-color text-base sm:text-lg md:text-xl lg:text-2xl font-bold" />
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                  Service Provider
                </p>
              </div>
              <div className="bg-slate-100 p-4 rounded-xl mt-3">
                <p className="text-xs sm:text-sm lge:text-lg font-bold mb-1">
                  {bookingData?.providerName || "N/A"}
                </p>
                <p className="text-xs sm:text-sm lge:text-lg mb-1">
                  {bookingData?.providerEmail || "N/A"}
                </p>
                <p className="text-xs sm:text-sm lge:text-lg">
                  {bookingData?.providercontact1 ||
                    bookingData?.providercontact2 ||
                    "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="my-5 h-[1px] bg-base-color/20"></div>

          <div className="flex items-center gap-5 flex-wrap">
            <div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                Task Category
              </p>
              <p className="text-xs sm:text-sm lg:text-lg mb-1">
                {bookingData?.categoryName || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                Amount
              </p>
              <p className="text-xs sm:text-sm lg:text-lg mb-1">
                ৳{bookingData?.total || 0}
              </p>
            </div>
          </div>

          <div className="my-5 h-[1px] bg-base-color/20"></div>

          <div className="flex items-center gap-5 flex-wrap">
            <div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                Location
              </p>
              <p className="text-xs sm:text-sm lg:text-lg mb-1">
                {bookingData?.addressDetails?.fullAddress || "N/A"}
              </p>
            </div>
          </div>

          <div className="my-5 h-[1px] bg-base-color/20"></div>

          {bookingData?.status === "cancelled" && (
            <div className="flex items-center gap-5 flex-wrap">
              <div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-error-color">
                  Cancelation Details
                </p>
                <div className="bg-red-200 p-4 rounded-xl mt-3">
                  <p className="text-xs sm:text-sm lge:text-lg mb-1 font-bold">
                    Cancelled by: {bookingData?.canceledBy || "N/A"}
                  </p>
                  <p className="text-xs sm:text-sm lge:text-lg mb-1 font-bold">
                    Reason: {bookingData?.options || "N/A"}
                  </p>
                  <p className="text-xs sm:text-sm lge:text-lg mb-1 font-bold">
                    Details: {bookingData?.cancelationReason || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ViewServiceManagementModal;
