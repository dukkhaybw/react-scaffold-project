import mitt from 'mitt';

const emitter = mitt();

export default emitter;
// listen to an event
// emitter.on('changeLanguage', e => console.log('foo', e) )
