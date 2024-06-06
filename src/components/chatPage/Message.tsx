import React, { useState } from 'react'

export default function Message({ message, isCurrentUserSender, messageRef, isOverflowed, chatId }: any) {
    const [buttonsVisibility, setButtonsVisibility] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const date = new Date(message.createdAt.seconds * 1000 + message.createdAt.nanoseconds / 1000000);
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    const handleToggleMesMenu = () => setButtonsVisibility(prev => !prev);
    const handleExceededMessages = () => setIsExpanded(true);

  return (
    <div className={`flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ${isCurrentUserSender ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}`}>
      {message.message}
    </div>
  )
}
