import React from "react";
import { Rate, Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import ReuseTable from "../../../utils/ReuseTable";
import { IProvider } from "../../../types";
import { formatDate } from "../../../utils/dateFormet";

// Define the type for the props
interface AllProvidersTableProps {
  data: IProvider[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IProvider) => void; // Function to handle viewing a user
  showBlockModal: (record: IProvider) => void; // Function to handle blocking a user
  showUnblockModal: (record: IProvider) => void; // Function to handle unblocking a user
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AllProvidersTable: React.FC<AllProvidersTableProps> = ({
  data,
  loading,
  showViewModal,
  showBlockModal,
  showUnblockModal,
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
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) => gender || "N/A",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => <Rate disabled value={rating} />,
    },
    {
      title: "Service Completed",
      dataIndex: "orderCompleted",
      key: "orderCompleted",
    },
    {
      title: "Service Canceled",
      dataIndex: "orderCanceled",
      key: "orderCanceled",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => formatDate(date),
    },
    {
      title: "Status",
      dataIndex: "isBan",
      key: "isBan",
      render: (isBan: boolean) =>
        isBan ? (
          <span className="text-error-color font-semibold">Banned</span>
        ) : (
          <span className="text-green-500 font-semibold">Active</span>
        ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IProvider) => (
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

          {record.isBan ? (
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

export default AllProvidersTable;
