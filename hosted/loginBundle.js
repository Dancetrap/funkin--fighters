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

eval("const handleError = message => {\n  document.getElementById('errorMessage').textContent = message;\n  document.getElementById('domoMessage').classList.remove('hidden');\n};\n\n// Only for the login page\nconst loginError = message => {\n  document.getElementById('bf').src = \"/assets/img/bfmiss.png\";\n  document.getElementById('gf').src = \"/assets/img/gfmiss.png\";\n  document.getElementById(\"user\").style.borderColor = \"red\";\n  document.getElementById(\"pass\").style.borderColor = \"red\";\n  // document.getElementById(\"pass2\").style.borderColor = \"red\";\n\n  document.getElementById('loginMessage').textContent = message;\n  document.getElementById('loginMessage').classList.remove('hidden');\n};\nconst signUpError = message => {\n  document.getElementById('bf').src = \"/assets/img/bfmiss.png\";\n  document.getElementById('gf').src = \"/assets/img/gfmiss.png\";\n  document.getElementById(\"user\").style.borderColor = \"red\";\n  document.getElementById(\"pass\").style.borderColor = \"red\";\n  document.getElementById(\"pass2\").style.borderColor = \"red\";\n  document.getElementById('loginMessage').textContent = message;\n  document.getElementById('loginMessage').classList.remove('hidden');\n};\n\n/* Sends post requests to the server using fetch. Will look for various\r\n   entries in the response JSON object, and will handle them appropriately.\r\n*/\n\nconst post = async (url, data, handler) => {\n  const response = await fetch(url, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json();\n  return result;\n};\nconst sendPost = async (url, data, handler) => {\n  const response = await fetch(url, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json();\n  document.getElementById('domoMessage').classList.add('hidden');\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    handleError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst hideError = () => {\n  document.getElementById('domoMessage').classList.add('hidden');\n};\nconst hideThing = () => {\n  document.getElementById('loginMessage').classList.add('hidden');\n};\nconst vDomo = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  document.getElementById('domoMessage').classList.add('hidden');\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    handleError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst loginAccountPage = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    loginError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst signUpAccountPage = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n  if (result.error) {\n    signUpError(result.error);\n  }\n  if (handler) {\n    handler(result);\n  }\n};\nconst setColor = async (url, data, handler) => {\n  const result = await post(url, data, handler);\n};\nmodule.exports = {\n  handleError,\n  loginError,\n  signUpError,\n  sendPost,\n  hideError,\n  hideThing,\n  vDomo,\n  loginAccountPage,\n  signUpAccountPage,\n  setColor\n};\n\n//# sourceURL=webpack://Logins/./client/helper.js?");

/***/ }),

/***/ "./client/login.jsx":
/*!**************************!*\
  !*** ./client/login.jsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\");\n// const React = require('react');\n// const ReactDOM = require('require-dom');\n\nconst handleLogin = e => {\n  e.preventDefault();\n  helper.hideThing();\n  const username = e.target.querySelector('#user').value;\n  const pass = e.target.querySelector('#pass').value;\n  const _csrf = e.target.querySelector('#_csrf').value;\n  if (!username || !pass) {\n    helper.loginError('Username or password is empty!');\n  }\n\n  // helper.sendPost(e.target.action, {username, pass, _csrf});\n  // helper.vDomo(e.target.action, {username, pass, _csrf});\n  helper.loginAccountPage(e.target.action, {\n    username,\n    pass,\n    _csrf\n  });\n  return false;\n};\nconst handleSignup = e => {\n  e.preventDefault();\n  helper.hideThing();\n  const username = e.target.querySelector('#user').value;\n  const pass = e.target.querySelector('#pass').value;\n  const pass2 = e.target.querySelector('#pass2').value;\n  const _csrf = e.target.querySelector('#_csrf').value;\n  if (!username || !pass || !pass2) {\n    helper.signUpError('All fields are required!');\n    return false;\n  }\n  if (pass !== pass2) {\n    helper.signUpError('Passwords do not match');\n    return false;\n  }\n\n  // helper.sendPost(e.target.action, {username, pass, pass2, _csrf});\n  helper.signUpAccountPage(e.target.action, {\n    username,\n    pass,\n    pass2,\n    _csrf\n  });\n  return false;\n};\nconst LoginWindow = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"loginForm\",\n    name: \"loginForm\",\n    onSubmit: handleLogin,\n    action: \"/login\",\n    method: \"POST\",\n    className: \"mainForm\"\n  }, /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"username\"\n  }, \"Username: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"user\",\n    type: \"text\",\n    name: \"username\",\n    placeholder: \"username\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"pass\"\n  }, \"Password: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"pass\",\n    type: \"password\",\n    name: \"pass\",\n    placeholder: \"password\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"article\", {\n    id: \"loginMessage\",\n    className: \"hidden\"\n  }, \"Error\"), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"formSubmit\",\n    type: \"submit\",\n    value: \"Sign in\"\n  }));\n};\nconst SignupWindow = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"signupForm\",\n    name: \"signupForm\",\n    onSubmit: handleSignup,\n    action: \"/signup\",\n    method: \"POST\",\n    className: \"mainForm\"\n  }, /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"username\"\n  }, \"Username: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"user\",\n    type: \"text\",\n    name: \"username\",\n    placeholder: \"username\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"pass\"\n  }, \"Password: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"pass\",\n    type: \"password\",\n    name: \"pass\",\n    placeholder: \"password\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"pass2\"\n  }, \"Password: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"pass2\",\n    type: \"password\",\n    name: \"pass2\",\n    placeholder: \"retype password\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"article\", {\n    id: \"loginMessage\",\n    className: \"hidden\"\n  }, \"Error\"), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"formSubmit\",\n    type: \"submit\",\n    value: \"Sign Up\"\n  }));\n};\nconst init = async () => {\n  const response = await fetch('/getToken');\n  const data = await response.json();\n  const loginButton = document.getElementById('loginButton');\n  const signupButton = document.getElementById('signupButton');\n  loginButton.addEventListener('click', e => {\n    document.getElementById('bf').src = \"/assets/img/bf.png\";\n    document.getElementById('gf').src = \"/assets/img/gf.png\";\n    e.preventDefault();\n    ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {\n      csrf: data.csrfToken\n    }), document.getElementById('content'));\n    return false;\n  });\n  signupButton.addEventListener('click', e => {\n    document.getElementById('bf').src = \"/assets/img/bf.png\";\n    document.getElementById('gf').src = \"/assets/img/gf.png\";\n    e.preventDefault();\n    ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, {\n      csrf: data.csrfToken\n    }), document.getElementById('content'));\n    return false;\n  });\n  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {\n    csrf: data.csrfToken\n  }), document.getElementById('content'));\n};\nwindow.onload = init;\n\n//# sourceURL=webpack://Logins/./client/login.jsx?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client/login.jsx");
/******/ 	
/******/ })()
;