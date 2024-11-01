const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
const apiKey = 'AIzaSyC72tWywV-mHfLf0Qdr1OlwkPA0IBmPaJs';

const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value;
    if (message.trim() !== '') {
        displayMessage('Anda', message);
        userInput.value = '';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify({
                queryInput: {
                    text: {
                        text: message,
                        languageCode: 'id'
                    }
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            const aiResponse = data.queryResult.fulfillmentText;
            displayMessage('AI', aiResponse);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
