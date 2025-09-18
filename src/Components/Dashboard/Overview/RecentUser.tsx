/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import AdminRecentUsersTable from "../../../ui/Tables/AdminRecentUsersTable";
import RecentuserData from "../../../../public/data/ReqHost";
import UnblockModal from "../../../ui/Modal/UnblockModal";
import BlockModal from "../../../ui/Modal/BlockModal";
import UserModal from "../../../ui/Modal/User/UserModal";

const RecentUser = () => {
  const recentUserData = RecentuserData.slice(0, 6);

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isUnBlockModalVisible, setIsUnBlockModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showUnblockModal = (record: any) => {
    setCurrentRecord(record);
    setIsUnBlockModalVisible(true);
  };
  const showBlockModal = (record: any) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsUnBlockModalVisible(false);
    setIsBlockModalVisible(false);
    setCurrentRecord(null);
  };

  const handleUnBlock = (data: any) => {
    console.log(data);
    handleCancel();
  };

  const handleBlock = (data: any) => {
    console.log(data);
    handleCancel();
  };
  return (
    <div className="mt-10  rounded-xl">
      <div className="flex justify-between items-center mx-3 py-2">
        <p className="text-lg sm:text-xl lg:text-2xl  text-base-color font-bold ">
          Recent Users
        </p>
      </div>

      <div
        className="p-4 bg-primary-color rounded-lg mt-5"
        style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
      >
        <AdminRecentUsersTable
          data={recentUserData}
          loading={false}
          showViewModal={showViewUserModal}
          showUnblockModal={showUnblockModal}
          showBlockModal={showBlockModal}
          setPage={() => {}}
          page={1}
          total={recentUserData.length}
          limit={6}
        />
      </div>
      <UserModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <UnblockModal
        isUnblockModalVisible={isUnBlockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleUnblock={handleUnBlock}
      />
      <BlockModal
        isBlockModalVisible={isBlockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleBlock={handleBlock}
      />
    </div>
  );
};

export default RecentUser;
