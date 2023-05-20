class Level1 extends Phaser.Scene {
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
        this.add.image(400, 300, 'sky');
        this.hearts = [];
        this.health = 3;
        
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(655, 560, 'platform').setScale(0.5).refreshBody();
        this.platforms.create(450, 475, 'platform').setScale(0.4).refreshBody();
        this.platforms.create(250, 385, 'platform').setScale(0.4).refreshBody();
        this.platforms.create(450, 291, 'platform').setScale(0.4).refreshBody();
        this.platforms.create(650, 200, 'platform').setScale(0.4).refreshBody();
        
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
            this.scene.restart('JumperScene');
        }
        if (this.health <= 0) {
            this.scene.restart('JumperScene');
        }
    }

    handleCollision(player, platform) {
    }

    changeLevel() {
        this.scene.restart('JumperScene');
    }
}
