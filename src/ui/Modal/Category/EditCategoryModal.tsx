/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseUpload from "../../Form/ReuseUpload";
import ReuseButton from "../../Button/ReuseButton";
import { useUpdateCategoryMutation } from "../../../redux/features/category/categoryApi";
import { useEffect } from "react";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

interface EditCategoryModalProps {
  isEditModalVisible: boolean;
  currentRecord: any;
  handleCancel: () => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isEditModalVisible,
  currentRecord,
  handleCancel,
}) => {
  const [updateCategory] = useUpdateCategoryMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        name: currentRecord?.name,
        percentage: currentRecord?.percentage,
      });
    }
  }, [currentRecord, form]);

  const onSubmit = async (values: any) => {
    const formData = new FormData();

    if (values?.icon?.[0]?.originFileObj) {
      formData.append("image", values?.icon?.[0]?.originFileObj);
    }
    const data = {
      name: values?.name,
      percentage: values?.percentage,
    };

    formData.append("data", JSON.stringify(data));

    const res = await tryCatchWrapper(
      updateCategory,
      { body: formData, params: { id: currentRecord?._id } },
      "Updating Category..."
    );

    console.log(res);

    if (res?.statusCode === 201) {
      form.resetFields();
      handleCancel();
    }
  };
  return (
    <Modal
      open={isEditModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <div className="p-5 text-base-color">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8">
          Update Category
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
              name="percentage"
              label="Category Commission Percentage"
              placeholder="Enter Category Commission Percentage"
              rules={[
                {
                  required: true,
                  message: "Category Commission Percentage is required",
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
            Update
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default EditCategoryModal;
