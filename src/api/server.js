module.exports = class Server{
  stop(server, request, response){
    response.write("Stopping server!");
    server.stop();
    response.end();
  }
}