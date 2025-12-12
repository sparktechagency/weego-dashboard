/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../../ui/Form/ReuseSearchInput";
import UserModal from "../../../ui/Modal/User/UserModal";
import BlockModal from "../../../ui/Modal/BlockModal";
import UnblockModal from "../../../ui/Modal/UnblockModal";
import AdminConstractorTable from "../../../ui/Tables/AdminUsers/AdminConstractorTable";
import {
  useBlockAndUnblockUserMutation,
  useGetAllUsersQuery,
} from "../../../redux/features/users/usersApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

const AdminAllContractors = () => {
  const [blockAndUnblockUser] = useBlockAndUnblockUserMutation();

  const [page, setPage] = useState(1);
  const limit = 12;
  const [searchText, setSearchText] = useState("");

  const { data, isFetching } = useGetAllUsersQuery({
    page: page,
    limit: limit,
    search: searchText,
    role: "contractor",
  });

  const allUsers: any[] = data?.data?.attributes?.users || [];
  const totalUsers: number =
    data?.data?.attributes?.pagination?.totalResults || 0;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showBlockModal = (record: any) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: any) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setCurrentRecord(null);
  };

  const handleBlock = async (record: any) => {
    const res = await tryCatchWrapper(
      blockAndUnblockUser,
      {
        params: record?._id,
      },
      "Blocking..."
    );
    if (res?.statusCode === 200) {
      handleCancel();
    }
  };
  const handleUnblock = async (record: any) => {
    const res = await tryCatchWrapper(
      blockAndUnblockUser,
      {
        params: record?._id,
      },
      "Unblocking..."
    );
    if (res?.statusCode === 200) {
      handleCancel();
    }
  };
  return (
    <div className=" min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-color font-integralcf capitalize">
          Contractors
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
        <AdminConstractorTable
          data={allUsers}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={totalUsers}
          limit={limit}
        />
      </div>
      <UserModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        isContractor={true}
      />
      <BlockModal
        isBlockModalVisible={isBlockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleBlock={handleBlock}
        description=" Are You Sure You want to Block This User ?"
      />
      <UnblockModal
        isUnblockModalVisible={isUnblockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleUnblock={handleUnblock}
        description=" Are You Sure You want to Unblock This User ?"
      />
    </div>
  );
};

export default AdminAllContractors;
