interface ILastMessage {
  _id: string;
  conversationId: string;
  text_message: string;
  sender: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IConversationUser {
  _id: string;
  name: string;
  image: string;
}

interface IConversation {
  _id: string;
  createdAt: string;
  updatedAt: string;
  lastMessage: ILastMessage;
  self: IConversationUser;
  otherUser: IConversationUser;
}

interface IMessage {
  _id: string;
  chatId: string; // ID of the chat this message belongs to
  text: string; // Message content (text)
  images: string[]; // Array of image URLs (can be empty)
  files: { url: string; name: string; _id: string }[]; // Array of file objects with URL, name, and ID
  voice: string; // URL or identifier for voice message (can be empty)
  sender: string; // ID of the user who sent the message
  createdAt: string; // ISO string timestamp of when the message was created
  updatedAt: string; // ISO string timestamp of when the message was last updated
  __v: number; // MongoDB version field (for internal use)
}
interface IConversationList {
  chatId: string;
  name: string;
  image: string;
  updatedAt: string;
  lastMessage: string;
  oppositeUserId: string;
}

export type {
  ILastMessage,
  IConversationUser,
  IConversation,
  IMessage,
  IConversationList,
};
