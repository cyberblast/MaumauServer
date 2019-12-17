import Xhr from './xhr';

class ServerSnippet extends HTMLElement {
  get src() {
    return this.getAttribute('src');
  }
  set src(val) {
    if (val) {
      this.setAttribute('src', val);
    } else {
      this.removeAttribute('src');
    }
  }
  get args() {
    return this.getAttribute('args');
  }
  set args(val) {
    if (val) {
      this.setAttribute('args', val);
    } else {
      this.removeAttribute('args');
    }
  }

  constructor() {
    super();
  }
  initialized;
  connectedCallback() {
    //console.log(`ServerSnippet.connectedCallback`);
    // this.innerHTML = "loading...";
    this.load();
    this.initialized = true;
  }
  static get observedAttributes() {return ['src', 'args']; }
  attributeChangedCallback(attrName, oldVal, newVal) {
    //console.log(`'${attrName}' set from '${oldVal}' to '${newVal}'`);
    if(this.initialized === true) this.load();
  }
  load(){
    const src = this.src;
    const args = this.args;
    console.log(`Resolving ServerSnippet: ${src}`);
    if(src){
      Xhr.get({ 
        path: src, 
        args,
        onSuccess: result => {
          this.innerHTML = result;
        },
        onError: (err) => {
          console.error(err);
        }
      });
    }
  }
}
window.customElements.define('server-snippet', ServerSnippet);
