/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import AdminServiceManagementTable from "../../ui/Tables/AdminServiceManagementTable";
import ViewServiceManagementModal from "../../ui/Modal/ServiceManagement/ViewServiceManagementModal";
import { useGetAllBookingQuery } from "../../redux/features/booking/bookingApi";
import { IBooking } from "../../types/booking.type";

const AdminAllServicesManagement = () => {
  const [page, setPage] = useState(1);

  const limit = 12;

  const { data, isFetching } = useGetAllBookingQuery({
    page: page,
    limit: limit,
  });

  const allServices: IBooking[] = data?.data?.attributes?.data || [];
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
          Service Management
        </h1>
      </div>

      <div
        className="p-4 bg-primary-color rounded-lg mt-5"
        style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
      >
        <AdminServiceManagementTable
          data={allServices}
          loading={isFetching}
          showViewModal={showViewModal}
          setPage={setPage}
          page={page}
          total={totalServices}
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
