// Make sure to include the Dialogflow JavaScript library in your HTML file:
// <script src="https://www.gstatic.com/dialogflow/agent/api.js"></script>

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
      sendUserMessageToDialogflow(message);
      messageInput.value = "";
      messageInput.focus();
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

  function sendUserMessageToDialogflow(message) {
    // Replace 'YOUR_PROJECT_ID' with your actual Dialogflow project ID
    const projectId = 'YOUR_PROJECT_ID';

    // Initialize Dialogflow client
    const sessionClient = new dialogflow.SessionClient();

    // Replace 'YOUR_AGENT_ID' with your actual Dialogflow agent ID
    const agentId = 'YOUR_AGENT_ID';

    // Replace 'YOUR_LANGUAGE_CODE' with the language code of your Dialogflow agent (e.g., 'en-US')
    const languageCode = 'YOUR_LANGUAGE_CODE';

    // Create a new session path
    const sessionPath = sessionClient.sessionPath(projectId, agentId);

    // Create a new query input
    const queryInput = {
      text: {
        text: message,
        languageCode: languageCode
      }
    };

    // Send the user message to Dialogflow
    sessionClient.detectIntent({ session: sessionPath, queryInput: queryInput })
      .then(handleBotResponse)
      .catch(console.error);
  }

  function handleBotResponse(response) {
    const botMessage = response.queryResult.fulfillmentText;
    sendMessage("bot", botMessage);
  }

  function scrollChatToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
