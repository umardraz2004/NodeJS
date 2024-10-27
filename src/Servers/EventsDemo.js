import { EventEmitter } from 'events';

const myEmitter = new EventEmitter()

function greatingHandler() {
    console.log('Hello, World!')
}

function goodByeHandler() {
    console.log('Goodbye, World!')
}

// Register event listeners
myEmitter.on('greet', greatingHandler);
myEmitter.on('goodbye', goodByeHandler);

// Emit events
myEmitter.emit('greet');
myEmitter.emit('goodbye');

// Error handling
myEmitter.on('error', (err) => {
    console.log('An error occured: ' + err)
});

// Simulate Error
myEmitter.emit('error', new Error('some thing went wrong'));