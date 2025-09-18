/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { FaUser, FaUserCheck } from "react-icons/fa6";
import { MdCalendarToday } from "react-icons/md";
import { AllImages } from "../../../../public/images/AllImages";

interface ViewServiceManagementModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
  isContractor?: any;
}

const ViewServiceManagementModal: React.FC<ViewServiceManagementModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[750px]"
    >
      <div className="p-2">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-base-color">
            Task Details
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center gap-5 mt-5 mb-3">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                Delivery
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                {currentRecord?.Status === "Completed" ? (
                  <span className="text-success-color">Completed</span>
                ) : (
                  <span className="text-warning-color">Pending</span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MdCalendarToday className="text-base sm:text-lg lge:text-xl font-semibold" />
              <p className="text-xs sm:text-sm lge:text-lg font-semibold">
                Created: June 20 2025 at 10 : 00 AM
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MdCalendarToday className="text-base sm:text-lg lge:text-xl font-semibold" />
              <p className="text-xs sm:text-sm lge:text-lg font-semibold">
                Scheduled: June 20 2025 at 3:00 PM-5:00 PM
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
                  Emily Davis
                </p>
                <p className="text-xs sm:text-sm lge:text-lg mb-1">
                  emily.davis@email.com
                </p>
                <p className="text-xs sm:text-sm lge:text-lg">George Town</p>
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
                  Emily Davis
                </p>
                <p className="text-xs sm:text-sm lge:text-lg mb-1">
                  emily.davis@email.com
                </p>
                <p className="text-xs sm:text-sm lge:text-lg">George Town</p>
              </div>
            </div>
          </div>
          <div className="my-5 h-[1px] bg-base-color/20"></div>
          <div className="flex items-center gap-5 flex-wrap">
            <div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                Task Category
              </p>
              <p className="text-xs sm:text-sm lg:text-lg mb-1">Gardening</p>
            </div>
            <div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                Amount
              </p>
              <p className="text-xs sm:text-sm lg:text-lg mb-1">$900</p>
            </div>
          </div>
          <div className="my-5 h-[1px] bg-base-color/20"></div>
          <div className="flex items-center gap-5 flex-wrap">
            <div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                Location
              </p>
              <p className="text-xs sm:text-sm lg:text-lg mb-1">
                112 George Town , Cayman Island
              </p>
            </div>
          </div>
          <div className="my-5 h-[1px] bg-base-color/20"></div>
          {currentRecord?.Status === "Completed" ? (
            <div className="flex items-center gap-5 flex-wrap">
              <div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                  Work Images
                </p>
                <img src={AllImages.cover} className="h-44 w-40 rounded mt-5" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-5 flex-wrap">
              <div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-error-color">
                  Cancelation Details
                </p>
                <div className="bg-red-200 p-4 rounded-xl mt-3">
                  <p className="text-xs sm:text-sm lge:text-lg mb-1 font-bold">
                    Cancelled by: Emily Davis
                  </p>
                  <p className="text-xs sm:text-sm lge:text-lg mb-1 font-bold">
                    Reason: Changed mind
                  </p>
                  <p className="text-xs sm:text-sm lge:text-lg mb-1 font-bold">
                    Details: I’ve changed my mind. Don’t need it for now
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ViewServiceManagementModal;
