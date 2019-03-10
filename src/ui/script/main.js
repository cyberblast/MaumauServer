const ajax = new Maumau.Ajax();
const me = new Maumau.Me();
const parser = new Maumau.DocParser();

function runOnDocCompleted(callback){
  let readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        callback();
    }
  }, 90);
}

runOnDocCompleted(() => {
  const start = (typeof performance === "undefined" || !performance ) ? Date.now() : performance.now();
  const parseArgs = {
    document: window.document,
    tagHandler: [],
    onSuccess: () => {
      const end = (typeof performance === "undefined" || !performance ) ? Date.now() : performance.now();
      console.log(`Complete ajax parseDocument process took ${end - start} milliseconds`)
    },
    onError: () => console.log(error)
  }

  parseArgs.tagHandler.push({ 
    tag: 'server', 
    callback: (element, onHandled) => {
      const path = element.hasAttribute('path') ? element.getAttribute('path') : null;
      const args = element.hasAttribute('args') ? element.getAttribute('args') : null;
      ajax.get({ path, args,
        onSuccess: getResult => {
          // parse response recursive
          // console.log(`server tag for "${path}" resolved!`);
          subArgs = Object.assign({}, parseArgs);
          subArgs.document = getResult;
          subArgs.onSuccess = function(subResult){
            if(subResult === null ) element.outerHTML = getResult; // no deeper tag found
            else element.outerHTML = subResult;
            onHandled();
          }
          const subParser = new Maumau.DocParser();
          subParser.run(subArgs);
        },
        onError: err => {
          onHandled();
          parseArgs.onError(err);
        }
      });
    } 
  });
  
  parseArgs.tagHandler.push({ 
    tag: 'clientScript', 
    callback: (element, onHandled) => {
      if(element.hasAttribute('script')){
        const script = element.getAttribute('script');
        command = eval(script);
        if(typeof command === 'function') {
          command(result => {
            element.outerHTML = result;
            onHandled();
          });
        } else {
          element.outerHTML = command;
          onHandled();
        }
      }
    }
  });

  parser.run(parseArgs);
});