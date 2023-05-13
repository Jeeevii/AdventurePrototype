const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Bedroom, Hallway, Attic, Downstair, Frontdoor, Kitchen, GD, BG],
    title: "Adventure Game",
});
