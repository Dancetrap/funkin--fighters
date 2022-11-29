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
  };