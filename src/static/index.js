function toggleTimetamps(event){
  window.dispatchEvent(new CustomEvent('chat-timestamps',{detail:event}));
}
let timestampruleid = undefined;
window.addEventListener('chat-timestamps', function(e){
  e.preventDefault();
  e.detail.preventDefault();
  const box = document.getElementById('cb-timestamps');
  const show = box.classList.toggle('checked');
  const sheet = document.styleSheets[0];
  if(show){
    sheet.deleteRule(timestampruleid);
  }
  else {
    timestampruleid = sheet.insertRule('.chatItem > span.chatTime { display: none; }', timestampruleid); 
  }
}, false);