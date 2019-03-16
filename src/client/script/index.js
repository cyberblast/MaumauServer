/**Execute code as soon as loading Window.document completed */
function runOnDocCompleted(callback){
  let readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        callback();
    }
  }, 90);
}

runOnDocCompleted(() => {
  Maumau.Client.Engine.Component.load();
});