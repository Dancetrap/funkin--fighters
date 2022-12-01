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
        const buttons = document.querySelectorAll('button');
        const links = document.querySelectorAll('a');
    
        nav.style.backgroundColor = headercolor;
        buttons.forEach((button) => button.style.backgroundColor = headercolor);
        links.forEach((a) => a.style.backgroundColor = headercolor);
        
    }
};

window.onload = init;