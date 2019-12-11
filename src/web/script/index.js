import Component from '../engine/component.js';
import Server from './service/server.js'

const components = new Component();
components.registerClientComponent('Maumau.Server', Server);
components.load();
