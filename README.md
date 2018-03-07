# Joust Clone

(play the game)[joust-clone.surge.sh]

One of my favorite arcade games of all time is Joust. Something about the art direction, the physics, and simple yet fun gameplay made me want to recreate it. This was my first attempt at utilzing HTML5's canvas, working with sprites, and using a game loop to clear and redraw the screen.

This project also helped solidify my understanding of JavaScript object oriented programming. I made classes for players, enemies, and platforms and had them inherit properities from the game manager class. The game is two player, with player 1 using A-W-D to control their bird and player 2 using the arrow keys.

I had trouble finding adequate sprite images of the characters so please forgive the blockiness. The hardest part I found was mimicking the physics from Joust. 

The project is fully tested with Mocha and Chai and was built in two weeks with @NatBee

to run this project on your machine first clone the repo

'npm i'
'npm start' and navigate to localhost:8080
'npm t' to run the test suite
