const helper = require('./helper.js');
// const React = require('react');
// const ReactDOM = require('require-dom');

const handleLogin = (e) => {
    e.preventDefault();
    helper.hideThing();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!username || !pass)
    {
        helper.loginError('Username or password is empty!');
    }

    // helper.sendPost(e.target.action, {username, pass, _csrf});
    // helper.vDomo(e.target.action, {username, pass, _csrf});
    helper.loginAccountPage(e.target.action, {username, pass, _csrf});

    return false;
}

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideThing();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!username || !pass || !pass2){
        helper.signUpError('All fields are required!');
        return false;
    }

    if(pass!==pass2)
    {
        helper.signUpError('Passwords do not match');
        return false
    }

    // helper.sendPost(e.target.action, {username, pass, pass2, _csrf});
    helper.signUpAccountPage(e.target.action, {username, pass, pass2, _csrf});
    return false;
}

const LoginWindow = (props) => {
    return (
        <form id="loginForm" 
        name="loginForm" 
        onSubmit={handleLogin} 
        action="/login" 
        method="POST" 
        className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <article id="loginMessage" className='hidden'>Error</article>
            <input className="formSubmit" type="submit" value="Sign in" />
        </form>
    );
};

const SignupWindow = (props) => {
    return (
        <form id="signupForm" name="signupForm" onSubmit={handleSignup} action="/signup" method="POST" className="mainForm">
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <article id="loginMessage" className='hidden'>Error</article> 
            <input className="formSubmit" type="submit" value="Sign Up" />           
        </form>
    );
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    loginButton.addEventListener('click', (e) => {
        document.getElementById('bf').src = "/assets/img/bf.png";
        document.getElementById('gf').src = "/assets/img/gf.png";
        e.preventDefault();
        ReactDOM.render(<LoginWindow csrf={data.csrfToken} />, 
            document.getElementById('content'));
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        document.getElementById('bf').src = "/assets/img/bf.png";
        document.getElementById('gf').src = "/assets/img/gf.png";
        e.preventDefault();
        ReactDOM.render(<SignupWindow csrf={data.csrfToken} />, 
            document.getElementById('content'));
        return false;
    });

    ReactDOM.render(<LoginWindow csrf={data.csrfToken} />, 
        document.getElementById('content'));

}

window.onload = init;