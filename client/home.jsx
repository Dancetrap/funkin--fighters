const helper = require('./helper.js');
const premium = require('./premium.js');

const init = () => {
    premium.init();
};

window.onload = init;