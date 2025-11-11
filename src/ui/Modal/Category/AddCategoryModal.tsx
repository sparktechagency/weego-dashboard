/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseUpload from "../../Form/ReuseUpload";
import ReuseButton from "../../Button/ReuseButton";
import { useAddCategoryMutation } from "../../../redux/features/category/categoryApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

interface AddCategoryModalProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  const [addCategory] = useAddCategoryMutation();

  const onSubmit = async (values: any) => {
    const formData = new FormData();

    if (values?.icon?.[0]?.originFileObj) {
      console.log("first");
      formData.append("image", values?.icon?.[0]?.originFileObj);
    }
    const data = {
      name: values?.name,
      percentage: values?.percentage,
    };

    formData.append("data", JSON.stringify(data));
    const res = await tryCatchWrapper(
      addCategory,
      { body: formData },
      "Adding Category..."
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
      className="lg:!w-[500px]"
    >
      <div className="p-5 text-base-color">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8">
          Create Category
        </h1>
        <ReusableForm form={form} handleFinish={onSubmit}>
          <>
            <ReuseInput
              name="name"
              label="Category Title"
              placeholder="Enter Category Title"
              rules={[
                { required: true, message: "Category Title is required" },
              ]}
              labelClassName="!font-semibold"
            />
            <ReuseInput
              type="number"
              name="percentage"
              label="Commission Percentage"
              placeholder="Enter Commission Percentage"
              rules={[
                {
                  required: true,
                  message: "Commission Percentage is required",
                },
              ]}
              labelClassName="!font-semibold"
            />

            <ReuseUpload
              label="Category Icon"
              name="icon"
              buttonText="Upload Image"
              accept="image/*"
              maxCount={1}
              labelClassName="!font-semibold"
            />
          </>

          <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
            Add
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default AddCategoryModal;
