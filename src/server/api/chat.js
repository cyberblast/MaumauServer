const Chat = require('../chat/chat.js');
const chat = new Chat();

module.exports = class ChatApi{
  static get(serverContext){
    const sinceId = serverContext.data;
    // todo: check for valid uuid
    const clientIp = serverContext.request.socket.remoteAddress.split(':').pop();
    return JSON.stringify(chat.getMessages(clientIp, sinceId));
  }
  
  static send(serverContext){
    let send = serverContext.data;
    // todo: check for valid contract
    if(send != null) send = JSON.parse(send);
    const clientIp = serverContext.request.socket.remoteAddress.split(':').pop();
    return JSON.stringify(chat.addMessage(clientIp, send.lastId, send.text));
  }
}