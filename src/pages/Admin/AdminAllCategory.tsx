/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CategoryData from "../../../public/data/CategoryData";
import { IoMdAddCircleOutline } from "react-icons/io";

import ReuseButton from "../../ui/Button/ReuseButton";
import AllCategoryTable from "../../ui/Tables/AdminCategoryTable";
import AddCategoryModal from "../../ui/Modal/Category/AddCategoryModal";
import EditCategoryModal from "../../ui/Modal/Category/EditCategoryModal";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";

const AdminAllCategory = () => {
  const data: any = CategoryData;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showAddModal = (record: any) => {
    setCurrentRecord(record);
    setIsAddModalVisible(true);
  };
  const showEditModal = (record: any) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
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
          Category
        </h1>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <div className="flex justify-end items-center mx-3 py-2 mb-5">
        <ReuseButton
          onClick={showAddModal}
          variant="secondary"
          className="!w-fit"
        >
          <IoMdAddCircleOutline />
          Add Category
        </ReuseButton>
      </div>

      <div
        className="p-4 bg-primary-color rounded-lg mt-5"
        style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
      >
        <AllCategoryTable
          data={data}
          loading={false}
          showEditModal={showEditModal}
          showDeletekModal={showDeleteModal}
          setPage={setPage}
          page={page}
          total={data.length}
          limit={limit}
        />
      </div>

      <AddCategoryModal
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
      />

      <EditCategoryModal
        isEditModalVisible={isEditModalVisible}
        currentRecord={currentRecord}
        handleCancel={handleCancel}
      />

      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default AdminAllCategory;
