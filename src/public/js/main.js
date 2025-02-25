console.log("Funciona todo?")

const socket = io();

let user;

const chatBox = document.getElementById('chat-box');
const message = document.getElementById('message-logs');

swal.fire({ //configuracion
    title: "identificate",
    input: "text",
    text: "Ingresa con tu usuario para entrar al chat",
    inputValidator: (value) => {
        return !value && "Por favor, ingresa tu nombre para continuar";
        
    },
    allowOutsideClick: false,
}).then((result) => {
    user = result.value;
    // socket.emit('new-user', user);
});


chatBox.addEventListener('keyup', (event) => {
    event.preventDefault();
    if(event.key === 'Enter') {
        if(chatBox.value.trim().length > 0) // Aca indicamos que si hay mas de un elemento, quiere decir que esta ocupado por un string
            {
                socket.emit('message', { user:user, message: chatBox.value });
                chatBox.value = '';
            }

    }
});


//  trabajas la vista de los mensajes

socket.on('message-logs', (data) => {
    const log = document.getElementById('message-logs');
    let messages;
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message} \n`;
    })
    log.innerText = messages;
});


