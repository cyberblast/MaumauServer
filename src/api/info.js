module.exports = class Info{
  static version(server, request, response){
    response.write("0.0.0");
    response.end();
  }
  static ip(server, request, response){
    response.write(request.socket.remoteAddress.split(':').pop());
    response.end();
  }
}