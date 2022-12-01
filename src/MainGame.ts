import Phaser from "phaser";

export default class MainGame extends Phaser.Scene {
  constructor() {
    super("main-game");
  }

  preload() {
    this.load.atlas(
      "basicHero",
      "/src/assets/basic_hero.png",
      "/src/assets/basic_hero.json"
    );

    this.load.json("heroAnims", "src/assets/basic_hero.json");
  }

  create() {
    const heroAnims = this.cache.json.get("heroAnims");
    console.log(heroAnims);

    const createAnimations = (
      scene: any,
      jsonAtlas: any,
      rate: number,
      spriteName: string
    ) => {
      const nameCache = [];
      jsonAtlas.frames.map((frame: any, i: number) => {
        const keyName = frame.filename.slice(0, -3);
        nameCache.push([frame.filename, i]);

        this.anims.create({
          key: keyName,
          repeat: -1,
          frameRate: rate,
          frames: scene.anims.generateFrameNames(spriteName, {
            zeroPad: 2,
            prefix: keyName + "-",
            end: 3,
          }),
        });
      });
    };

    const { width, height } = this.scale;

    const basicHero: any = this.add
      .sprite(width * 0.5, height * 0.5, "basicHero")
      .setScale(3);

    createAnimations(this, heroAnims, 10, "basicHero");

    this.physics.add.existing(basicHero);
    basicHero.body.setCollideWorldBounds(true);

    const controls = this.input.keyboard.createCursorKeys();
    const camera = this.cameras.main;

    // basicHero.play("adventurer-attack2");
  }
}
