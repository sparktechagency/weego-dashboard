/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseSearchInput from "../../../ui/Form/ReuseSearchInput";
import UserModal from "../../../ui/Modal/User/UserModal";
import BlockModal from "../../../ui/Modal/BlockModal";
import UnblockModal from "../../../ui/Modal/UnblockModal";
import AllProvidersTable from "../../../ui/Tables/AdminUsers/AllProvidersTable";
import {
  useBlockAndUnblockUserMutation,
  useGetAllUsersQuery,
} from "../../../redux/features/users/usersApi";
import { IProvider } from "../../../types";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

const AdminAllProviders = () => {
  const [blockAndUnblockUser] = useBlockAndUnblockUserMutation();
  const [page, setPage] = useState(1);
  const limit = 12;
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const { data, isFetching } = useGetAllUsersQuery({
    page: page,
    limit: limit,
    search: searchText,
    role: "provider",
  });

  const allUsers: IProvider[] = data?.data?.attributes?.users || [];
  const totalUsers: number =
    data?.data?.attributes?.pagination?.totalResults || 0;

  console.log(data);

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IProvider | null>(null);

  const showViewUserModal = (record: IProvider) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showBlockModal = (record: IProvider) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: IProvider) => {
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
          Providers
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
        <AllProvidersTable
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

export default AdminAllProviders;
