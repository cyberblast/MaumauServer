var Maumau = (typeof Maumau === "undefined" || !Maumau ) ? {} : Maumau;
Maumau.Client = (typeof Maumau.Client === "undefined" || !Maumau.Client ) ? {} : Maumau.Client;
Maumau.Client.Engine = (typeof Maumau.Client.Engine === "undefined" || !Maumau.Client.Engine ) ? {} : Maumau.Client.Engine;

Maumau.Client.Engine.DocParser = function(){
  let wrapped = false;
  let openRequests = 0;
  let allRequestsSubmitted = false;
  let completed = false;
  let xmlDoc;
  let args;
    
  // find tags in doc & replace them
  this.run = function(parseArgs){
    args = parseArgs;
    openRequests = 0;
    allRequestsSubmitted = false;
    completed = false;
    xmlDoc = getXmlDocument(args);

    args.tagHandler.forEach(handler => {
      let elements = xmlDoc.getElementsByTagName(handler.tag);
      if(elements && elements.length > 0){

        const processElement = function(element){
          // count open requests
          openRequests++;
          handler.callback(
            element, 
            newElem => { 
              // onHandledCallback
              if(newElem){ 
                // a substitute has been found
                // parse new html snippet again
                const parser = new Maumau.Client.Engine.DocParser();
                // start recursion
                parser.run({
                  document: newElem,
                  tagHandler: args.tagHandler,
                  onSuccess: (parsed) => { 
                    // take final snippet from recursion
                    element.outerHTML = parsed;
                    openRequests--;
                    checkForCompletion();
                  },
                  onError: args.onError
                });
              } else { 
                // no new snippet found
                openRequests--;
                checkForCompletion();
              }            
            }, 
            args.onError
          );
        }
        forEachCollectionItem(elements, processElement);
      }
    });
    allRequestsSubmitted = true;
    checkForCompletion();
  }

  function checkForCompletion(){
    if(openRequests === 0 && allRequestsSubmitted === true && completed === false) {
      completed = true;
      wrapped ? 
      args.onSuccess(xmlDoc.getElementsByTagName('parserRoot')[0].innerHTML) : 
      args.onSuccess(xmlDoc);
    }
  }

  function getXmlDocument(){
    let xmlDoc;
    if(typeof(args.document) === 'string'){
      const wrapper = `<parserRoot>${args.document}</parserRoot>`;
      wrapped = true;
      if (window.DOMParser){
        let domParser = new DOMParser();
        xmlDoc = domParser.parseFromString(wrapper, "text/html");
      } else {// Internet Explorer
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(wrapper);
      }
    } else xmlDoc = args.document;
    return xmlDoc;
  }

  function forEachCollectionItem(collection, callback){
    for(let iItem = 0; iItem < collection.length; iItem++){
      callback(collection.item(iItem), iItem);
    }
  }
}
