/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ServiceData from "../../../public/data/ServiceData";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import AdminAllServiceApprovalsTable from "../../ui/Tables/AdminAllServiceApprovalsTable";
import DeclineModal from "../../ui/Modal/DeclineModal";
import ApproveModal from "../../ui/Modal/ApproveModal";

const AdminAllServiceApprovals = () => {
  const data: any = ServiceData;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;

  const [isDeclineModalVisible, setIsDeclineModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showApproveModal = (record: any) => {
    setCurrentRecord(record);
    setIsApproveModalVisible(true);
  };

  const showDeclineModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeclineModalVisible(true);
  };

  const handleCancel = () => {
    setIsDeclineModalVisible(false);
    setIsApproveModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDecline = (record: any) => {
    handleCancel();
    console.log(record);
  };

  const handleApprove = (record: any) => {
    handleCancel();
    console.log(record);
  };

  return (
    <div className=" min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-color font-integralcf capitalize">
          All Services
        </h1>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>

      <div
        className="p-4 bg-primary-color rounded-lg mt-5"
        style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
      >
        <AdminAllServiceApprovalsTable
          data={data}
          loading={false}
          showDeclineModal={showDeclineModal}
          showApproveModal={showApproveModal}
          setPage={setPage}
          page={page}
          total={data.length}
          limit={limit}
        />
      </div>

      <DeclineModal
        isDeclineModalVisible={isDeclineModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDecline={handleDecline}
      />
      <ApproveModal
        isApproveModalVisible={isApproveModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleApprove={handleApprove}
      />
    </div>
  );
};

export default AdminAllServiceApprovals;
