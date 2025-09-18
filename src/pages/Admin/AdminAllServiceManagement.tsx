/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ServiceManagementData from "../../../public/data/ServiceManagementData";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import AdminServiceManagementTable from "../../ui/Tables/AdminServiceManagementTable";
import ViewServiceManagementModal from "../../ui/Modal/ServiceManagement/ViewServiceManagementModal";

const AdminAllServicesManagement = () => {
  const data: any = ServiceManagementData;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showViewModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div className=" min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-color font-integralcf capitalize">
          Service Management
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
        <AdminServiceManagementTable
          data={data}
          loading={false}
          showViewModal={showViewModal}
          setPage={setPage}
          page={page}
          total={data.length}
          limit={limit}
        />
      </div>
      <ViewServiceManagementModal
        currentRecord={currentRecord}
        handleCancel={handleCancel}
        isViewModalVisible={isViewModalVisible}
      />
    </div>
  );
};

export default AdminAllServicesManagement;
