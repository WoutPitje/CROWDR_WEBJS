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

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ (() => {

eval("\r\nlet jsonString = localStorage.getItem('data');\r\nlet dataobject = JSON.parse(jsonString);\r\nconsole.log(dataobject);\r\n\r\nconst data = new Data(dataobject);\r\nlocalStorage.setItem('data', JSON.stringify(data));\r\n\r\nconst mainView = new MainView();\r\nconst navigationView = new NavigationView();\r\n\r\nconst mainController = new MainController(mainView);\r\nconst navigationController = new NavigationController(navigationView);\r\n\r\nmainView.init();\r\nnavigationView.init();\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://CROWDR_WEBJS/./app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./app.js"]();
/******/ 	
/******/ })()
;