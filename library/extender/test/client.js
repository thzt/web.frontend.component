import 'babel-polyfill';
import Extender from '../src/extender';

class Client { }
Client.prototype = new Extender(Client);

// test extend
let client = new Client;
client.extend({
    instanceMethod() {
        console.log('in the instance method');
    }
});

client.instanceMethod();

// test constructor
console.log(Client.prototype.constructor===Client);