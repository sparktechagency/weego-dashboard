/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseButton from "../../Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useUpdateAdminMutation } from "../../../redux/features/allAdmin/allAdminApi";
import { useEffect } from "react";
import ReuseSelect from "../../Form/ReuseSelect";
import { categoryOptions } from "./AddAdminModal";

interface EditAdminModalProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}

const EditAdminModal: React.FC<EditAdminModalProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [editAdmin] = useUpdateAdminMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(currentRecord);
  }, [currentRecord, form]);

  const handleCategoryChange = (values: string[], form: any) => {
    if (values.includes("all")) {
      // If "all" is selected, ignore others
      form.setFieldsValue({ category: ["all"] });
    } else {
      form.setFieldsValue({ category: values });
    }
  };

  const handleFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      editAdmin,
      {
        body: { ...values },
        params: currentRecord?._id,
      },
      "Updating Admin..."
    );

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
      className="lg:!w-[600px]"
    >
      <div className="py-5">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-color text-center">
            Add Admin
          </h3>

          <div className="mt-5">
            <ReusableForm
              defaultValues={currentRecord}
              form={form}
              handleFinish={handleFinish}
            >
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
                Update Admin
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditAdminModal;
