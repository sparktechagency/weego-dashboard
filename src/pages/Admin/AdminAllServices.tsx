/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import AdminServiceTable from "../../ui/Tables/AdminServiceTable";
import DeleteCategoryModal from "../../ui/Modal/Category/DeleteCategoryModal";
import { useGetAllServicesQuery } from "../../redux/features/allServices/allServicesApi";
import { IService } from "../../types/service.type";

const AdminAllServices = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;

  const { data, isFetching } = useGetAllServicesQuery({
    page: page,
    limit: limit,
    search: searchText,
  });

  const allServices: IService[] = data?.data?.attributes?.result || [];
  const totalServices: number =
    data?.data?.attributes?.pagination?.totalResults || 0;

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = (record: any) => {
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
        <AdminServiceTable
          data={allServices}
          loading={isFetching}
          showDeletekModal={showDeleteModal}
          setPage={setPage}
          page={page}
          total={totalServices}
          limit={limit}
        />
      </div>

      <DeleteCategoryModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default AdminAllServices;
