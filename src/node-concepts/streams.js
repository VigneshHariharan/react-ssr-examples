import Stream from 'stream';

const streams = new Stream.Readable();

streams.push("Stream text 1");
streams.push("Stream text 2");

console.log('Streams',streams)