const helper = require('./helper.js');
const premium = require('./premium.js');

const init = () => {
    premium.init();
    // Get the scroll value
    document.addEventListener('scroll', reveal, true);
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

window.onload = init;