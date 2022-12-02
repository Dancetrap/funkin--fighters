const helper = require('./helper.js');

let account;
let premium;

let headercolor;
let bodycolor;

const init = async () => {
    const acc = await fetch('/account');
    account = await acc.json();

    premium = Object.values(account)[0].premium;

    headercolor = Object.values(account)[0].header;
    bodycolor = Object.values(account)[0].body;

    if(premium)
    {
        const nav = document.querySelector('nav');
        const body = document.querySelector('body');
        const buttons = document.querySelectorAll('button');
        const links = document.querySelectorAll('a');
    
        nav.style.backgroundColor = headercolor;
        body.style.backgroundColor = bodycolor;
        if (helper.luma(bodycolor))
        {
            body.style.color = "white";
        }
        else
        {
            body.style.color = "black";
        }

        console.log(buttons);
        
        buttons.forEach((button) => button.style.backgroundColor = headercolor);
        links.forEach((a) => a.style.backgroundColor = headercolor);
        
    }

    document.getElementById('logo').src = account.account.picture;
};

// window.onload = init;

module.exports = {
    init,
}