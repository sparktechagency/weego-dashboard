/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { formatDate } from "../../utils/dateFormet";

// Define the type for the props
interface EarningTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const EarningTable: React.FC<EarningTableProps> = ({
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
      dataIndex: "stripeTransferId",
      key: "stripeTransferId",
    },
    {
      title: "Contractor Name",
      dataIndex: "userName",
      key: "userName",
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Amount($)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => <p>{formatDate(text)}</p>,
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

export default EarningTable;
