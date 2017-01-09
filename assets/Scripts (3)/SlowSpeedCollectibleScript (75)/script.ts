class SlowSpeedCollectibleScriptBehavior extends Sup.Behavior {
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
            this.ball.getBehavior(BallScriptBehavior).speed = 0.036;
       }
  }
}
Sup.registerBehavior(SlowSpeedCollectibleScriptBehavior);
