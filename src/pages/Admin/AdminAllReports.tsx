/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAllReportsQuery } from "../../redux/features/report/reportApi";
import { IReport } from "../../types/report.type";
import AdminReportTable from "../../ui/Tables/AdminReportTable";
import ViewReportModal from "../../ui/Modal/Report/ViewReportModal";

const AdminAllReports = () => {
  const [page, setPage] = useState(1);

  const limit = 12;

  const { data, isFetching } = useGetAllReportsQuery({
    page: page,
    limit: limit,
  });

  const allServices: IReport[] = data?.data?.attributes?.result || [];
  const totalServices: number =
    data?.data?.attributes?.pagination?.totalResults || 0;

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
          All Reports
        </h1>
      </div>

      <div
        className="p-4 bg-primary-color rounded-lg mt-5"
        style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
      >
        <AdminReportTable
          data={allServices}
          loading={isFetching}
          showViewModal={showViewModal}
          setPage={setPage}
          page={page}
          total={totalServices}
          limit={limit}
        />
      </div>
      <ViewReportModal
        currentRecord={currentRecord}
        handleCancel={handleCancel}
        isViewModalVisible={isViewModalVisible}
      />
    </div>
  );
};

export default AdminAllReports;
