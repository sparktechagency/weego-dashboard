/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Form, Input, Upload } from "antd";
import { BsImage } from "react-icons/bs";
import { FaTelegramPlane, FaTimes, FaPaperclip } from "react-icons/fa"; // Added clip icon
import { toast } from "sonner";
import axios from "axios";
import { selectSelectedChatUser } from "../../redux/features/conversation/conversationSlice";
import { useAppSelector } from "../../redux/hooks";
import { getBaseUrl } from "../../helpers/config/envConfig";
import SpinLoader from "../../ui/SpinLoader";

const ConversationSendMessage = ({ socket }: any) => {
  const selectedConversation = useAppSelector(selectSelectedChatUser);
  const serverUrl = getBaseUrl();
  const [form] = Form.useForm();
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]); // To hold multiple image URLs
  const [uploadedDocs, setUploadedDocs] = useState<any[]>([]); // To hold uploaded documents

  // Reset on new conversation
  useEffect(() => {
    setFileList([]);
    setUploadedImageUrls([]);
    setUploadedDocs([]);
    form.setFieldValue("message", "");
  }, [selectedConversation?.chatId, form]);

  // Handle image selection
  const handleImageChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList); // Update the file list
    if (newFileList?.length > 0) uploadImages(newFileList);
  };

  // Handle file selection (for docs)
  const handleFileChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList); // Update the file list
    if (newFileList?.length > 0) uploadFiles(newFileList);
  };

  // Upload images
  const uploadImages = async (files: any[]) => {
    setIsUploadLoading(true);

    const formData = new FormData();
    files.forEach((file: any) => {
      formData.append("images", file.originFileObj); // Append each image
    });

    try {
      const response = await axios.post(
        `${serverUrl}/message/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response?.data?.data?.images) {
        const imageUrls = response.data.data.images.map(
          (image: any) => image.url
        ); // Get image URLs
        setUploadedImageUrls(imageUrls); // Set the uploaded image URLs
      }
    } catch (error: any) {
      toast.error("Failed to upload images");
    }
    setIsUploadLoading(false);
  };

  // Upload documents
  const uploadFiles = async (files: any[]) => {
    setIsUploadLoading(true);

    const formData = new FormData();
    files.forEach((file: any) => {
      formData.append("docs", file.originFileObj); // Append each file
    });

    try {
      const response = await axios.post(
        `${serverUrl}/message/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response?.data?.data?.docs) {
        const docs = response.data.data.docs.map((doc: any) => ({
          url: doc.url,
          name: doc.name,
        })); // Get document URLs
        setUploadedDocs(docs); // Set the uploaded document data
      }
    } catch (error: any) {
      toast.error("Failed to upload files");
    }
    setIsUploadLoading(false);
  };

  const handleDeleteImage = (index: number) => {
    const newImageUrls = [...uploadedImageUrls];
    newImageUrls.splice(index, 1);
    setUploadedImageUrls(newImageUrls);

    setIsUploadLoading(false);
  };

  const handleDeleteFile = (index: number) => {
    const newDocs = [...uploadedDocs];
    newDocs.splice(index, 1);
    setUploadedDocs(newDocs);

    setIsUploadLoading(false);
  };

  const handleMessageSend = async (values: any) => {
    const data: any = {
      chatId: selectedConversation?.chatId,
      ...(values?.message?.length > 0 ? { text: values?.message } : {}),
      filesData: {
        images: uploadedImageUrls.map((url) => ({ url })), // Send images
        docs: uploadedDocs.map((doc) => ({
          url: doc.url,
          name: doc.name,
        })), // Send docs
      },
    };

    try {
      socket?.emit("sendMessage", data, (res: any) => {
        if (res?.status === 200) {
          setFileList([]);
          setUploadedImageUrls([]);
          setUploadedDocs([]);
          form.resetFields();
          setTextValue(null);
        }
      });
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Failed to send message",
        { duration: 2000 }
      );
    }
  };

  return (
    <div>
      <div className="w-full">
        {/* Show selected file names for uploaded images */}
        {uploadedImageUrls.length > 0 && (
          <div className="absolute bottom-10 left-4  flex items-center gap-2">
            <div className="flex flex-wrap gap-2">
              {uploadedImageUrls.map((url, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white border border-gray-300 rounded relative p-0.5 shadow"
                >
                  <img
                    src={url}
                    alt={`Uploaded ${index + 1}`}
                    className="h-20 w-20 object-cover rounded"
                  />
                  <div className=" absolute top-1 right-1 p-0.5 bg-primary-color rounded-full">
                    <FaTimes
                      className="cursor-pointer text-red-600"
                      style={{ fontSize: "16px" }}
                      onClick={() => handleDeleteImage(index)} // Delete specific uploaded image
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show selected file names for uploaded docs */}
        {uploadedDocs.length > 0 && (
          <div className="absolute bottom-10 left-4  flex items-center gap-2">
            <div className="flex flex-wrap gap-2">
              {uploadedDocs.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white border border-gray-300 rounded relative p-0.5 shadow"
                >
                  <span className="text-sm font-medium">
                    {doc.name?.slice(0, 10)}...
                  </span>
                  <div className="absolute top-1 right-1 p-0.5 bg-primary-color rounded-full">
                    <FaTimes
                      className="cursor-pointer text-red-600"
                      style={{ fontSize: "16px" }}
                      onClick={() => handleDeleteFile(index)} // Delete specific uploaded file
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Form form={form} onFinish={handleMessageSend}>
          <div className="!bg-white absolute -bottom-5 flex justify-center items-center w-full p-1">
            <div className="w-full rounded-full bg-white border border-secondary-color px-4 py-2 flex items-center space-x-4">
              <Form.Item className="w-full !p-0 !m-0" name="message">
                <Input
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder="Send your message..."
                  className="!border-none !ring-0 !outline-none !bg-transparent text-black"
                />
              </Form.Item>

              {/* Image upload */}
              <Form.Item className="!p-0 !m-0 !mr-3" name="image">
                <Upload
                  fileList={fileList}
                  onChange={handleImageChange}
                  customRequest={(options) => {
                    setTimeout(() => {
                      if (options.onSuccess) {
                        options.onSuccess("ok");
                      }
                    }, 1000);
                  }}
                  accept="image/*"
                  multiple // Allow multiple files
                  showUploadList={false}
                >
                  <BsImage className="cursor-pointer text-xl text-secondary-color mt-1" />
                </Upload>
              </Form.Item>

              {/* File upload (for docs) */}
              <Form.Item className="!p-0 !m-0" name="file">
                <Upload
                  fileList={fileList}
                  onChange={handleFileChange}
                  customRequest={(options) => {
                    setTimeout(() => {
                      if (options.onSuccess) {
                        options.onSuccess("ok");
                      }
                    }, 1000);
                  }}
                  accept=".pdf, .doc, .docx, .txt" // Accept only documents
                  multiple
                  showUploadList={false}
                >
                  <FaPaperclip className="cursor-pointer text-xl text-secondary-color mt-1" />
                </Upload>
              </Form.Item>
            </div>

            {isUploadLoading ? (
              <SpinLoader />
            ) : (
              <button
                disabled={
                  !textValue?.length &&
                  uploadedImageUrls.length === 0 &&
                  uploadedDocs.length === 0
                }
                className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                type="submit"
              >
                <FaTelegramPlane className="text-[#F9DD40] bg-secondary-color rounded-full p-2 text-4xl ms-3" />
              </button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ConversationSendMessage;
