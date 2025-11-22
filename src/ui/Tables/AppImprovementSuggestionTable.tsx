import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { formatDate } from "../../utils/dateFormet";
import { IImprovementSuggestion } from "../../types";
import { getImageUrl } from "../../helpers/config/envConfig";
import { Image } from "antd";

// Define the type for the props
interface AdminImprovementSuggestionTableProps {
  data: IImprovementSuggestion[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AdminImprovementSuggestionTable: React.FC<
  AdminImprovementSuggestionTableProps
> = ({ data, loading, setPage, page, total, limit }) => {
  const serverUrl = getImageUrl();

  const columns = [
    {
      title: "Serial ID",
      dataIndex: "_id", // Updated to _id
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1, // Serial calculation
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "senderName", // Updated to senderName
      key: "senderName",
    },
    {
      title: "Email",
      dataIndex: "senderEmail", // Updated to senderEmail
      key: "senderEmail",
      render: (text: string) => <p>{text}</p>, // Render email dynamically
    },
    {
      title: "Image",
      dataIndex: "image", // Updated to image
      key: "image",
      render: (images: string[]) => (
        <div>
          {images.map((image, index) => (
            <Image
              key={index}
              src={serverUrl + image}
              alt={`Report Image ${index}`}
              style={{ width: "50px", height: "50px", marginRight: "5px" }}
            />
          ))}
        </div>
      ),
    },
    {
      title: "Comment",
      dataIndex: "comment", // Updated to comment
      key: "comment",
      render: (text: string) => <p>{text || "No comment"}</p>, // Render comment, show "No comment" if empty
    },
    {
      title: "Date",
      dataIndex: "createdAt", // Updated to createdAt
      key: "createdAt",
      render: (text: string) => <p>{formatDate(text)}</p>, // Use your formatDate function
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
      keyValue={"createdAt"}
    />
  );
};

export default AdminImprovementSuggestionTable;
