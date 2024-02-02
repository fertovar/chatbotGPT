
function toggleChat() {
    var chat = document.getElementById('chat-container');
    chat.classList.toggle('hidden');
}



function sendMessage() {
    var input = document.getElementById('chat-input');
    var message = input.value;
    input.value = '';

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "sendMessage.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var response = JSON.parse(this.responseText);
            var output = document.getElementById('chat-output');
            output.innerHTML += '<p>Tú: ' + message + '</p>';
            output.innerHTML += '<p>Directora: ' + response.message + '</p>';
        }
    }

    xhr.send("message=" + encodeURIComponent(message));
}
