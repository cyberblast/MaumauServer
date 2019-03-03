let buf = new Buffer(256);
let len = buf.write("Simply Easy Learning");

console.log("Octets written : "+  len);
console.log("Buffer Content: " + buf.toString());

var json = buf.toJSON(buf);
console.log(json);

buf = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}

console.log( buf.toString('ascii'));       // outputs: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // outputs: abcde
console.log( buf.toString('utf8',0,5));    // outputs: abcde
console.log( buf.toString(undefined,0,5)); // encoding defaults to 'utf8', outputs abcde

// https://www.tutorialspoint.com/nodejs/nodejs_quick_guide.htm