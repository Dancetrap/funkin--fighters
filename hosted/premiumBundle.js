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

/***/ "./client/premium.jsx":
/*!****************************!*\
  !*** ./client/premium.jsx ***!
  \****************************/
/***/ (() => {

eval("let account;\nlet premium;\nlet headercolor;\nlet bodycolor;\nconst init = async () => {\n  const acc = await fetch('/account');\n  account = await acc.json();\n  premium = Object.values(account)[0].premium;\n  headercolor = Object.values(account)[0].header;\n  bodycolor = Object.values(account)[0].body;\n  if (premium) {\n    const nav = document.querySelector('nav');\n    const buttons = document.querySelectorAll('button');\n    const links = document.querySelectorAll('a');\n    nav.style.backgroundColor = headercolor;\n    buttons.forEach(button => button.style.backgroundColor = headercolor);\n    links.forEach(a => a.style.backgroundColor = headercolor);\n  }\n};\nwindow.onload = init;\n\n//# sourceURL=webpack://Logins/./client/premium.jsx?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client/premium.jsx"]();
/******/ 	
/******/ })()
;