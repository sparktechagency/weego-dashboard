/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LuKey } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";

const ForgotPassword = () => {
  const router = useNavigate();
  const onFinish = (values: any) => {
    console.log("Received values of forgot form:", values);
    router("/forgot-password/otp-verify");
  };
  return (
    <div className="bg-secondary-color text-primary-color">
      <Container>
        <div className="min-h-screen flex justify-center items-center ">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto p-6 rounded-2xl">
            <div className="mb-8">
              <div className="p-3 rounded-full bg-[#EFF7FF] w-fit mx-auto">
                <div className="p-3 rounded-full bg-[#DAEBFF] w-fit mx-auto">
                  <LuKey className="size-8  text-secondary-color " />
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary-color mb-5 text-center mt-4">
                Forgot Password
              </h1>
              <p className=" sm:text-lg mb-2 text-primary-color text-center">
                No worries, we’ll send you reset instructions.
              </p>
            </div>

            <ReusableForm handleFinish={onFinish}>
              <ReuseInput
                name="email"
                label="Email"
                placeholder="Enter Your Email"
                inputClassName="!py-2"
                labelClassName="!text-primary-color"
              />
              <ReuseButton
                variant="secondary"
                htmlType="submit"
                className="!bg-[#DCF995] !border-[#DCF995] !text-base-color !font-semibold"

                // icon={allIcons.arrowRight}
              >
                Sign In
              </ReuseButton>
            </ReusableForm>

            <div className="text-primary-color w-fit mx-auto mt-10">
              <Link
                to="/sign-in"
                className="flex justify-center items-center  gap-2 "
              >
                <FaArrowLeftLong className="size-4 " />
                <span>Back to log in</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default ForgotPassword;
