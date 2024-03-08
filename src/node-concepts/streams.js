import Stream from 'stream';

const streams = new Stream.Writable();
console.log("Streams before", streams);

// streams.push("Stream text 1");
// streams.push("Stream text 2");

console.log('Streams after',streams)