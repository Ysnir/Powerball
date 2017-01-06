class GrowPaddleCollectibleScriptBehavior extends Sup.Behavior {
  dx : number = 0; dy : number = -1;
  paddle = null;
  ball = null;
  awake() {
    this.dx = (Math.random() * 2) - 1;
    this.paddle = Sup.getActor("Paddle");
    this.ball = Sup.getActor("Ball");
  }
  
  update() {
    this.actor.arcadeBody2D.setVelocity(BASESPEED*this.dx, BASESPEED*this.dy);
    if(Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.paddle.arcadeBody2D)) {
            this.actor.destroy();
            let paddleSize = this.paddle.arcadeBody2D.getSize().width;
            if(paddleSize === 0.7) {
              this.paddle.spriteRenderer.setSprite("Sprites/LargePaddleSprite");
              this.paddle.arcadeBody2D.setSize(1.3, 0.2);
            } else if(paddleSize === 0.4) {
              this.paddle.spriteRenderer.setSprite("Sprites/PaddleSprite");
              this.paddle.arcadeBody2D.setSize(0.7, 0.2);
            }
       }
  }
}
Sup.registerBehavior(GrowPaddleCollectibleScriptBehavior);
