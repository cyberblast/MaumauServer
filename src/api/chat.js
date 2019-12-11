const Chat = require('../logic/chat/chat');
const chat = new Chat();

module.exports = class ChatApi{
  static get(serverContext){
    const sinceId = serverContext.data;
    // todo: check for valid uuid
    const clientIp = serverContext.request.socket.remoteAddress.split(':').pop();
    serverContext.logger.log({
      category: 'chat',
      severity: 'Verbose',
      message: `${clientIp} requested messages`
    });
    return JSON.stringify(chat.getMessages(clientIp, sinceId));
  }
  
  static send(serverContext){
    let send = serverContext.data;
    // todo: check for valid object
    if(send != null) send = JSON.parse(send);
    const clientIp = serverContext.request.socket.remoteAddress.split(':').pop();
    serverContext.logger.log({
      category: 'chat',
      severity: 'Info',
      message: `${clientIp}: ${send.text}`
    });
    return JSON.stringify(chat.addMessage(clientIp, send.lastId, send.text));
  }
}