const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newName = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

newChatForm.addEventListener('submit', e=>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(()=>{
            newChatForm.reset();
        })
        .catch( err => console.log(err))
})

newName.addEventListener('submit', e=>{
    e.preventDefault();
    const name = newName.name.value.trim();
    chatroom.updateName(name);
    newName.reset();
    updateMsg.innerText = `Your name was updated to ${name}`;
    setTimeout(()=>{
        updateMsg.innerText= ``;
    },3000);
})

rooms.addEventListener('click',e=>{
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute("id"));
        chatroom.getChats(data => chatUI.render(data));
    }

});

const username = localStorage.username ? localStorage.username : 'anno'; 

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general',username);
chatroom.getChats( data => chatUI.render(data) );