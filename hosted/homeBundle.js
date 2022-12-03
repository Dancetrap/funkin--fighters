/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/helper.js":
/*!**************************!*\
  !*** ./client/helper.js ***!
  \**************************/
/***/ ((module) => {

eval("const handleError = message => {\n  document.getElementById('errorMessage').textContent = message;\n  document.getElementById('domoMessage').classList.remove('hidden');\n};\nconst handleTeam = message => {\n  document.getElementById('message').textContent = message;\n  document.getElementById('message').classList.remove('hidden');\n  document.getElementById('team').style.borderColor = \"#ff1e00\";\n};\n\n// Only for the login page\nconst loginError = message => {\n  document.getElementById('bf').src = \"/assets/img/bfmiss.png\";\n  document.getElementById('gf').src = \"/assets/img/gfmiss.png\";\n  document.getElementById(\"user\").style.borderColor = \"red\";\n  document.getElementById(\"pass\").style.borderColor = \"red\";\n  // document.getElementById(\"pass2\").style.borderColor = \"red\";\n\n  document.getElementById('loginMessage').textContent = message;\n  document.getElementById('loginMessage').classList.remove('hidden');\n};\nconst signUpError = message => {\n  document.getElementById('bf').src = \"/assets/img/bfmiss.png\";\n  document.getElementById('gf').src = \"/assets/img/gfmiss.png\";\n  document.getElementById(\"user\").style.borderColor = \"red\";\n  document.getElementById(\"pass\").style.borderColor = \"red\";\n  document.getElementById(\"pass2\").style.borderColor = \"red\";\n  document.getElementById('loginMessage').textContent = message;\n  document.getElementById('loginMessage').classList.remove('hidden');\n};\n\n/* Sends post requests to the server using fetch. Will look for various\r\n   entries in the response JSON object, and will handle them appropriately.\r\n*/\n\nconst post = async (url, data, handler) => {\n  const response = await fetch(url, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json();\n  return result;\n};\nconst hideError = () => {\n  document.getElementById('message').classList.add('hidden');\n  document.getElementById('team').style.borderColor = \"#000000\";\n};\nconst hideThing = () => {\n  document.getElementById('loginMessage').classList.add('hidden');\n};\nconst loginAccountPage = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    loginError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst signUpAccountPage = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    signUpError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst teamWork = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    handleTeam(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst setColor = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  // console.log(result.head);\n\n  const nav = document.querySelector('nav');\n  const body = document.querySelector('body');\n  const buttons = document.querySelectorAll('button');\n  const links = document.querySelectorAll('a');\n  const submits = document.querySelector('.formSubmit');\n  // console.log(submits);\n\n  // console.log(luma(result.head));\n  // if it's true, then set text to white, else set it to black\n\n  nav.style.backgroundColor = result.head;\n  body.style.backgroundColor = result.body;\n  if (luma(result.body)) {\n    body.style.color = \"white\";\n  } else {\n    body.style.color = \"black\";\n  }\n  const hsl = hexToHSL(result.head).split(\",\");\n  const h = parseInt(hsl[0]);\n  const s = parseInt(hsl[1]);\n  let b = parseInt(hsl[2]);\n  buttons.forEach(button => button.style.backgroundColor = result.head);\n  links.forEach(a => a.style.backgroundColor = result.head);\n  if (luma(result.head)) {\n    b = b + 5;\n    buttons.forEach(button => {\n      button.style.color = \"white\";\n      button.addEventListener('mouseover', e => {\n        e.target.style.backgroundColor = HSLToHex(h, s, b);\n      });\n      button.addEventListener('mouseout', e => {\n        e.target.style.backgroundColor = result.head;\n      });\n    });\n    links.forEach(a => a.style.color = \"white\");\n  } else {\n    b = b - 5;\n    buttons.forEach(button => {\n      button.style.color = \"black\";\n      button.addEventListener('mouseover', e => {\n        e.target.style.backgroundColor = HSLToHex(h, s, b);\n      });\n      button.addEventListener('mouseout', e => {\n        e.target.style.backgroundColor = result.head;\n      });\n    });\n    links.forEach(a => a.style.color = \"black\");\n  }\n  const unlock = document.getElementById('premium');\n  if (unlock != null || unlock != undefined) {\n    if (luma(result.head)) {\n      unlock.style.backgroundColor = \"white\";\n      unlock.style.color = result.head;\n    } else {\n      unlock.style.backgroundColor = result.head;\n      unlock.style.color = \"black\";\n    }\n    const submits = document.querySelector('#apply');\n    if (submits != null || submits != undefined) {\n      submits.style.backgroundColor = result.head;\n      if (luma(result.head)) {\n        submits.style.backgroundColor = \"white\";\n        submits.style.color = result.head;\n      } else {\n        submits.style.backgroundColor = result.head;\n        submits.style.color = \"black\";\n      }\n    }\n  }\n};\nconst luma = a => {\n  var c = a.substring(1); // strip #\n  var rgb = parseInt(c, 16); // convert rrggbb to decimal\n  var r = rgb >> 16 & 0xff; // extract red\n  var g = rgb >> 8 & 0xff; // extract green\n  var b = rgb >> 0 & 0xff; // extract blue\n\n  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709\n\n  return luma < 80;\n};\nfunction hexToHSL(H) {\n  // Convert hex to RGB first\n  let r = 0,\n    g = 0,\n    b = 0;\n  if (H.length == 4) {\n    r = \"0x\" + H[1] + H[1];\n    g = \"0x\" + H[2] + H[2];\n    b = \"0x\" + H[3] + H[3];\n  } else if (H.length == 7) {\n    r = \"0x\" + H[1] + H[2];\n    g = \"0x\" + H[3] + H[4];\n    b = \"0x\" + H[5] + H[6];\n  }\n  // Then to HSL\n  r /= 255;\n  g /= 255;\n  b /= 255;\n  let cmin = Math.min(r, g, b),\n    cmax = Math.max(r, g, b),\n    delta = cmax - cmin,\n    h = 0,\n    s = 0,\n    l = 0;\n  if (delta == 0) h = 0;else if (cmax == r) h = (g - b) / delta % 6;else if (cmax == g) h = (b - r) / delta + 2;else h = (r - g) / delta + 4;\n  h = Math.round(h * 60);\n  if (h < 0) h += 360;\n  l = (cmax + cmin) / 2;\n  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));\n  s = +(s * 100).toFixed(1);\n  l = +(l * 100).toFixed(1);\n  return h + \",\" + s + \",\" + l;\n}\nfunction HSLToHex(h, s, l) {\n  s /= 100;\n  l /= 100;\n  let c = (1 - Math.abs(2 * l - 1)) * s,\n    x = c * (1 - Math.abs(h / 60 % 2 - 1)),\n    m = l - c / 2,\n    r = 0,\n    g = 0,\n    b = 0;\n  if (0 <= h && h < 60) {\n    r = c;\n    g = x;\n    b = 0;\n  } else if (60 <= h && h < 120) {\n    r = x;\n    g = c;\n    b = 0;\n  } else if (120 <= h && h < 180) {\n    r = 0;\n    g = c;\n    b = x;\n  } else if (180 <= h && h < 240) {\n    r = 0;\n    g = x;\n    b = c;\n  } else if (240 <= h && h < 300) {\n    r = x;\n    g = 0;\n    b = c;\n  } else if (300 <= h && h < 360) {\n    r = c;\n    g = 0;\n    b = x;\n  }\n  // Having obtained RGB, convert channels to hex\n  r = Math.round((r + m) * 255).toString(16);\n  g = Math.round((g + m) * 255).toString(16);\n  b = Math.round((b + m) * 255).toString(16);\n\n  // Prepend 0s, if necessary\n  if (r.length == 1) r = \"0\" + r;\n  if (g.length == 1) g = \"0\" + g;\n  if (b.length == 1) b = \"0\" + b;\n  return \"#\" + r + g + b;\n}\nmodule.exports = {\n  handleError,\n  loginError,\n  signUpError,\n  handleTeam,\n  hideError,\n  hideThing,\n  loginAccountPage,\n  signUpAccountPage,\n  teamWork,\n  setColor,\n  luma,\n  hexToHSL,\n  HSLToHex\n};\n\n//# sourceURL=webpack://Logins/./client/helper.js?");

/***/ }),

