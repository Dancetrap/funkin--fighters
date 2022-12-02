const handleError = (message) => {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('domoMessage').classList.remove('hidden');
  };

  // Only for the login page
const loginError = (message) => {
    document.getElementById('bf').src = "/assets/img/bfmiss.png";
    document.getElementById('gf').src = "/assets/img/gfmiss.png";

    document.getElementById("user").style.borderColor = "red";
    document.getElementById("pass").style.borderColor = "red";
    // document.getElementById("pass2").style.borderColor = "red";

    document.getElementById('loginMessage').textContent = message;
    document.getElementById('loginMessage').classList.remove('hidden');
}

const signUpError = (message) => {
  document.getElementById('bf').src = "/assets/img/bfmiss.png";
  document.getElementById('gf').src = "/assets/img/gfmiss.png";

  document.getElementById("user").style.borderColor = "red";
  document.getElementById("pass").style.borderColor = "red";
  document.getElementById("pass2").style.borderColor = "red";

  document.getElementById('loginMessage').textContent = message;
  document.getElementById('loginMessage').classList.remove('hidden');
}
  
  /* Sends post requests to the server using fetch. Will look for various
     entries in the response JSON object, and will handle them appropriately.
  */

  const post = async (url, data, handler) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    const result = await response.json();
    return result;
  }

  const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    const result = await response.json();
    document.getElementById('domoMessage').classList.add('hidden');
  
    if(result.redirect) {
      window.location = result.redirect;
    }
  
    if(result.error) {
      handleError(result.error);
    }

    if(handler) {
      handler(result);
    }
  };

  const hideError = () => {
    document.getElementById('domoMessage').classList.add('hidden');
  };

  const hideThing = () => {
    document.getElementById('loginMessage').classList.add('hidden');
  };

  const vDomo = async (url, data, handler) => {
    const result = await post(url, data, handler);

    document.getElementById('domoMessage').classList.add('hidden');
  
    if(result.redirect) {
      window.location = result.redirect;
    }
  
    if(result.error) {
      handleError(result.error);
    }

    if(handler) {
        handler(result);
    }
  }

  const loginAccountPage = async (url, data, handler) => {
    const result = await post(url, data, handler);

    if(result.redirect) {
      window.location = result.redirect;
    }

    if(result.error) {
      loginError(result.error);
    }

    if(handler) {
        handler(result);
    }
  }

  const signUpAccountPage = async (url, data, handler) => {
    const result = await post(url, data, handler);

    if(result.redirect) {
      window.location = result.redirect;
    }

    if(result.error) {
      signUpError(result.error);
    }

    if(handler) {
        handler(result);
    }
  }

  const setColor = async (url, data, handler) => {
    const result = await post(url, data, handler);
    // console.log(result.head);

    const nav = document.querySelector('nav');
    const body = document.querySelector('body');
    const buttons = document.querySelectorAll('button');
    const links = document.querySelectorAll('a');
    const submits = document.querySelector('.formSubmit');
    // console.log(submits);

    // console.log(luma(result.head));
    // if it's true, then set text to white, else set it to black

    nav.style.backgroundColor = result.head;

    body.style.backgroundColor = result.body;
    if (luma(result.body))
    {
        body.style.color = "white";
    }
    else
    {
        body.style.color = "black";
    }

    buttons.forEach((button) => button.style.backgroundColor = result.head);
    links.forEach((a) => a.style.backgroundColor = result.head);
    if (luma(result.head))
    {
        buttons.forEach((button) => button.style.color = "white");
        links.forEach((a) => a.style.color = "white");
    }
    else
    {
        buttons.forEach((button) => button.style.color = "black");
        links.forEach((a) => a.style.color = "black");
    }

    const unlock = document.getElementById('premium');
    if(unlock != null || unlock != undefined)
    {
      if (luma(result.head))
      {
        unlock.style.backgroundColor = "white";
        unlock.style.color = result.head;
      }
      else
      {
        unlock.style.backgroundColor = result.head;
        unlock.style.color = "black";
      }
    }
  }

  const luma = (a) => {
    var c = a.substring(1);      // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return luma < 50;
    // if (luma < 40) {
    //     // pick a different colour
    // }
}

  module.exports = {
    handleError,
    loginError,
    signUpError,
    sendPost,
    hideError,
    hideThing,
    vDomo,
    loginAccountPage,
    signUpAccountPage,
    setColor,
    luma,
  };