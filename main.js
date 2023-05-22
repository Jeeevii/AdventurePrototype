const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Intro, Level1, Level2, Level3, Level1End, Level2End, Outro],
    title: "Adventure Game - Jeevithan M",
};

const game = new Phaser.Game(config);