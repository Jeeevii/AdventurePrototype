class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(150,270, "You got lost exploring, find your way back home!!").setFontSize(20);
        this.add.text(300,300, "Click anywhere to continue.").setFontSize(15);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Level1'));

        });
    }
}

class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1");
    }
    player;
    platforms;
    door;
    cursors;

    preload() {
        this.load.image('sky', 'img/sky.png');
        this.load.image('platform', 'img/platform.png');
        this.load.spritesheet('dude', 'img/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('heart', 'img/star.png');    
    }

    create() {
        this.cameras.main.fadeIn(800, 255, 255, 255);
        this.add.image(400, 300, 'sky');
        this.add.text(50,150, "Use arrow keys to move!\nGet to Green Door for next level!").setFontSize(20);
        this.hearts = [];
        this.health = 3;
        
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(655, 560, 'platform').setScale(0.5).refreshBody();
        this.platforms.create(450, 475, 'platform').setScale(0.4).refreshBody();
        this.platforms.create(250, 385, 'platform').setScale(0.4).refreshBody();
        this.platforms.create(450, 291, 'platform').setScale(0.4).refreshBody();
        this.platforms.create(650, 200, 'platform').setScale(0.4).refreshBody();
        this.box = this.physics.add.sprite(700, 162, "box");
        this.physics.add.collider(this.box, this.platforms);
        this.box.setCollideWorldBounds(true);
        this.door = this.add.rectangle(700, 162, 45, 65, 0x00ff00); // door
        this.ground = this.add.rectangle(400, 590, 800, 15, "0xff0000"); 
        
        this.player = this.physics.add.sprite(655, 450, 'dude');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);

        for (let i = 0; i < this.health; i++) {
            const heart = this.add.sprite(30 + i * 40, 30, 'heart').setScale(0.5);
            this.hearts.push(heart);
        }

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, this.platforms, this.handleCollision, null, this);

        this.cameras.main.setBounds(0, 0, 800, 600);
        this.physics.world.setBounds(0, 0, 800, 600);
        this.cameras.main.startFollow(this.player, true);
        //this.physics.add.overlap(this.player, this.box, this.changeLevel, null, this);
    }

    update() {
        const { left, right, up } = this.cursors;

        if (left.isDown) {
            this.player.setVelocityX(-150);
            this.player.anims.play('left', true);
        }
        else if (right.isDown) {
            this.player.setVelocityX(150);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-235);
        }

        if (this.player.y > 570) {
            this.player.setPosition(655, 450);
            this.health -= 1;
            for (let i = 0; i < this.hearts.length; i++) {
                if (i < this.health) {
                    this.hearts[i].setVisible(true); 
                } else {
                    this.hearts[i].setVisible(false); 
                }
            }
        }
        /*
        if (this.player.x == this.door.x && this.player.y == this.door.y){
            this.scene.restart('JumperScene');
        }
        */
        if (this.physics.overlap(this.player, this.box)) {
            this.gotoScene('Level1End');
            //this.changeLevel();
        }
        if (this.health <= 0) {
            this.scene.restart();
        }
    }

    handleCollision(player, platform) {
    }

    changeLevel() {
        this.gotoScene('Level1End')
    }
}

