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
        
        links.forEach((a) => a.style.backgroundColor = headercolor);
        buttons.forEach((button) => button.style.backgroundColor = headercolor);

        if (helper.luma(headercolor))
        {
            buttons.forEach((button) => button.style.color = "white");
            links.forEach((a) => a.style.color = "white");
            document.getElementById('selected').style.color = "white";
        }
        else
        {
            buttons.forEach((button) => button.style.color = "black");
            links.forEach((a) => a.style.color = "black");
            document.getElementById('selected').style.color = "black";
        }
        
    }

    document.getElementById('logo').src = account.account.picture;
};

// window.onload = init;

module.exports = {
    init,
}