import 'babel-polyfill';
import Extender from '../src/extender';

class Client extends Extender { }

let client = new Client;
client.extend({
    instanceMethod() {
        console.log('in the instanceMethod');
    }
});

client.instanceMethod();