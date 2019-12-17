import Xhr from './xhr.js';
import DocParser from './docParser.js';
export default Component;

function runOnDocCompleted(callback){
  let readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        callback();
    }
  }, 200);
}

function Component(){
  let clientComponents = {};

  this.registerClientComponent = function(name, component){
    clientComponents[name] = component;    
  }

  /**Load server- & client-side computed page components */
  this.load = function(){
    runOnDocCompleted(() => {
      loadInternal();
    });
  }

  function loadInternal(){
    const start = (typeof performance === "undefined" || !performance ) ? Date.now() : performance.now();
    const parseArgs = {
      document: window.document,
      tagHandler: [],
      onSuccess: () => {
        const end = (typeof performance === "undefined" || !performance ) ? Date.now() : performance.now();
        console.log(`Complete parsing for, executing & integrating server & client components took ${end - start} milliseconds`)
      },
      onError: (error) => console.log(error)
    }

    parseArgs.tagHandler.push({ 
      tag: 'server', 
      callback: (element, onHandled, onError) => {
        const filePath = element.hasAttribute('path') ? element.getAttribute('path') : null;
        const args = element.hasAttribute('args') ? element.getAttribute('args') : null;
        console.log(`Resolving Server component ${filePath}`);
        Xhr.get({ 
          path: filePath, 
          args: args,
          onSuccess: getResult => {
            onHandled(getResult); 
          },
          onError: (err) => {
            onError(err);
            onHandled();
          }
        });
      } 
    });
    
    parseArgs.tagHandler.push({ 
      tag: 'clientScript', 
      callback: (element, onHandled, onError) => {
        if(element.hasAttribute('component')){
          const name = element.getAttribute('component');
          const action = element.getAttribute('action');
          const component = clientComponents[name];
          if(component !== undefined){
            if(component[action] !== undefined){
              console.log(`Resolving ClientScript component ${name}.${action}()`);
              component[action](result => {
                onHandled(result); 
              }, 
              error => {
                onError(`Error in function "${action}" for clientScript component "${name}": ${error}`);
                onHandled();
              });
            } else {
              onError(`Unable to resolve function name "${action}" for clientScript component "${name}"!`);
              onHandled();
            }
          } else {
            onError(`Unable to resolve clientScript component reference to "${name}"!`);
            onHandled();
          }
        } else {
          onError(`ClientScript tag found without required "component" attribute!`);
          onHandled();
        }
      }
    });

    const parser = new DocParser();
    parser.run(parseArgs);
  }
}
