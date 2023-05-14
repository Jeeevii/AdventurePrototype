class Bedroom extends AdventureScene {
    constructor() {
        super("Bedroom", "The Bedroom");
    }

    onEnter() {

        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📝 NoteBook")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => this.showMessage("I think there was a knife at the attic somewhere hmmm.."))
        .on('pointerdown', () => {
            this.showMessage("No need to bring a NoteBook!");
            this.tweens.add({
                targets: clip,
                x: '+=' + this.s,
                repeat: 2,
                yoyo: true,
                ease: 'Sine.inOut',
                duration: 100
            });
        });

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 Key")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("Attic Key.")
        })
        .on('pointerdown', () => {
            this.showMessage("You picked up the Attic Key.");
            this.gainItem('key');
            this.tweens.add({
                targets: key,
                y: `-=${2 * this.s}`,
                alpha: { from: 1, to: 0 },
                duration: 500,
                onComplete: () => key.destroy()
            });
        })

        this.add.text(this.w * 0.1, this.w * 0.15, "🚪 Hallway door")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => { 
            this.showMessage("Go to Hallway?");
        })
        .on('pointerdown', () => { this.gotoScene('Hallway');
        }
        )

    }
}

class Hallway extends AdventureScene {
    constructor() {
        super("Hallway", "The Hallway");
    }
    onEnter() {
        this.add.text(this.w * 0.5, this.w * 0.3, "🚪Back to Bedroom")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("Let's go back to the bedroom?");
        })
        .on('pointerdown', () => {
            this.gotoScene('Bedroom');
        });

        let attic = this.add.text(this.w * 0.35, this.w * 0.1, "⬆️ Attic")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("Go to the Attic?");
        })
        .on('pointerdown', () => { 
            if (this.hasItem("key")) {this.gotoScene('Attic');
                //this.loseItem("key");
                this.showMessage("*squeak*");
                door.setText("⬆️ unlocked The Attic");
                //this.gotoScene('Attic');
            }
            else {
                this.showMessage("It's locked. Can you find the Attic Key?");
                this.tweens.add({
                    targets: attic,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            }
        })
        this.add.text(this.w * 0.1, this.w * 0.3, "⬇️ Downstairs")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("Let's go Downstairs?");
        })
        .on('pointerdown', () => {
            this.gotoScene('DownStair');
        });
    }
}
class Attic extends AdventureScene {
    constructor() {
        super("Attic", "The Attic");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "🚪Back to Hallway")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("Let's go back to the Hallway?");
        })
        .on('pointerdown', () => {
            this.gotoScene('Hallway');
        });
    }
}

class Downstair extends AdventureScene {
    constructor() {
        super("DownStair", "The Down Stairs");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.1, "⬆️ Back Up Stairs")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("Let's go back to the Upstairs?");
        })
        .on('pointerdown', () => {
            this.gotoScene('Hallway');
        });
        this.add.text(this.w * 0.1, this.w * 0.3, "🚪 Frontdoor")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("Let's go back to the Front Door?");
        })
        .on('pointerdown', () => {
            this.gotoScene('Frontdoor');
        });
        this.add.text(this.w * 0.5, this.w * 0.3, "🍽️ Kitchen")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("Let's go back to the Kitchen?");
        })
        .on('pointerdown', () => {
            this.gotoScene('Kitchen');
        });
    }
}

class Frontdoor extends AdventureScene {
    constructor() {
        super("Frontdoor", "The Front Door");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "go back")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("Let's go back?");
        })
        .on('pointerdown', () => {
            this.gotoScene('Downstair');
        });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage('*giggles*');
            this.tweens.add({
                targets: finish,
                x: this.s + (this.h - 2 * this.s) * Math.random(),
                y: this.s + (this.h - 2 * this.s) * Math.random(),
                ease: 'Sine.inOut',
                duration: 500
            });
        })
        .on('pointerdown', () => this.gotoScene('GD'));
    }
}

class Kitchen extends AdventureScene {
    constructor() {
        super("Kitchen", "The Kitchen");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "go back")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("Let's go back?");
        })
        .on('pointerdown', () => {
            this.gotoScene('Downstair');
        });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
            this.showMessage('*giggles*');
            this.tweens.add({
                targets: finish,
                x: this.s + (this.h - 2 * this.s) * Math.random(),
                y: this.s + (this.h - 2 * this.s) * Math.random(),
                ease: 'Sine.inOut',
                duration: 500
            });
        })
        .on('pointerdown', () => this.gotoScene('GD'));
    }
}
class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Bedroom'));
        });
    }
}

class GD extends Phaser.Scene {
    constructor() {
        super('GD');
    }
    create() {
        this.add.text(50, 50, "Good Ending!!! You defended yourself against the monster").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}
class BG extends Phaser.Scene {
    constructor() {
        super('BG');
    }
    create() {
        this.add.text(50, 50, "Bad Ending... You Died").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

