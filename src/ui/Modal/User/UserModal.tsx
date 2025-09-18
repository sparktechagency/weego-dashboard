/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";

interface UserModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
  isContractor?: any;
}

const UserModal: React.FC<UserModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  isContractor = false,
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <div className="p-2">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-base-color">
            User Details
          </h3>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={AllImages.profile}
              alt={currentRecord?.name || "John Doe"}
              className="w-32 h-32 object-cover rounded"
            />
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-base-color">
              {currentRecord?.name || "John Doe"}
            </h2>
          </div>

          <div className="my-5">
            <div className="text-xs sm:text-sm lg:text-base  mt-3">
              <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
                <span className="font-semibold">Email:</span>
                <span>{currentRecord?.email || "abc572@example.com"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
                <span className="font-semibold">Date of Birth :</span>
                <span>{currentRecord?.dateOfBirth || "2023-01-01"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-input-color py-1 gap-2 mb-2">
                <span className="font-semibold">Gender: </span>
                <span className="">{currentRecord?.gender || "Male"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-input-color py-1 gap-2 mb-2">
                <span className="font-semibold">Language: </span>
                <span className="">{currentRecord?.language || "English"}</span>
              </div>
              {!isContractor && (
                <div>
                  <div className="flex items-center justify-between border-b border-input-color py-1 gap-2 mb-2">
                    <span className="font-semibold">Coverage Area: </span>
                    <span className="">
                      {currentRecord?.coverageArea || "London"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-input-color py-1 gap-2 mb-2">
                    <span className="font-semibold">Schedule: </span>
                    <span className="">
                      {currentRecord?.schedule || "10:00 AM - 6:00 PM"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-input-color py-1 gap-2 mb-2">
                    <span className="font-semibold">Certificates: </span>
                    <span className="">
                      {currentRecord?.certificates || "Yes"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
