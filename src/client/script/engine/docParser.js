var Maumau = (typeof Maumau === "undefined" || !Maumau ) ? {} : Maumau;
Maumau.Client = (typeof Maumau.Client === "undefined" || !Maumau.Client ) ? {} : Maumau.Client;
Maumau.Client.Engine = (typeof Maumau.Client.Engine === "undefined" || !Maumau.Client.Engine ) ? {} : Maumau.Client.Engine;

Maumau.Client.Engine.DocParser = function(){
  let wrapped = false;
    
  // find tags in doc & replace them
  this.run = function(parseArgs){
    let openRequests = 0;
    let allRequestsSubmitted = false;
    let completed = false;
    let xmlDoc = getXmlDocument(parseArgs);
    const onElementHandled = function(){
      openRequests--;
      if(allRequestsSubmitted === true && openRequests === 0) {
        completed = true;
        wrapped ? 
        parseArgs.onSuccess(xmlDoc.getElementsByTagName('parserRoot')[0].innerHTML) : 
        parseArgs.onSuccess(null);
      }
    }

    parseArgs.tagHandler.forEach(handler => {
      const tag = handler.tag;
      const elemCallback = handler.callback;
      const processElement = function(element){
        openRequests++;
        elemCallback(element, onElementHandled);
      }
      let elements = xmlDoc.getElementsByTagName(tag);
      if(elements && elements.length > 0){
        forEachCollectionItem(elements, processElement);
      }
    });      
    allRequestsSubmitted = true;
    if(openRequests === 0 && completed === false){
      wrapped ? parseArgs.onSuccess(xmlDoc.getElementsByTagName('parserRoot')[0].innerHTML) : parseArgs.onSuccess(null);
    }
  }

  function getXmlDocument(parseArgs){
    let xmlDoc;
    if(typeof(parseArgs.document) === 'string'){
      const wrapper = `<parserRoot>${parseArgs.document}</parserRoot>`;
      wrapped = true;
      if (window.DOMParser){
        let domParser = new DOMParser();
        xmlDoc = domParser.parseFromString(wrapper, "text/html");
      } else {// Internet Explorer
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(wrapper);
      }
    } else xmlDoc = parseArgs.document;
    return xmlDoc;
  }

  function forEachCollectionItem(collection, callback){
    for(let iItem = 0; iItem < collection.length; iItem++){
      callback(collection.item(iItem), iItem);
    }
  }
}
