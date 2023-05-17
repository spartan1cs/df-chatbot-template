document.addEventListener("DOMContentLoaded", function() {
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  const chatMessages = document.getElementById("chat-messages");

  sendButton.addEventListener("click", function() {
    const message = messageInput.value.trim();
    if (message !== "") {
      sendMessage("user", message);
      getBotResponse(message);
      messageInput.value = "";
    }
  });

  messageInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendButton.click();
    }
  });

  function sendMessage(sender, message) {
    const messageContainer = createMessageContainer(sender);
    const messageContent = createMessageContent(message);
    const messageIcon = createMessageIcon(sender);

    messageContainer.appendChild(messageIcon);
    messageContainer.appendChild(messageContent);

    chatMessages.appendChild(messageContainer);

    scrollChatToBottom();
  }

  function createMessageContainer(sender) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message", `${sender}-message`);
    return messageContainer;
  }

  function createMessageContent(message) {
    const messageContent = document.createElement("div");
    messageContent.classList.add("message-content");
    messageContent.innerHTML = `<p>${message}</p>`;
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
      sendMessage("bot", botMessage);
    }, 1000);
  }

  function scrollChatToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
