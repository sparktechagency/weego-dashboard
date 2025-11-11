import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

import ReuseButton from "../../ui/Button/ReuseButton";
import AllCategoryTable from "../../ui/Tables/AdminCategoryTable";
import AddCategoryModal from "../../ui/Modal/Category/AddCategoryModal";
import EditCategoryModal from "../../ui/Modal/Category/EditCategoryModal";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";
import { ICategory } from "../../types/category.type";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "../../redux/features/category/categoryApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const AdminAllCategory = () => {
  const [deleteCategory] = useDeleteCategoryMutation();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 12;

  const { data, isFetching } = useGetCategoryQuery({
    page: page,
    limit: limit,
    search: searchText,
  });

  const allCategory: ICategory[] = data?.data?.attributes?.category || [];
  const totalCategory: number =
    data?.data?.attributes?.pagination?.totalResults || 0;

  console.log(allCategory);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<ICategory | null>(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
  const showEditModal = (record: ICategory) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (record: ICategory) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (data: ICategory) => {
    const response = await tryCatchWrapper(deleteCategory, {
      params: { id: data?._id },
    });

    if (response?.statusCode === 201) {
      handleCancel();
    }
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
          data={allCategory}
          loading={isFetching}
          showEditModal={showEditModal}
          showDeletekModal={showDeleteModal}
          setPage={setPage}
          page={page}
          total={totalCategory}
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
