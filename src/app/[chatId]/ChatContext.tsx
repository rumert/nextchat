'use client'
import { createContext, ReactNode, useContext, useState } from "react";

export const ChatContext: any = createContext( {} );
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }
  return context;
};

export function ChatContextProvider( { children }: { children: ReactNode } ): JSX.Element {

  const [ isFileWithDescActive, setIsFileWithDescActive ] = useState( false );
  const [ fileToSend, setFileToSend ] = useState<File | null>(null)

  return (
    <ChatContext.Provider value={{ isFileWithDescActive, setIsFileWithDescActive, fileToSend, setFileToSend }}>
      {children}
    </ChatContext.Provider>
  );
}