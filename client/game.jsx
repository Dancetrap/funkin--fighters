const helper = require('./helper.js');
let csrfToken;

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();
    csrfToken = data.csrfToken;

    const load = await fetch('/accounts');
    const accounts = await load.json();
    console.log(accounts);
}

window.onload = init;