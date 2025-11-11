/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { MdDelete, MdEdit } from "react-icons/md";
import ReuseTable from "../../utils/ReuseTable";
import { AllImages } from "../../../public/images/AllImages";
import { getImageUrl } from "../../helpers/config/envConfig";

// Define the type for the props
interface AllCategoryTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;

  showEditModal: (record: any) => void; // Function to handle blocking a Category
  showDeletekModal: (record: any) => void; // Function to handle unblocking a Category
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AllCategoryTable: React.FC<AllCategoryTableProps> = ({
  data,
  loading,
  showEditModal,
  showDeletekModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const serverUrl = getImageUrl();
  const mainColumns = [
    {
      title: "Serial ID",
      dataIndex: "id",
      key: "id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Category Icon",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={image ? serverUrl + image : AllImages.cover}
          className="w-10 h-10"
        />
      ),
    },
    {
      title: "Category Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category Percentage",
      dataIndex: "percentage",
      key: "percentage",
      render: (percentage: number) => <p>{percentage}%</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          {/* Block Category Tooltip */}

          <Tooltip placement="left" title="Edit this Category">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => showEditModal(record)}
            >
              <MdEdit style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>

          <Tooltip placement="left" title="Delete this Category">
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

export default AllCategoryTable;
