class JumperScene extends Phaser.Scene {
    player;
    platforms;
    door;
    movingBox;
    cursors;

    preload() {
        this.load.image('sky', 'img/sky.png');
        this.load.image('platform', 'img/platform.png');
        this.load.spritesheet('dude', 'img/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.add.image(400, 300, 'sky');

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'platform').setScale(0.5).refreshBody();
        this.platforms.create(300, 400, 'platform').setScale(0.3).refreshBody();
        this.platforms.create(500, 350, 'platform').setScale(0.3).refreshBody();
        this.platforms.create(200, 250, 'platform').setScale(0.3).refreshBody();
        this.platforms.create(600, 200, 'platform').setScale(0.3).refreshBody();
        this.platforms.create(400, 100, 'platform').setScale(0.4).refreshBody();

        this.movingBox = this.physics.add.image(200, 200, 'platform').setScale(0.2);
        this.movingBox.setImmovable(true);

        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

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

        this.door = this.add.rectangle(750, 70, 50, 70, 0x00ff00);
        this.physics.add.overlap(this.player, this.door, this.changeLevel, null, this);
    }

    update() {
        const { left, right, up } = this.cursors;
    
        if (left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
    
        if (up.isDown) {
            this.player.setVelocityY(-330);
        }
    
        if (this.player.y > 600) {
            this.resetScene();
        }
    
        this.moveBox();
    }
    

    handleCollision(player, platform) {
        if (platform === this.movingBox) {
            this.movingBox.setVelocityX(player.body.velocity.x);
        }
    }

    moveBox() {
        if (this.player.body.touching.down && Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.movingBox.setVelocityY(-100);
        }
    }

    changeLevel() {
        // Reset any state or timers if needed
        this.scene.start('NextLevelScene');
    }

    resetScene() {
        // Reset any state or timers if needed
        this.scene.restart();
    }
}
