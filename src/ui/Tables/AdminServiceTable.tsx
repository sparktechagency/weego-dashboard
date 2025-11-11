/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Image } from "antd";
import ReuseTable from "../../utils/ReuseTable";
import { getImageUrl } from "../../helpers/config/envConfig";
import { AllImages } from "../../../public/images/AllImages";

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
  // showDeletekModal,
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
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
      fixed: "left",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      fixed: "left",
    },
    {
      title: "Provider Name",
      dataIndex: "providerName",
      key: "providerName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 400,
    },
    {
      title: "Time",
      dataIndex: "estimatedTimeMin",
      key: "estimatedTimeMin",
      render: (_: any, record: any) =>
        `${record.estimatedTimeMin} - ${record.estimatedTimeMax} mins`,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Own Tools",
      dataIndex: "haveTools",
      key: "haveTools",
      render: (haveTools: boolean) => (haveTools ? "Yes" : "No"),
    },
    {
      title: "Extra Tools",
      dataIndex: "needTools",
      key: "needTools",
      render: (tools: string[]) => (tools?.length ? tools.join(", ") : "N/A"),
    },
    {
      title: "Work Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <Image src={image ? serverUrl + image : AllImages?.cover} width={80} />
      ),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_: unknown, record: any) => (
    //     <Space size="middle">
    //       <Tooltip placement="left" title="Delete">
    //         <button
    //           className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
    //           onClick={() => showDeletekModal(record)}
    //         >
    //           <MdDelete style={{ fontSize: "24px" }} />
    //         </button>
    //       </Tooltip>
    //     </Space>
    //   ),
    //   align: "center",
    // },
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
