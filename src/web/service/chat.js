import Xhr from '../engine/xhr.js';
export { Chat as default }

const polltime = 400;
let lastId = '';
let chatPollTimer;

const Chat = {
  board: function(resolve, error){
    Xhr.get({
      path: '/api/chat/get',
      onSuccess: chatlog => {
        resolve(`<div class="chatboard" id="chatboard"></div>`);
        chatLogUpdate(chatlog);
      },
      onError: error
    });
  },
  send: function(resolve, error, data){
    clearTimeout(chatPollTimer);
    Xhr.get({
      path: '/api/chat/send',
      body: data,
      onSuccess: chatlog => {
        resolve(chatlog);
      },
      onError: error
    });
  },
}

function chatPoll(){
  clearTimeout(chatPollTimer);
  Xhr.get({
    path: '/api/chat/get',
    body: lastId,
    onSuccess: chatlog => {
      chatLogUpdate(chatlog);
    },
    onError: error
  });
  chatPollTimer = window.setTimeout(chatPoll, polltime);
}
function pad(num, size) {
  var s = "00" + num;
  return s.substr(s.length-size);
}
function formatChatItem(item){
  const time = new Date(item.time);
  return `<div class="chatItem">
    <span class="chatTime">${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}</span>
    <span class="chatSender">${item.client}</span>
    <span class="chatText">${item.text}</span>
    </div>`;
}

function chatLogUpdate(serializedItems){
  const board = window.document.getElementById('chatboard');
  if(board != null && serializedItems !== undefined){
    const items = JSON.parse(serializedItems);
    if(items.length !== undefined && items.length > 0){
      items.forEach(i => {
        board.innerHTML = board.innerHTML + formatChatItem(i);
        lastId = i.id;
      });
    }
  }
  chatPollTimer = window.setTimeout(chatPoll, polltime);
}

function error(e){
  console.log(e);
}

window.addEventListener('chatsend', function(e){
  if(e === undefined || e.detail == null) return;
  const event = e.detail;
  if (event.keyCode === 13 && event.shiftKey === false) {
    e.preventDefault();
    e.detail.preventDefault();
    Chat.send(chatLogUpdate, error, `{"lastId":"${lastId}","text": "${event.target.innerHTML}"}`);
    event.target.innerHTML = '';
    return undefined;
  }
}, false);
