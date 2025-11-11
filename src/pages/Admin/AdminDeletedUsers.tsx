import { useState } from "react";
import AdminAllDeletedAccountTable from "../../ui/Tables/AdminAllDeletedAccountTable";
import { useGetAllDeletedQuery } from "../../redux/features/deletedAccount/deletedAccountApi";
import { IDeletedUser } from "../../types";

const AdminDeletedUsers = () => {
  const [page, setPage] = useState(1);

  const limit = 12;

  const { data, isFetching } = useGetAllDeletedQuery({
    page: page,
    limit: limit,
  });

  const allDeleted: IDeletedUser[] = data?.data?.attributes?.data || [];
  const totalDeleted: number =
    data?.data?.attributes?.pagination?.totalResults || 0;

  console.log(allDeleted);

  return (
    <div className=" min-h-[90vh]">
      <div className="flex justify-between items-center mx-3 py-2 mb-5">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-color font-integralcf capitalize">
          All Deleted Accounts
        </h1>
      </div>

      <div
        className="p-4 bg-primary-color rounded-lg mt-5"
        style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
      >
        <AdminAllDeletedAccountTable
          data={allDeleted}
          loading={isFetching}
          setPage={setPage}
          page={page}
          total={totalDeleted}
          limit={limit}
        />
      </div>
    </div>
  );
};

export default AdminDeletedUsers;
