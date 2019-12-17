import Component from './engine/component.js';
import Server from './service/server.js'
import Chat from './service/chat.js'

const components = new Component();
components.registerClientComponent('Maumau.Server', Server);
components.registerClientComponent('Maumau.Chat', Chat);
components.load();
