/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Modal } from "antd";
import SpinLoader from "../../SpinLoader";
import {
  useGetReportDetailsQuery,
  useMarkAsSolvedMutation,
} from "../../../redux/features/report/reportApi";
import { IReport } from "../../../types/report.type";
import { BiMessageSquare } from "react-icons/bi";
import { formatDateTime } from "../../../utils/dateFormet";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { useCreateConversationMutation } from "../../../redux/features/conversation/conversationApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useNavigate } from "react-router-dom";
import ReuseButton from "../../Button/ReuseButton";

interface ViewReportModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}

const ViewReportModal: React.FC<ViewReportModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const navigate = useNavigate();
  const [createConversation] = useCreateConversationMutation();
  const [markAsSolved] = useMarkAsSolvedMutation();
  const { data, isFetching } = useGetReportDetailsQuery(currentRecord?._id, {
    skip: !isViewModalVisible || !currentRecord?._id,
    refetchOnMountOrArgChange: true,
  });

  const reportData: IReport = data?.data?.attributes?.[0] || {};

  const serverUrl = getImageUrl();

  const onCreateConversation = async (id: string) => {
    const res = await tryCatchWrapper(
      createConversation,
      { body: { users: id } },
      "Adding Category..."
    );

    if (res?.statusCode === 201) {
      handleCancel();
      navigate("/admin/messages");
    }
  };

  const handleMarkAsResolved = async (id: string) => {
    const res = await tryCatchWrapper(markAsSolved, { params: id });
    if (res?.statusCode === 200) {
      handleCancel();
    }
  };
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[800px] p-5"
    >
      {isFetching ? (
        <div className="h-96 w-full flex justify-center items-center">
          <SpinLoader />
        </div>
      ) : (
        <div className="text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-5">
            Report Details
          </h3>

          {/* Report Information */}
          <div className="bg-[#EFEFEF] rounded p-4 mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">
              Report information
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-xs text-gray-700 mb-1">Reason</p>
                <p className="text-sm font-semibold text-gray-900">
                  {reportData?.option || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-700 mb-1">Date Reported</p>
                <p className="text-sm font-semibold text-gray-900">
                  {reportData?.createdAt
                    ? formatDateTime(reportData.createdAt)
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#EFEFEF] rounded p-4 mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              Report Details
            </h3>
            <p className="text-sm text-gray-800 leading-relaxed">
              {reportData?.comment || "No additional details provided."}
            </p>
            {reportData?.image?.length > 0 && (
              <div className="flex gap-3 flex-wrap mt-3">
                {reportData.image.map((img, idx) => (
                  <Image
                    key={idx}
                    src={serverUrl + img}
                    alt={`report-img-${idx}`}
                    className="!h-40 !w-40 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="my-5 h-[1px] bg-base-color/20"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#EFEFEF] p-5 rounded-lg">
              <h3 className="text-sm font-bold text-gray-900 mb-3">
                Reporter information
              </h3>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                {reportData?.reporterName || "N/A"}
              </p>
              <p className="text-xs text-gray-600 mb-4">
                {reportData?.reporterEmail || "N/A"}
              </p>
              {reportData?.reporterId && (
                <button
                  onClick={() => {
                    onCreateConversation(reportData?.reporterId);
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 px-4 rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <BiMessageSquare size={16} />
                  Contact Reporter
                </button>
              )}
            </div>

            <div className="bg-[#EFEFEF] p-5 rounded-lg">
              <h3 className="text-sm font-bold text-gray-900 mb-3">
                Target User information
              </h3>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                {reportData?.targetUserName || "N/A"}
              </p>
              <p className="text-xs text-gray-600 mb-4">
                {reportData?.targetUserEmail || "N/A"}
              </p>
              {
                // @ts-ignore
                reportData?.targetUserId && (
                  <button
                    onClick={() => {
                      onCreateConversation(reportData?.targetUserId);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-4 rounded flex items-center justify-center gap-2 transition-colors"
                  >
                    <BiMessageSquare size={16} />
                    Contact Target User
                  </button>
                )
              }
            </div>
          </div>
          {!reportData?.isSolved && (
            <ReuseButton
              variant="secondary"
              className="!bg-secondary-color/20 !w-fit !mt-5 !text-secondary-color !font-semibold"
              onClick={() => handleMarkAsResolved(reportData?._id)}
            >
              Mark as Resolved
            </ReuseButton>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ViewReportModal;
