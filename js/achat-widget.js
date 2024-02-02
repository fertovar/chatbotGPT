document.addEventListener("DOMContentLoaded", (event) => {
  // Encuentra el script actual por su src y lee el token
  const scriptTag = document.querySelector('script[src="js/achat-widget.js"]');
  const token = scriptTag.getAttribute("data-chat-token");

  fetch("valid.php", {
    method: "POST", // O 'GET', dependiendo de tu configuración
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.isValid) {
        const chatHTML =
          `
                <div id="chat-icon">
                    <img width="64" height="64" alt="AI Chatbot Avatar" src="chat-robot-3.svg" class="no-lightbox">
                </div>
                <div id="chat-container" style="background-color:#EFF4F5;border-radius: 10px;" class="hidden">
                <p style="text-align: center;margin-top: 5px;margin-bottom: 5px;">` +
          data.data +
          `</p>
                    <div id="chat-output"></div>
                    <textarea style="margin-top: 10px;" id="chat-input"></textarea>
                    <button id="send-message-btn">Enviar</button>
                    <button id="clear-chat-btn">Borrar</button>
                </div>
                `;
        document.body.insertAdjacentHTML("beforeend", chatHTML);


        document
          .getElementById("chat-icon")
          .addEventListener("click", toggleChat);
        document
          .getElementById("send-message-btn")
          .addEventListener("click", sendMessage);
        document
          .getElementById("clear-chat-btn")
          .addEventListener("click", clearChat);

        function sendMessage() {
          var input = document.getElementById("chat-input");
          var message = input.value;
          input.value = "";

          // Guardar y obtener el historial del localStorage
          var history = localStorage.getItem("chatHistory") || "";
          history += "usuario: " + message + "\n";
          localStorage.setItem("chatHistory", history);

          var xhr = new XMLHttpRequest();
          xhr.open("POST", "sendMessage.php", true);
          xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );

          xhr.onreadystatechange = function () {
            if (
              this.readyState === XMLHttpRequest.DONE &&
              this.status === 200
            ) {
              var response = JSON.parse(this.responseText);
              var output = document.getElementById("chat-output");
              output.innerHTML +=
                '<p style=" background-color:#98bcc5;margin-top: 5px;margin-bottom: 0px;padding-top: 5px;padding-bottom: 10px;padding-left: 10px;padding-right: 10px;border-radius: 5px;">Tú: ' +
                message +
                "</p>";
              output.innerHTML +=
                '<p style=" background-color:#D8E5E8;margin-top: 5px;margin-bottom: 0px;padding-top: 5px;padding-bottom: 10px;padding-left: 10px;padding-right: 10px;border-radius: 5px;">Directora: ' +
                response.message +
                "</p>";

              // Actualizar el historial con la respuesta
              var history = localStorage.getItem("chatHistory") || "";
              history += "ChatGPT: " + response.message + "\n";
              localStorage.setItem("chatHistory", history);
            }
          };

          // Enviar mensaje e historial
          xhr.send(
            "message=" +
              encodeURIComponent(message) +
              "&history=" +
              encodeURIComponent(history)
          );
        }

        document
          .getElementById("chat-input")
          .addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
              event.preventDefault(); // Previene el comportamiento por defecto de Enter
              sendMessage(); // Llama a la función sendMessage
            }
          });

        // Función para borrar el chat
        function clearChat() {
          document.getElementById("chat-output").innerHTML = "";
          localStorage.removeItem("chatHistory");
        }

        function toggleChat() {
          console.log("toggleChat function called");
          var chat = document.getElementById("chat-container");
          if (chat.style.display === "none" || chat.style.display === "") {
            chat.style.display = "block";
          } else {
            chat.style.display = "none";
          }
        }
      } else {
        console.error("Token no válido.");
        // Manejar un token no válido aquí (opcional)
      }
    })
    .catch((error) => {
      console.error("Error al validar el token:", error);
    });
});
