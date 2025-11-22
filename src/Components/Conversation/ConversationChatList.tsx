/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "antd";
import { useEffect, useState, useMemo, useCallback } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useGetConversationListQuery } from "../../redux/features/conversation/conversationApi";
import { FadeLoader } from "react-spinners";
import ConversationChatListCard from "./ConversationChatListCard";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectSelectedChatUser,
  setOnlineUsers,
} from "../../redux/features/conversation/conversationSlice";
import { useSocket } from "../../context/socket-context";
import useUserData from "../../hooks/useUserData";
import { IConversationList } from "../../types";

const ConversationChatList = ({ onlineUsers }: any) => {
  const user = useUserData();
  const socket = useSocket()?.socket;
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const seletedConversation = useAppSelector(selectSelectedChatUser);
  const [chatList, setChatList] = useState<IConversationList[]>([]);

  console.log("chatList", chatList);

  const { data: allChatList, isFetching: isAllChatFeacthing } =
    useGetConversationListQuery(
      {
        searchTerm,
      },
      {
        skip: !user?._id,
      }
    );

  console.log(allChatList);

  const handleNewMessage = useCallback((message: any) => {
    const newMessage = message?.data;
    console.log("newMessage", newMessage);
    if (!newMessage?.conversationId) return;

    setChatList((prevChatList: any) => {
      const existingIndex = prevChatList.findIndex(
        (item: any) =>
          item.lastMessage?.conversationId === newMessage.conversationId
      );

      if (existingIndex !== -1) {
        // Update the existing conversation's lastMessage
        const updatedList = [...prevChatList];
        updatedList[existingIndex] = {
          ...updatedList[existingIndex],
          lastMessage: newMessage,
          updatedAt: newMessage.updatedAt,
        };
        return updatedList;
      } else {
        // Push a new conversation (you need to define what a new conversation looks like)
        const newConversation = {
          _id: newMessage.conversationId,
          lastMessage: newMessage,
          createdAt: newMessage.createdAt,
          updatedAt: newMessage.updatedAt,
          self: {}, // You should populate this from context or existing data
          otherUser: {}, // Same as above
        };
        return [newConversation, ...prevChatList];
      }
    });
  }, []);

  useEffect(() => {
    console.log("🧠 Checking socket:", socket);

    if (!socket) {
      console.warn("❌ Socket not ready yet.");
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }
    socket.on(`new_message::${user?._id}`, handleNewMessage);
    socket.on("connectUser", (online: any) => {
      console.log("Online Users:", online);
      dispatch(setOnlineUsers(online));
    });

    // const handleNewMessageSocket = (message: any) => {
    //   console.log("📨 New Message Received from socket:", message);
    // };

    return () => {
      socket.off("connectUser", (message: any) => {
        console.log("📨 connectUser Received from socket:", message);
      });
      socket.off("new_message", (message: any) => {
        console.log("📨New Message Off:", message);
      });
    };
  }, [dispatch, handleNewMessage, socket, user?._id]);

  useEffect(() => {
    if (allChatList?.data?.attributes?.chatList) {
      setChatList(allChatList?.data?.attributes?.chatList);
    }
  }, [allChatList?.data?.attributes?.chatList]);

  const filteredConversations = useMemo(() => {
    console.log(
      "chatList ===>",
      chatList?.slice()?.sort((a: IConversationList, b: IConversationList) => {
        const dateA = new Date(a?.updatedAt || 0).getTime();
        const dateB = new Date(b?.updatedAt || 0).getTime();
        return dateB - dateA;
      })
    );
    return chatList
      ?.slice()
      ?.sort((a: IConversationList, b: IConversationList) => {
        const dateA = new Date(a?.updatedAt || 0).getTime();
        const dateB = new Date(b?.updatedAt || 0).getTime();
        return dateB - dateA;
      });
  }, [chatList]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div
      className={`w-full lg:w-[400px] overflow-y-auto px-3 ${
        seletedConversation ? "hidden lg:block" : "block lg:block"
      }`}
    >
      <div className="sticky top-0 z-20   py-5 mb-3 !bg-primary-color">
        <div className=" flex justify-between items-center pe-4  text-base sm:text-xl md:text-2xl lg:text-3xl text-secondary-color font-bold mt-3">
          Messages
        </div>
        <Input
          placeholder="Search Conversations"
          prefix={<SearchOutlined className="text-[#F88D58] text-xl" />}
          className="!bg-[#EFEFEF] text-base-color mt-2 !py-3 !px-2 w-full"
          onChange={handleSearch}
        />
      </div>
      {isAllChatFeacthing ? (
        <div className="flex justify-center items-center">
          <FadeLoader color="#28314E" />
        </div>
      ) : (
        <div className="md:h-full h-fit mb-3">
          <div className=" text-gray-300 bg-white   ">
            {filteredConversations?.map((conversation: IConversationList) => {
              // Compute the image source URL
              const imageUrlSrc = conversation?.image;

              // Return the JSX
              return (
                <ConversationChatListCard
                  key={conversation?.chatId}
                  conversation={conversation}
                  imageUrlSrc={imageUrlSrc}
                  onlineUsers={onlineUsers}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationChatList;
