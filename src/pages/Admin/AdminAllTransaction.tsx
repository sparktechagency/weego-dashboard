import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import TransactionTable from "../../ui/Tables/TransactionTable";
import { useGetAllTransactionQuery } from "../../redux/features/earning/earningApi";

const AdminAllTransaction = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;

  const { data, isFetching } = useGetAllTransactionQuery({
    search: searchText,
    page,
    limit,
  });

  const allTransactionCard = data?.data?.attributes?.card?.[0] || {
    _id: null,
    totalIn: Number,
    totalOut: Number,
  };

  const allTransactionData =
    data?.data?.attributes?.transactions?.transactions || [];

  const totalTransaction =
    data?.data?.attributes?.transactions?.pagination?.totalResults || 0;

  return (
    <div className=" min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-color font-integralcf capitalize">
          Transactions{" "}
        </h1>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <div className="flex items-center gap-5 flex-wrap">
        <div className="text-success-color bg-primary-color p-4 rounded-lg min-w-60 mb-5 shadow border border-gray-200">
          <h4 className="font-semibold text-lg">Total In</h4>
          <p className="text-2xl font-bold">${allTransactionCard.totalIn}</p>
        </div>
        <div className="text-error-color bg-primary-color p-4 rounded-lg min-w-60 mb-5 shadow border border-gray-200">
          <h4 className="font-semibold text-lg">Total Out</h4>
          <p className="text-2xl font-bold">${allTransactionCard.totalOut}</p>
        </div>
      </div>
      <div
        className="p-4 bg-primary-color rounded-lg mt-5"
        style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
      >
        <TransactionTable
          data={allTransactionData}
          loading={isFetching}
          setPage={setPage}
          page={page}
          total={totalTransaction}
          limit={limit}
        />
      </div>
    </div>
  );
};

export default AdminAllTransaction;
