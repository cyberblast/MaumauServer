import Xhr from '/$component/xhr';

export default class ChatBoard extends HTMLElement {
  lastId = '';
  chatPollTimer;
  
  polltime = 1000; // todo: make attribute

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = '<div class="chat-board" id="chatboard"></div>';
    this.chatPoll();
  }

  // static get observedAttributes() {return ['src', 'args']; }
  // attributeChangedCallback(attrName, oldVal, newVal) {
  //   //console.log(`'${attrName}' set from '${oldVal}' to '${newVal}'`);
  // }
  
  chatPoll = function(){
    if(this.chatPollTimer !== undefined) clearTimeout(this.chatPollTimer);
    Xhr.get({
      path: '/$api/chat/get',
      body: this.lastId,
      onSuccess: this.chatLogUpdate,
      onError: this.error
    });
  }.bind(this);

  chatLogUpdate = function(serializedItems){
    if(serializedItems !== undefined){
      const board = window.document.getElementById('chatboard');
      if(board != null){
        const items = JSON.parse(serializedItems);
        if(items.length !== undefined && items.length > 0){
          items.forEach(i => {
            board.innerHTML = board.innerHTML + formatChatItem(i);
            this.lastId = i.id;
          });
          window.document.getElementById(this.lastId).scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }
    }
    this.chatPollTimer = window.setTimeout(this.chatPoll, this.polltime);
  }.bind(this);

  error = function(e){
    console.error(e);
  }.bind(this);
  
  pad(num, size) {
    const s = ("00" + num);
    return s.substr(s.length-size);
  }
  formatChatItem(item){
    const time = new Date(item.time);
    return `<div class="chatItem" id="${item.id}">
      <span class="chatTime">${this.pad(time.getHours(), 2)}:${this.pad(time.getMinutes(), 2)}</span>
      <span class="chatSender">${item.client}</span>
      <span class="chatText">${item.text}</span>
      </div>`;
  }

  static connect(){
    window.customElements.define('chat-board', ChatBoard);
  }
}
