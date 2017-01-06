class DeathCollectibleScriptBehavior extends Sup.Behavior {
  dx : number = 0; dy : number = -1;
  paddle = null;
  gameManager = null;
  awake() {
    this.dx = (Math.random() * 2) - 1;
    this.dy = Math.random() * - 1;
    this.paddle = Sup.getActor("Paddle");
    this.gameManager = Sup.getActor("GameManager");
  }
  
  update() {
    this.actor.arcadeBody2D.setVelocity(BASESPEED*this.dx, BASESPEED*this.dy);
    if(Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.paddle.arcadeBody2D)) {
            this.actor.destroy();
            this.gameManager.getBehavior(GameManagerBehavior).loseBall();
       }
  }
}
Sup.registerBehavior(DeathCollectibleScriptBehavior);