/***/ "./client/home.jsx":
/*!*************************!*\
  !*** ./client/home.jsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\");\nconst premium = __webpack_require__(/*! ./premium.js */ \"./client/premium.js\");\nconst init = () => {\n  premium.init();\n};\nwindow.onload = init;\n\n//# sourceURL=webpack://Logins/./client/home.jsx?");

/***/ }),

/***/ "./client/premium.js":
/*!***************************!*\
  !*** ./client/premium.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\");\nlet account;\nlet premium;\nlet headercolor;\nlet bodycolor;\nconst init = async () => {\n  const acc = await fetch('/account');\n  account = await acc.json();\n  premium = Object.values(account)[0].premium;\n  headercolor = Object.values(account)[0].header;\n  bodycolor = Object.values(account)[0].body;\n  if (premium) {\n    const nav = document.querySelector('nav');\n    const body = document.querySelector('body');\n    const buttons = document.querySelectorAll('button');\n    const links = document.querySelectorAll('a');\n    nav.style.backgroundColor = headercolor;\n    body.style.backgroundColor = bodycolor;\n    if (helper.luma(bodycolor)) {\n      body.style.color = \"white\";\n    } else {\n      body.style.color = \"black\";\n    }\n    links.forEach(a => a.style.backgroundColor = headercolor);\n    buttons.forEach(button => button.style.backgroundColor = headercolor);\n    const hsl = helper.hexToHSL(headercolor).split(\",\");\n    const h = parseInt(hsl[0]);\n    const s = parseInt(hsl[1]);\n    let b = parseInt(hsl[2]);\n    if (helper.luma(headercolor)) {\n      b = b + 5;\n      buttons.forEach(button => {\n        button.style.color = \"white\";\n        button.addEventListener('mouseover', e => {\n          e.target.style.backgroundColor = helper.HSLToHex(h, s, b);\n        });\n        button.addEventListener('mouseout', e => {\n          e.target.style.backgroundColor = headercolor;\n        });\n        // button.dispatchEvent(event);\n      });\n\n      links.forEach(a => {\n        a.style.color = \"white\";\n      });\n      document.getElementById('selected').style.color = \"white\";\n    } else {\n      b = b - 5;\n      buttons.forEach(button => {\n        button.style.color = \"black\";\n        button.addEventListener('mouseover', e => {\n          e.target.style.backgroundColor = helper.HSLToHex(h, s, b);\n        });\n        button.addEventListener('mouseout', e => {\n          e.target.style.backgroundColor = headercolor;\n        });\n      });\n      links.forEach(a => {\n        a.style.color = \"black\";\n      });\n      document.getElementById('selected').style.color = \"black\";\n    }\n  }\n  document.getElementById('logo').src = account.account.picture;\n};\n\n// window.onload = init;\n\nmodule.exports = {\n  init\n};\n\n//# sourceURL=webpack://Logins/./client/premium.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/home.jsx");
/******/ 	
/******/ })()
;