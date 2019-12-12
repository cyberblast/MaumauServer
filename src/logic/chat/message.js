module.exports = class Message
{
  #time;
  #id;
  #client;
  #text;

  /**
   * @type { Date }
   */
  get time() {
    return this.#time;
  }

  /**
   * @type { String }
   */
  get id() {
    return this.#id;
  }
  
  /**
   * @type { String }
   */
  get client() {
    return this.#client;
  }
  
  /**
   * @type { String }
   */
  get text() {
    return this.#text;
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  constructor(client, text){
    this.#time = Date.now();
    this.#id = this.uuidv4();
    this.#client = client;
    this.#text = text;
  }
  
  toJSON() {
    return {
      time: this.#time,
      id: this.#id,
      client: this.#client,
      text: this.#text
    }
  }
}