import Xhr from '/$component/xhr';

export default class ChatInput extends HTMLElement {
  constructor() {
    super();
  }

  // TODO: get id of chat board as attribute
  
  connectedCallback() {
    this.innerHTML = `<div class="chat-input" contenteditable="true" onkeydown="window.dispatchEvent(new CustomEvent('chat-send',{detail:event}))"></div>`;
    // todo: better eventhandling
    
    window.addEventListener('chat-send', function(e){
      if(e === undefined || e.detail == null) return;
      const event = e.detail;
      if (event.keyCode === 13 && event.shiftKey === false) {
        e.preventDefault();
        e.detail.preventDefault();
        // todo: get lastid from chat-board
        Chat.send(chatLogUpdate, error, `{"lastId":"${lastId}","text": "${event.target.innerHTML}"}`);
        event.target.innerHTML = '';
        return undefined;
      }
    }, false);
  }

  send(){
    // todo: clear timeout in board
    clearTimeout(chatPollTimer);
    Xhr.get({
      path: '/$api/chat/send',
      body: data,
      onSuccess: chatlog => {
        resolve(chatlog);
      },
      onError: error
    });
  }

  static connect(){
    window.customElements.define('chat-input', ChatInput);
  }
}
