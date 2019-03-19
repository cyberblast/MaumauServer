var Maumau = (typeof Maumau === "undefined" || !Maumau ) ? {} : Maumau;
Maumau.Client = (typeof Maumau.Client === "undefined" || !Maumau.Client ) ? {} : Maumau.Client;
Maumau.Client.Engine = (typeof Maumau.Client.Engine === "undefined" || !Maumau.Client.Engine ) ? {} : Maumau.Client.Engine;

Maumau.Client.Engine.Component = function(){
  let clientComponents = {};

  this.registerClientComponent = function(name, component){
    clientComponents[name] = component;
  }

  /**Load server- & client-side computed page components */
  this.load = function(){
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
        Maumau.Client.Engine.Xhr.get({ 
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
              console.log(`Resolving CientScript component ${name}.${action}()`);
              component[action](result => {
                console.log(`${name}.${action}() resolved to "${result}".`);
                onHandled(result); 
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

    const parser = new Maumau.Client.Engine.DocParser();
    parser.run(parseArgs);
  }
}
