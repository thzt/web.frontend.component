import avoidReentry from '../src/index';

const button = document.getElementById('button1');
button.addEventListener('click', avoidReentry({
    onLock(e) {
        const button = this;
        console.log('onLock: ', 'e=' + e);
        button.setAttribute('class', 'disabled');
    },
    onRelease(e) {
        const button = this;
        console.log('onRelease: ', 'e=' + e);
        button.removeAttribute('class');
    },
    onLocking(e) {
        console.warn('onLocking: ', 'e=' + e);
    },
    event: release => function (e) {
        const button = this;

        console.log('clicked: ' + +new Date, 'e=' + e);

        setTimeout(() => {
            release();
        }, 5000);
    }
}), false);