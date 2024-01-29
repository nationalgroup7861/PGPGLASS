export const generateChatKey = () => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 100000);
    return `chat_${timestamp}_${randomNumber}`;
  };
