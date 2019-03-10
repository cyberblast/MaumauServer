module.exports = class Server{
  static stop(server, request, response){
    response.write("Stopping server!");
    server.stop();
    response.end();
  }
}