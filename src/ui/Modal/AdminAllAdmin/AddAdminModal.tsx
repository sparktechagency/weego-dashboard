/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
// import { RiShieldUserFill, RiSchoolFill } from "react-icons/ri";
// import { FaPhone } from "react-icons/fa6";
import ReuseButton from "../../Button/ReuseButton";
import { useAddAdminMutation } from "../../../redux/features/allAdmin/allAdminApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import ReuseSelect from "../../Form/ReuseSelect";

interface AddAdminModalProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const categoryOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "users",
    label: "Users",
  },
  {
    value: "category",
    label: "Category",
  },
  {
    value: "message",
    label: "Message",
  },
  {
    value: "all-services",
    label: "All Services",
  },
  {
    value: "services-management",
    label: "Services Management",
  },
  {
    value: "earning",
    label: "Earning",
  },
  {
    value: "transaction",
    label: "Transaction",
  },
  {
    value: "reports",
    label: "Reports",
  },
  {
    value: "deleted-accounts",
    label: "Deleted Accounts",
  },
  {
    value: "all-admin",
    label: "All Admin",
  },
  {
    value: "app-report",
    label: "App Report",
  },
  {
    value: "improvement-suggestion",
    label: "Improvement Suggestion",
  },
];

const inputStructure = [
  {
    name: "fullName",
    type: "text",
    inputType: "normal",
    label: "Full Name",
    placeholder: "Enter Full Name",
    labelClassName: "!font-bold",
    // prefix: <RiSchoolFill className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Full Name is required" }],
  },
  {
    name: "email",
    type: "email",
    inputType: "normal",
    label: "Email",
    placeholder: "Enter Email",
    labelClassName: "!font-bold",
    // prefix: <RiShieldUserFill className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Admin Email is required" }],
  },
];

const AddAdminModal: React.FC<AddAdminModalProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const handleCategoryChange = (values: string[], form: any) => {
    if (values.includes("all")) {
      // If "all" is selected, ignore others
      form.setFieldsValue({ category: ["all"] });
    } else {
      form.setFieldsValue({ category: values });
    }
  };

  const [addAdmin] = useAddAdminMutation();
  const [form] = Form.useForm();
  const handleFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      addAdmin,
      { body: { ...values } },
      "Creating New Admin..."
    );
    console.log(res);

    if (res?.statusCode === 201) {
      form.resetFields();
      handleCancel();
    }
  };
  return (
    <Modal
      open={isAddModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="py-5">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-color text-center">
            Add Admin
          </h3>

          <div className="mt-5">
            <ReusableForm form={form} handleFinish={handleFinish}>
              {inputStructure.map((input, index) => (
                <ReuseInput
                  key={index}
                  name={input.name}
                  Typolevel={5}
                  //   prefix={input.prefix}
                  inputType={input.inputType}
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  labelClassName={input.labelClassName}
                  rules={input.rules}
                />
              ))}
              <ReuseSelect
                Typolevel={5}
                name="categoryPermissions"
                options={categoryOptions}
                label="Category"
                placeholder="Select Category"
                mode="multiple"
                onChange={(values: any) => handleCategoryChange(values, form)}
              />
              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="w-full mt-4"
              >
                Add Admin
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddAdminModal;
