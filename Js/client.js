const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

var audio = new Audio('ting.mp3');

const appendI = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if(position == 'left') {
        audio.play();
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        appendI(`You: ${message}`, 'right');
        socket.emit('send', message);
        messageInput.value = '';
    });
    
    const name = prompt("Enter your name to join LetsChat");
    socket.emit('new-user-joined', name);
    
    socket.on('user-joined', name=>{
        appendI(`${name} joined the chat`, 'right');
    });
    
    socket.on('receive', data=>{
        appendI(`${data.name }: ${data.message}`, 'left')
    });
    
    socket.on('left', name=>{
        appendI(`${name } left the chat`, 'left');
    });
}