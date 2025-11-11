import React from "react";
import { Space, Tag, Tooltip } from "antd";
import ReuseTable from "../../utils/ReuseTable";
import { IoMdEye } from "react-icons/io";
import { IReport } from "../../types/report.type";
import { formatDate } from "../../utils/dateFormet";

// Define the type for the props
interface AdminReportTableProps {
  data: IReport[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: IReport) => void; // Function to handle unblocking a Category
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AdminReportTable: React.FC<AdminReportTableProps> = ({
  data,
  loading,
  showViewModal,
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
      title: "Reporter",
      dataIndex: "reporterName",
      key: "reporterName",
    },
    {
      title: "Reporter Role",
      dataIndex: "reporterRole",
      key: "reporterRole",
      render: (reporterRole: string) => {
        return <span className="text-orange-500">{reporterRole}</span>;
      },
    },
    {
      title: "Reported To",
      dataIndex: "targetUserName",
      key: "targetUserName",
    },
    {
      title: "Reported To Role",
      dataIndex: "targetUserRole",
      key: "targetUserRole",
      render: (targetUserRole: string) => {
        return <span className="text-blue-500">{targetUserRole}</span>;
      },
    },
    {
      title: "Reason",
      dataIndex: "option",
      key: "option",
    },
    {
      title: "Status",
      dataIndex: "isSolved", // You may want to add logic to determine isSolved
      key: "isSolved",
      render: (isSolved: string) => (
        <Tag color={isSolved ? "green" : "yellow"}>
          {isSolved ? "Resolved" : "Pending"}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => formatDate(createdAt),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IReport) => (
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

export default AdminReportTable;
