var Maumau = (typeof Maumau === "undefined" || !Maumau ) ? {} : Maumau;
Maumau.Ajax = function(doc, onSuccess, onError){
  let requests = 0;
  let processed = false;
  let completed = false;
  let xmlDoc = null;
  parse();

  function parse(){
    // find tags in doc & replace them
    const wrapper = `<parserRoot>${doc}</parserRoot>`;
    if (window.DOMParser){
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(wrapper, "text/html");
    } else {// Internet Explorer
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = false;
      xmlDoc.loadXML(wrapper);
    }
    let serverTags = xmlDoc.getElementsByTagName("server");
    if(serverTags && serverTags.length > 0){
      forEachCollectionItem(serverTags, tag => {
        const path = tag.hasAttribute('path') ? tag.getAttribute('path') : null;
        const args = tag.hasAttribute('args') ? tag.getAttribute('args') : null;
        requests++;
        get(
          path, 
          args, 
          getResult => {
            // parse response recursive
            new Maumau.Ajax(
              getResult, 
              result => {
                if(result === null ) tag.outerHTML = getResult; // no deeper tag found
                else tag.outerHTML = result;
                requests--;
                if(processed === true && requests === 0) complete(true);
              },
              error => onError(error)
            );
          },
          getError => {
            requests--;
            onError(getError);
            if(processed === true && requests === 0) complete(true);
          })
      });
      processed = true;
      if(requests === 0 && completed === false){
        complete(true);
      }
    } else complete(false);
  }

  function forEachCollectionItem(collection, callback){
    for(let iItem = 0; iItem < collection.length; iItem++){
      callback(collection.item(iItem), iItem);
    }
  }

  function complete(replace){
    completed = true;
    if(replace) onSuccess(xmlDoc.getElementsByTagName('parserRoot')[0].innerHTML);
    else onSuccess(null);
  }

  function get(path, args, onGetSuccess, onGetError){
    const xhr = new XMLHttpRequest();  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if(xhr.status === 200) onGetSuccess(xhr.responseText);
        else onGetError(xhr.responseText);
      }
    }
    xhr.open('GET', path, true);
    xhr.send();
  }
}

function parseDom(){
  new Maumau.Ajax(
    window.document.getElementsByTagName("body")[0].innerHTML, 
    result => {
      if( result != null ) window.document.getElementsByTagName("body")[0].innerHTML = result;
    },
    error => console.log(error)
  );
}

function RunOnDocCompleted(callback){
  let readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        callback();
    }
  }, 90);
}

RunOnDocCompleted(parseDom);
  