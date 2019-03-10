var Maumau = (typeof Maumau === "undefined" || !Maumau ) ? {} : Maumau;
Maumau.Ajax = function(){
  let requests = 0;
  let processed = false;
  let completed = false;
  let xmlDoc = null;

  this.parseDocument = function(doc, onSuccess, onError){
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
        // console.log('resolving server tag for path: ' + path);
        requests++;
        get(
          path, 
          args, 
          getResult => {
            // parse response recursive
            // console.log(`server tag for "${path}" resolved!`);
            const ajax = new Maumau.Ajax();
            ajax.parseDocument(
              getResult, 
              result => {
                if(result === null ) tag.outerHTML = getResult; // no deeper tag found
                else tag.outerHTML = result;
                requests--;
                if(processed === true && requests === 0) complete(onSuccess, true);
              },
              error => onError(error)
            );
          },
          getError => {
            requests--;
            onError(getError);
            if(processed === true && requests === 0) complete(onSuccess, true);
          })
      });
      processed = true;
      if(requests === 0 && completed === false){
        complete(true);
      }
    } else complete(onSuccess, false);
  }

  function forEachCollectionItem(collection, callback){
    for(let iItem = 0; iItem < collection.length; iItem++){
      callback(collection.item(iItem), iItem);
    }
  }

  function complete(handler, replace){
    completed = true;
    if(replace) handler(xmlDoc.getElementsByTagName('parserRoot')[0].innerHTML);
    else handler(null);
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
  const _ajax = new Maumau.Ajax();
  _ajax.parseDocument(
    window.document.getElementsByTagName("body")[0].innerHTML, 
    result => {
      if( result != null ) window.document.getElementsByTagName("body")[0].innerHTML = result;
      const end = (typeof performance === "undefined" || !performance ) ? Date.now() : performance.now();
      console.log(`Complete ajax parseDocument process took ${end - start} milliseconds`);
    },
    error => console.log(error)
  );
});
