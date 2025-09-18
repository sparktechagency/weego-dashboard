/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import ReuseTable from "../../utils/ReuseTable";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import { GoEye } from "react-icons/go";

interface AdminRecentUsersTableProps {
  data: any; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  showUnblockModal: (record: any) => void; // Function to handle blocking a user
  showBlockModal: (record: any) => void; // Function to handle unblocking a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AdminRecentUsersTable: React.FC<AdminRecentUsersTableProps> = ({
  data,
  loading,
  showViewModal,
  showUnblockModal,
  showBlockModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "Serial ID",
      dataIndex: "serialId",
      key: "serialId",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
    },
    { title: "Name", dataIndex: "Name", key: "Name" },
    { title: "Gender", dataIndex: "Gender", key: "Gender" },
    { title: "Email", dataIndex: "Email", key: "Email" },
    { title: "Role", dataIndex: "Role", key: "Role" },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>

          {/* Block User Tooltip */}

          {record.isBlocked ? (
            <Tooltip placement="left" title="Unblock this User">
              <button
                className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
                onClick={() => showUnblockModal(record)}
              >
                <CgUnblock style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
          ) : (
            <Tooltip placement="left" title="Block this User">
              <button
                className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
                onClick={() => showBlockModal(record)}
              >
                <MdBlock style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
          )}
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <ReuseTable
      columns={columns}
      data={data}
      loading={loading}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      keyValue={"email"}
      rowClassName={(record) => (record.isBlocked ? "!bg-red-100" : "")} // Tailwind class for red background
    />
  );
};

export default AdminRecentUsersTable;
