import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import { useGetAllEarningQuery } from "../../redux/features/earning/earningApi";
import EarningTable from "../../ui/Tables/EarningTable";

const AdminAllEarning = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;
  const { data, isFetching } = useGetAllEarningQuery({
    search: searchText,
    page,
    limit,
  });

  const allEarningData = data?.data?.attributes?.transactions || [];
  const totalEarning = data?.data?.attributes?.pagination?.totalResults || 0;

  return (
    <div className=" min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-color font-integralcf capitalize">
          Earning
        </h1>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>
      <div
        className="p-4 bg-primary-color rounded-lg mt-5"
        style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
      >
        <EarningTable
          data={allEarningData}
          loading={isFetching}
          setPage={setPage}
          page={page}
          total={totalEarning}
          limit={limit}
        />
      </div>
    </div>
  );
};

export default AdminAllEarning;
