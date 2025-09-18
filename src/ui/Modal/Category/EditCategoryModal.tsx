/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseUpload from "../../Form/ReuseUpload";
import ReuseButton from "../../Button/ReuseButton";

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
  const [form] = Form.useForm();

  const onSubmit = (values: any) => {
    console.log({ values, currentRecord });
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
              accept="image/svg+xml"
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
