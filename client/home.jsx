const helper = require('./helper.js');
const premium = require('./premium.js');

const init = () => {
    premium.init();
    // Get the scroll value
    document.addEventListener('scroll', reveal, true);

    const marks = document.querySelectorAll('.marker');

    for(let i = 0; i < marks.length; i++)
    {
        marks[i].addEventListener("mouseover", display);
    }
};

const reveal = () => {
    // console.log('scroll');
    // document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
    
    const explain = document.querySelectorAll('.explain');
    for(let i = 0; i < explain.length; i++)
    {
        const windowHeight = window.innerHeight;
        const elementTop = explain[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            explain[i].classList.add("active");
        } else {
            explain[i].classList.remove("active");
        }
    }
}

const display = (e) => {
    console.log('hover');
    console.log(e.target.id);

    const id = e.target.id.split("")[1];
    console.log(id);

    document.getElementById(`m${id}`).classList.add("visible");
};

const hide = () => {
    // document.getElementById(`m${id}`).classList.add("visible");
    const all = document.querySelectorAll(".visible");
    if(all.length != 0)
    {
        for(let i = 0; i < all.length; i++)
        {
            all[i].classList.remove("visible");
        }
    }
}

window.onload = init;