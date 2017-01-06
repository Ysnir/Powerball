const BASESPEED : number = 0.05 ;
class BallScriptBehavior extends Sup.Behavior {
    speed : number = BASESPEED;
    startState :boolean = true;
    paddle = null;
    gameManager = null;
    score = 0;
    dx : number = 0; dy : number = 1;
    bricks = [];
    breakableBricks = [];
    
  awake() {
    this.paddle = Sup.getActor("Paddle");
    this.gameManager = Sup.getActor("GameManager");
  }
  
  //Callback method used to determine if a brick is colliding the ball.
  collidesWithBall(aBrick) {
    return Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, aBrick.arcadeBody2D);
  }
  
  update() {
    
    if(this.startState) {
      this.actor.arcadeBody2D.warpPosition(this.paddle.getX(), -2.5);
    } else {
    this.bricks = Sup.getActor("Levels").getChild(String(this.gameManager.getBehavior(GameManagerBehavior).currentLevel)).getChildren();
    this.breakableBricks = this.bricks.filter(function(element){return element.getName() !== "wall"});
    
    //We get the ball position.
    let x : number  = this.actor.getX(); let y : number  = this.actor.getY();
    
    //Then we get all bricks that are colliding with it.
    let collidedBricks = this.bricks.filter(this.collidesWithBall, this);
    
    //If there is any brick colliding we call the method corresponding to the brick and then we make the ball bounce.
    if(collidedBricks.length > 0) {
        for(let brick of collidedBricks) {
          if(brick.getName() === "brick") {
            brick.destroy();
            this.gameManager.getBehavior(GameManagerBehavior).scoreUp();
          }
        }
        this.dx = this.dx * -1;
        this.dy = this.dy * -1;
    }
      
    //If the level is finished
    if(this.breakableBricks.length === 0) {
      this.gameManager.getBehavior(GameManagerBehavior).isCurrentLevelFinished = true;
    }
    
    //Bouncing on the right and left side of the screen
    if(x > 2.85 || x < -2.85){
      this.dx = this.dx * -1;
    }
    
    //Bouncing on the upper side of the screen
    if(y > 2.4) {
      this.dy = this.dy * -1;
    }
    
    //Bouncing on the Paddle
    if(Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.paddle.arcadeBody2D)){
      let delta : number = 0;
      //If the ball hit the paddle we apply a slight change of direction proportional to distance from the hit point to the middle of the paddle.
      if(this.actor.getX() < this.paddle.getX()){
        delta = this.paddle.getX() - this.actor.getX();
        this.dx = -delta;
      }
      //same for the right side of the Paddle
      else if (this.actor.getX() > this.paddle.getLocalX()){
        delta = this.actor.getX() - this.paddle.getX();
        this.dx = delta;
      //If the ball hit the center of the Paddle we apply a random shift to avoid perpetual bouncing
      } else {
        this.dx = (Math.random() * 2) - 1;
      }
      //Then for each hit on the Paddle the ball accelerate
      this.speed += 0.01
      this.dy = this.dy * -1;
    }
    
    //If the ball is lost
    if(y < -3){
          this.gameManager.getBehavior(GameManagerBehavior).loseBall();
          this.actor.arcadeBody2D.warpPosition(this.paddle.getX(), -2.5);
          this.speed = BASESPEED;
      }
      this.actor.arcadeBody2D.setVelocity(this.speed*this.dx, this.speed*this.dy);
    }
  }  
}
Sup.registerBehavior(BallScriptBehavior);
