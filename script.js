document.addEventListener("DOMContentLoaded", function() {
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  const chatMessages = document.getElementById("chat-messages");

  sendButton.addEventListener("click", handleSendMessage);

  messageInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  });

  function handleSendMessage() {
    const message = messageInput.value.trim();
    if (message !== "") {
      sendMessage("user", message);
      messageInput.value = "";
      messageInput.focus();
      showBotTypingIndicator();
      getBotResponse(message);
    }
  }

  function sendMessage(sender, message) {
    const messageContainer = createMessageContainer(sender);
    const messageContent = createMessageContent(message);
    const messageIcon = createMessageIcon(sender);

    messageContainer.appendChild(messageIcon);
    messageContainer.appendChild(messageContent);

    chatMessages.appendChild(messageContainer);
    scrollChatToBottom();
  }

  function showBotTypingIndicator() {
    const typingIndicatorContainer = createTypingIndicatorContainer();
    const typingIndicator = createTypingIndicator();

    typingIndicatorContainer.appendChild(typingIndicator);
    chatMessages.appendChild(typingIndicatorContainer);
    scrollChatToBottom();
  }

  function hideBotTypingIndicator() {
    const typingIndicatorContainer = document.getElementById("typing-indicator-container");
    if (typingIndicatorContainer) {
      typingIndicatorContainer.remove();
    }
  }

  function createTypingIndicatorContainer() {
    const typingIndicatorContainer = document.createElement("div");
    typingIndicatorContainer.id = "typing-indicator-container";
    typingIndicatorContainer.classList.add("message", "bot-message");
    return typingIndicatorContainer;
  }

  function createTypingIndicator() {
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("message-content", "typing-indicator");
    typingIndicator.textContent = "Bot is typing...";
    return typingIndicator;
  }

  function createMessageContainer(sender) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message", `${sender}-message`);
    return messageContainer;
  }

  function createMessageContent(message) {
    const messageContent = document.createElement("div");
    messageContent.classList.add("message-content");
    messageContent.textContent = message;
    return messageContent;
  }

  function createMessageIcon(sender) {
    const messageIcon = document.createElement("img");
    messageIcon.src = `${sender}-icon.png`;
    messageIcon.alt = `${sender} Icon`;
    messageIcon.classList.add("message-icon");
    return messageIcon;
  }

  function getBotResponse(message) {
    // Simulate bot response using Dialogflow CX API or any other bot integration
    const botMessage = `Bot response for "${message}"`;
    setTimeout(function() {
      hideBotTypingIndicator();
      sendMessage("bot", botMessage);
      setTimeout(scrollChatToBottom, 0); // Delay scrolling to ensure the message is rendered
    }, 1000);
  }

   function scrollChatToBottom() {
    const lastMessage = chatMessages.lastElementChild;
    lastMessage.scrollIntoView({ behavior: "smooth", block: "end" });
  }
});
