/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";

// Define the type for the props
interface TransactionTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  data,
  loading,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "Serial ID",
      dataIndex: "serialId",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
      key: "_id",
    },
    {
      title: "Transaction ID",
      dataIndex: "stripePaymentIntentId", // Updated to match the actual data (transaction ID)
      key: "stripePaymentIntentId",
    },
    {
      title: "User Name",
      dataIndex: "userName", // Updated to correct field
      key: "userName",
      render: (text: string) => <p>{text}</p>, // Render user name dynamically
    },
    {
      title: "Email",
      dataIndex: "userEmail", // Updated to correct field
      key: "userEmail",
      render: (text: string) => <p>{text}</p>, // Render user email dynamically
    },
    {
      title: "Amount ($)",
      dataIndex: "amount", // Updated to correct field (amount)
      key: "amount",
      render: (text: number) => <p>${text.toFixed(2)}</p>, // Render amount with 2 decimal places
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
      keyValue={"stripeTransferId"}
    />
  );
};

export default TransactionTable;
