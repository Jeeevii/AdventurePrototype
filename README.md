# D3-Physics-Game

Sketch your level designs and summary screens with Google Slides.

Identify 2+ YouTube videos that provide a visual reference for the kind of motion or game 
mechanics you want to implement.

Identify 2+ Phaser code examples that will provide a code reference for what you will implement.

# Process requirements:

Your GitHub repository must show a history of incremental commits with useful commit messages, tracing back to an empty repository at the start.

Your README.md file describes:
Where to play your game (a link to your deployed game)

How your design satisfies the experience requirements below

How all of your data assets (if you have any) were created

# Gameplay/Experience requirements:

The game uses both continuous and discrete inputs from the player

The player’s goal can only be achieved indirectly (by allowing the physics engine to move key objects into position/contact).

3+ physics-based gameplay scenes (possibly implemented with a single Phaser Scene subclass).
Other scenes are used to separate and contextualize the gameplay scenes
=======
Code requirements:
- **4+ scenes based on `AdventureScene`**: satisfied (a lot of scenes)
- **2+ scenes *not* based on `AdventureScene`**: satisfied (i think?)
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: unsatisfied (name the method and explain the use of it).
    - Enhancement 2: unsatisfied (name the method and explain the use of it).

Experience requirements:
- **4+ locations in the game world**: satisfied (Bedroom, Attic, DownStairs, Hallway)
- **2+ interactive objects in most scenes**: satisfied (Attic Key, Knife)
- **Many objects have `pointerover` messages**: satisfied (All objects and scenes have pointerover)
- **Many objects have `pointerdown` effects**: satisfied (All objects and scenes have pointerdown)
- **Some objects are themselves animated**: satisfied (locked attic door, broken glass)

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by Jeevithan Mahenthran.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by Jeevithan Mahenthran.
- `main.js` was created by Jeevithan Mahenthran.
>>>>>>> f6086644a0db9896df122b601a5ed219bbd9ec02
