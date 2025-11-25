/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tag, Tooltip } from "antd";
import ReuseTable from "../../utils/ReuseTable";
import { IoMdEye } from "react-icons/io";

// Define the type for the props
interface AdminServiceManagementTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle unblocking a Category
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AdminServiceManagementTable: React.FC<
  AdminServiceManagementTableProps
> = ({ data, loading, showViewModal, setPage, page, total, limit }) => {
  const mainColumns = [
    {
      title: "Serial ID",
      dataIndex: "id",
      key: "id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "User",
      dataIndex: "userFullName",
      key: "userFullName",
    },
    {
      title: "Service Provider",
      dataIndex: "providerFullName",
      key: "providerFullName",
    },
    {
      title: "Service",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Amount",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "completed"
              ? "green"
              : status === "accepted"
              ? "processing"
              : status === "pending"
              ? "yellow"
              : "red"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          <Tooltip placement="left" title="View">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <IoMdEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
        </Space>
      ),
      align: "center",
    },
  ];

  const columns = mainColumns;

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
    />
  );
};

export default AdminServiceManagementTable;
