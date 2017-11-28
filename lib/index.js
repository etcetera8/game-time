const Platform = require('./Platform.js');

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
console.log(c);
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;


const mainPlatform = new Platform(0, 500, 800);
mainPlatform.draw(c);
