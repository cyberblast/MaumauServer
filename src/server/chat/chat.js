const Message = require('./message');

module.exports = class Chat{  
  /**
   * { Message[] }
   */
  #messages = [];

  /**
   * Dictionary to map id to message index
   * { [key: string]: number }
   */
  #index = {};

  constructor(){}

  /**
   * @param {string} client - requestor
   * @param {string} sinceId - last received id
   * @param {string} message - message to post
   * @return { Message[] } Messages since last poll
   */
  addMessage(client, sinceId, message){
    const m = new Message(client, message);
    const l = this.#messages.push(m);
    this.#index[m.id] = l-1;
    return this.getMessages(client, sinceId);
  }
  
  /**
   * @param {string} client - requestor
   * @param {string} sinceId - last received id
   * @return { Message[] } Messages since last poll
   */
  getMessages(client, sinceId){
    if(sinceId == null) return this.#messages;
    const index = this.#index[sinceId];
    if(index === undefined) return [];
    return this.#messages.slice(index+1);
  }
}
