"use client";
import { Form } from "antd";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReuseButton from "../../ui/Button/ReuseButton";
import { LuMailCheck } from "react-icons/lu";

const OTPVerify = () => {
  const router = useNavigate();
  const [otp, setOtp] = useState("");

  const handleOTPSubmit = () => {
    if (otp.length === 6) {
      console.log("OTP:", otp);
      if (window?.location?.pathname === "/sign-up/otp-verify") {
        router("/");
      } else {
        router("/update-password");
      }
    }
  };

  return (
    <div className="bg-secondary-color text-primary-color">
      <Container>
        <div className="min-h-screen flex justify-center items-center text-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto  p-6 rounded-2xl">
            <div className="mb-8">
              <div className="p-3 rounded-full bg-[#EFF7FF] w-fit mx-auto">
                <div className="p-3 rounded-full bg-[#DAEBFF] w-fit mx-auto">
                  <LuMailCheck className="size-8  text-secondary-color " />
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary-color mb-5 text-center mt-4">
                Check your email
              </h1>
              <p className="text-lg sm:text-xl mb-2 text-primary-color">
                We sent a verification link to your contact email
              </p>
            </div>

            <Form layout="vertical" className="bg-transparent w-full">
              <Form.Item className="">
                <div className="flex justify-center items-center">
                  <OTPInput
                    inputStyle="!w-[30px] h-[45px] md:!w-[60px] md:!h-[50px] lg:!h-[80px] text-[20px] sm:text-[30px] !bg-primary-color border !border-secondary-color/30
                      rounded-lg mr-[10px] sm:mr-[20px] !text-secondary-color outline-secondary-color/30  focus:ring-secondary-color/30"
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>

              <ReuseButton
                htmlType="submit"
                variant="secondary"
                onClick={handleOTPSubmit}
                className="!bg-[#DCF995] !border-[#DCF995] !text-base-color !font-semibold"
              >
                Verify OTP
              </ReuseButton>
            </Form>
            <div className="flex justify-center gap-2 py-1 mt-5">
              <p>Didn’t receive code?</p>
              <p className="!text-[#DCF995] !underline font-semibold cursor-pointer">
                Click to resend
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default OTPVerify;
