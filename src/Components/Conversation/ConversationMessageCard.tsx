/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessage } from "../../types";
import { formatDateTime } from "../../utils/dateFormet";
import ImagePreviewer from "../../utils/ImagePreviewer";

const ConversationMessageCard = ({
  msg,
  userData,
}: {
  msg: IMessage;
  userData: any;
  imageUrl?: string;
}) => {
  console.log(msg);
  console.log("userData", userData);

  return (
    <div>
      <div>
        <div className="flex items-start gap-1 mb-2">
          <div
            className={`flex items-center gap-2 w-full ${
              String(msg?.sender) === String(userData?._id)
                ? "justify-end"
                : msg?.sender !== null
                ? "justify-start"
                : "justify-center"
            }`}
          >
            <div>
              {/* File Previewer */}
              {msg?.files && msg.files.length > 0 && (
                <div
                  className={`grid grid-cols-1  ${
                    msg?.files?.length > 2 ? " md:grid-cols-2" : "grid-cols-1"
                  } rounded-md ${
                    String(msg?.sender) === String(userData?._id)
                      ? "w-fit ml-auto text-right text-white"
                      : "w-fit text-left text-base-color bg-[#F1F1F1]"
                  }`}
                >
                  {msg?.files?.map(
                    (
                      file: { url: string; name: string; _id: string },
                      index: number
                    ) => (
                      <ImagePreviewer
                        key={index}
                        msg={msg}
                        image={file.url}
                        userData={userData}
                      />
                    )
                  )}
                </div>
              )}

              {/* Image Previewer */}
              {msg?.images && msg.images.length > 0 && (
                <div
                  className={`grid grid-cols-1  ${
                    msg?.images?.length > 2 ? " md:grid-cols-2" : "grid-cols-1"
                  } rounded-md ${
                    String(msg?.sender) === String(userData?._id)
                      ? "w-fit ml-auto text-right text-white"
                      : "w-fit text-left text-base-color bg-[#F1F1F1]"
                  }`}
                >
                  {msg?.images?.map((image: string, index: number) => (
                    <ImagePreviewer
                      key={index}
                      msg={msg}
                      image={image}
                      userData={userData}
                    />
                  ))}
                </div>
              )}

              {/* Text Message */}
              {msg?.text?.length > 0 && (
                <p
                  className={`py-1 px-3 mt-0.5 rounded-md ${
                    String(msg?.sender) === String(userData?._id)
                      ? "w-fit ml-auto text-right text-white bg-secondary-color"
                      : "w-fit text-left text-base-color bg-[#F1F1F1]"
                  }`}
                >
                  {msg?.text}
                </p>
              )}

              {/* Timestamp */}
              {msg?.sender !== null && (
                <p
                  className={`text-[11px] mt-0.5 text-secondary-color ${
                    String(msg?.sender) === String(userData?._id)
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {formatDateTime(msg?.createdAt)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationMessageCard;