class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2");
    }
    player;
    platforms;
    door;
    cursors;

    preload() {
        this.load.image('sky', 'img/sky.png');
        this.load.image('platform', 'img/platform.png');
        this.load.spritesheet('dude', 'img/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('heart', 'img/star.png');    
    }

    create() {
        this.cameras.main.fadeIn(800, 255, 255, 255);
        this.add.image(400, 300, 'sky');
        this.add.text(50,150, "Move box to get higher elevation").setFontSize(20);
        this.hearts = [];
        this.health = 3;
        
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(655, 560, 'platform').setScale(0.5).refreshBody();
        this.platforms.create(430, 475, 'platform').setScale(0.4).refreshBody();
        this.platforms.create(600, 385, 'platform').setScale(0.4).refreshBody();
        this.platforms.create(250, 350, 'platform').setScale(0.4).refreshBody();
        this.platforms.create(430, 240, 'platform').setScale(0.4).refreshBody();
        this.platforms.create(650, 150, 'platform').setScale(0.4).refreshBody();
        this.door = this.add.rectangle(700, 110, 45, 65, 0x00ff00); // door
        this.ground = this.add.rectangle(400, 590, 800, 15, "0xff0000"); 
        
        this.player = this.physics.add.sprite(655, 450, 'dude');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.box = this.physics.add.sprite(590, 350, 'box');
        this.box.setBounce(0.1);
        this.box.setCollideWorldBounds(true);
        this.box2 = this.physics.add.sprite(250, 300, 'box');
        this.box2.setBounce(0.1);
        this.box2.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms, this.handleCollision, null, this);
        this.physics.add.collider(this.player, this.box, this.pushBox, null, this);
        this.physics.add.collider(this.box, this.platforms); // Enable collision between box and platforms
      
        for (let i = 0; i < this.health; i++) {
            const heart = this.add.sprite(30 + i * 40, 30, 'heart').setScale(0.5);
            this.hearts.push(heart);
        }

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, this.platforms, this.handleCollision, null, this);
        this.physics.add.collider(this.box, this.platforms, this.handleCollision, null, this);
        this.physics.add.collider(this.player, this.box2, this.pushBox, null, this);
        this.physics.add.collider(this.box2, this.platforms);
        this.cameras.main.setBounds(0, 0, 800, 600);
        this.physics.world.setBounds(0, 0, 800, 600);
        this.cameras.main.startFollow(this.player, true);
        this.physics.add.overlap(this.player, this.door, this.changeLevel, null, this);
        
        
    }

    update() {
        const { left, right, up } = this.cursors;

        if (left.isDown) {
            this.player.setVelocityX(-150);
            this.player.anims.play('left', true);
        }
        else if (right.isDown) {
            this.player.setVelocityX(150);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-235);
        }

        if (this.player.y > 570) {
            this.player.setPosition(655, 450);
            this.health -= 1;
            for (let i = 0; i < this.hearts.length; i++) {
                if (i < this.health) {
                    this.hearts[i].setVisible(true); 
                } else {
                    this.hearts[i].setVisible(false); 
                }
            }
        }
        /*
        if (this.player.x == this.door.x && this.player.y == this.door.y){
            this.scene.restart('JumperScene');
        }
        */
        if (this.physics.overlap(this.player, this.door)) {
            console.log('Player and door are overlapping!');
            this.scene.changeLevel();
        }
        if (this.health <= 0) {
            this.scene.restart();
        }
    }
    pushBox(player, box) {
        if (player.body.touching.right && box.body.touching.left && box.body.onFloor() && player.body.velocity.x > 0) {
          box.body.setVelocityX(-50);
        } 
        else if (player.body.touching.left && box.body.touching.right && box.body.onFloor() && player.body.velocity.x < 0) {
          box.body.setVelocityX(50);
        } 
        else {
          box.body.setVelocityX(0);
        }
    }
    handleCollision(player, platform) {
    }

    changeLevel() {
        this.gotoScene('Outro')
    }
}

class Level1End extends Phaser.Scene {
    constructor() {
        super('Level1End')
    }
    create() {
        this.add.text(150,250, "You are 1 step closer to home, keep going!!").setFontSize(20);
        this.add.text(300,300, "Click anywhere to continue.").setFontSize(15);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Level2'));

        });
    }
}
class Outro extends Phaser.Scene {
    constructor() {
        super('outro')
    }
    create() {
        this.add.text(150,270, "You made it back!!!").setFontSize(20);
        this.add.text(300,300, "Click anywhere to restart").setFontSize(15);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Level1'));

        });
    }
}