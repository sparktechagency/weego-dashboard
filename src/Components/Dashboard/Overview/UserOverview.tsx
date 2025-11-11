import Area_Chart from "../../Chart/AreaChart";
import YearOption from "../../../utils/YearOption";
import { useState } from "react";
import { useGetUserRatioQuery } from "../../../redux/features/users/usersApi";

const UserOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { data } = useGetUserRatioQuery({ year: year });

  const ratio = data?.data?.attributes || [];

  return (
    <div
      className="w-full lg:w-1/2 p-3 bg-[#FFFFFF] rounded-lg"
      style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
    >
      <div className="flex justify-between items-center text-base-color my-5">
        <p className="text-lg sm:text-xl lg:text-2xl  text-base-color font-bold ">
          User Overview
        </p>
        <div className="flex items-center gap-2">
          <div>
            <YearOption currentYear={currentYear} setThisYear={setYear} />
          </div>
        </div>
      </div>
      <div>
        <Area_Chart ratio={ratio} />
      </div>
    </div>
  );
};

export default UserOverview;
