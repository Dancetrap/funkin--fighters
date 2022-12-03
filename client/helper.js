const handleError = (message) => {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('domoMessage').classList.remove('hidden');
  };

const handleTeam = (message) => {
    document.getElementById('message').textContent = message;
    document.getElementById('message').classList.remove('hidden');

    document.getElementById('team').style.borderColor = "#ff1e00";
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

  const hideError = () => {
    document.getElementById('message').classList.add('hidden');
    document.getElementById('team').style.borderColor = "#000000";
  };

  const hideThing = () => {
    document.getElementById('loginMessage').classList.add('hidden');
  };
  

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

  const teamWork = async (url, data, handler) => { 
    const result = await post(url, data, handler);

    if(result.redirect) {
      window.location = result.redirect;
    }

    if(result.error) {
      handleTeam(result.error);
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

    const hsl = hexToHSL(result.head).split(",");
    const h = parseInt(hsl[0]);
    const s = parseInt(hsl[1]);
    let b = parseInt(hsl[2]);

    buttons.forEach((button) => button.style.backgroundColor = result.head);
    links.forEach((a) => a.style.backgroundColor = result.head);
    if (luma(result.head))
    {
      b = b + 5;
        buttons.forEach((button) => {
          button.style.color = "white";
          button.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = HSLToHex(h,s,b);
          });
          button.addEventListener('mouseout', (e) => {
            e.target.style.backgroundColor = result.head;
          });
        });
        links.forEach((a) => a.style.color = "white");
    }
    else
    {
      b = b - 5;
        buttons.forEach((button) => { button.style.color = "black";
        button.addEventListener('mouseover', (e) => {
          e.target.style.backgroundColor = HSLToHex(h,s,b);
        });
        button.addEventListener('mouseout', (e) => {
          e.target.style.backgroundColor = result.head;
        });
      });
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

      const submits = document.querySelector('#apply');
      if(submits != null || submits != undefined)
      {
        submits.style.backgroundColor = result.head;
        if (luma(result.head))
        {
          submits.style.backgroundColor = "white";
          submits.style.color = result.head;
        }
        else
        {
          submits.style.backgroundColor = result.head;
          submits.style.color = "black";
        }
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

    return luma < 80;
}

function hexToHSL(H) {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return h + "," + s + "," + l;
}

function HSLToHex(h,s,l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0, 
      b = 0; 

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

  module.exports = {
    handleError,
    loginError,
    signUpError,
    handleTeam,
    hideError,
    hideThing,
    loginAccountPage,
    signUpAccountPage,
    teamWork,
    setColor,
    luma,
    hexToHSL,
    HSLToHex,
  };