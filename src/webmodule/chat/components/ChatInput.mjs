export default class ChatInput extends HTMLElement {
  initialized;

  constructor() {
    super();
  }

  // TODO: get id of chat board as attribute
  get for() {
    return this.getAttribute('for');
  }
  set for(val) {
    if (val) {
      this.setAttribute('for', val);
    } else {
      this.removeAttribute('for');
    }
  }
  static get observedAttributes() {
    return ['for'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    //console.log(`'${attrName}' set from '${oldVal}' to '${newVal}'`);
    if(this.initialized === true) this.init();
  }

  connectedCallback() {
    this.innerHTML = `<div class="chat-input" contenteditable="true" onkeydown="window.dispatchEvent(new CustomEvent('chat-send',{detail:event}))"></div>`;
    this.init();
  }

  init(){
    window.removeEventListener('chat-send', this.send);
    window.addEventListener('chat-send', this.send, false);
    this.initialized = true;
  }

  send = function(e){
    if(e === undefined || e.detail == null) return;
    const event = e.detail;
    if (event.keyCode === 13 && event.shiftKey === false) {
      e.preventDefault();
      e.detail.preventDefault();
      console.log(this.for);
      const chat = window.document.getElementById(this.for);
      console.log(chat);
      const text = event.target.innerHTML;
      event.target.innerHTML = '';
      if(chat != null && chat.send !== undefined) chat.send(text);
      return undefined;
    }
  }.bind(this);
  
  static connect(){
    window.customElements.define('chat-input', ChatInput);
  }
}
