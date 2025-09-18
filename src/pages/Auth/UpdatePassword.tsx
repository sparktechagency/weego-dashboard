/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { LuKey } from "react-icons/lu";

const UpdatePassword = () => {
  const router = useNavigate();
  const onFinish = (values: any) => {
    console.log("Received values of update form:", values);
    router("/sign-in");
  };

  return (
    <div className="bg-secondary-color text-primary-color">
      <Container>
        <div className="min-h-screen flex justify-center items-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto p-6 rounded-2xl">
            {/* -------- update Password Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="mb-8">
                <div className="p-3 rounded-full bg-[#EFF7FF] w-fit mx-auto">
                  <div className="p-3 rounded-full bg-[#DAEBFF] w-fit mx-auto">
                    <LuKey className="size-8  text-secondary-color " />
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-primary-color mb-5 text-center mt-4">
                  Set new password
                </h1>
                <p className=" sm:text-lg mb-2 text-primary-color text-center">
                  Your new password must be different to previously used
                  passwords.
                </p>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <ReusableForm handleFinish={onFinish}>
              <ReuseInput
                inputType="password"
                name="password"
                label="Password"
                placeholder="Enter Your Password "
                rules={[{ required: true, message: "Password is required" }]}
                inputClassName="!py-2"
                labelClassName="!text-primary-color"
              />
              <ReuseInput
                inputType="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Your Password "
                rules={[
                  { required: true, message: "Confirm Password is required" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
                inputClassName="!py-2"
                labelClassName="!text-primary-color"
              />

              <ReuseButton
                variant="secondary"
                htmlType="submit"
                className="!bg-[#DCF995] !border-[#DCF995] !text-base-color !font-semibold"
                // icon={allIcons.arrowRight}
              >
                Change Password
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default UpdatePassword;
