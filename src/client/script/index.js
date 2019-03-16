/**Execute code as soon as loading Window.document completed */
function runOnDocCompleted(callback){
  let readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        callback();
    }
  }, 90);
}

const components = new Maumau.Client.Engine.Component();
components.registerClientComponent('Maumau.Client.Service.Server', Maumau.Client.Service.Server);
runOnDocCompleted(() => {
  components.load();
});