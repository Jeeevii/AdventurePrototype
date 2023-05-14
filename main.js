const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Start, Intro, Intro2, Bedroom, Hallway, Attic, Downstair, Frontdoor, Kitchen, Good, Bad],
    title: "Adventure Game - Jeevithan M",
});
