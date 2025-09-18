/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { MdDelete } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
import ReuseButton from "../Button/ReuseButton";

// Define the type for the props
interface AdminServiceTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showDeletekModal: (record: any) => void; // Function to handle unblocking a Category
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AdminServiceTable: React.FC<AdminServiceTableProps> = ({
  data,
  loading,
  showDeletekModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const mainColumns = [
    {
      title: "Serial ID",
      dataIndex: "id",
      key: "id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Service Name",
      dataIndex: "ServiceName",
      key: "ServiceName",
      fixed: "left",
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
      fixed: "left",
    },
    { title: "Provider Name", dataIndex: "ProviderName", key: "ProviderName" },
    { title: "Description", dataIndex: "Description", key: "Description" },
    { title: "Time", dataIndex: "Time", key: "Time" },
    { title: "Price Range", dataIndex: "PriceRange", key: "PriceRange" },
    { title: "Own Tools", dataIndex: "OwnTools", key: "OwnTools" },
    { title: "Extra Tools", dataIndex: "ExtraTools", key: "ExtraTools" },
    {
      title: "Work Image",
      dataIndex: "WorkImage",
      key: "WorkImage",
      render: () => (
        <ReuseButton variant="secondary" className="!py-4 !px-3">
          View Image
        </ReuseButton>
      ),
    },
    {
      title: "Comparison Image",
      dataIndex: "ComparisonImage",
      key: "ComparisonImage",
      render: () => (
        <ReuseButton variant="secondary" className="!py-4 !px-3">
          View Image
        </ReuseButton>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          <Tooltip placement="left" title="Delete">
            <button
              className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
              onClick={() => showDeletekModal(record)}
            >
              <MdDelete style={{ fontSize: "24px" }} />
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

export default AdminServiceTable;
