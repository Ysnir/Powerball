const BASESPEED : number = 0.05 ;
class BallScriptBehavior extends Sup.Behavior {
    speed : number = BASESPEED;
    startState :boolean = true;
    paddle = null;
    gameManager = null;
    score = 0;
    dx : number = 0; dy : number = 1;
    bricks = [];
    
  awake() {
    this.paddle = Sup.getActor("Paddle");
    this.gameManager = Sup.getActor("GameManager");
  }
  
  //Fonction de callback pour déterminer quelle sont les brique en collision avec la balle.
  collidesWithBall(aBrick) {
    return Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, aBrick.arcadeBody2D);
  }
  
  update() {
    
    if(this.startState) {
      this.actor.arcadeBody2D.warpPosition(this.paddle.getX(), -2.5);
    } else {
    
    this.bricks = Sup.getActor("Levels").getChild(String(this.gameManager.getBehavior(GameManagerBehavior).currentLevel)).getChildren();
    
    //On récupère la position de la balle.
    let x : number  = this.actor.getX(); let y : number  = this.actor.getY();
    
    //On récupère toutes les briques en collisions avec la balle.
    let collidedBricks = this.bricks.filter(this.collidesWithBall, this);
    
    //Si il y a bien des brique en collision avec la balle on les détruit et on inverse sa trajectoire.
    if(collidedBricks.length > 0) {
        for(let brick of collidedBricks) {
          brick.destroy();
          this.gameManager.getBehavior(GameManagerBehavior).scoreUp();
        }
        this.dx = this.dx * -1;
        this.dy = this.dy * -1;
    }
      
    //Si le niveau est terminé
    if(this.bricks.length === 0) {
      this.gameManager.getBehavior(GameManagerBehavior).isCurrentLevelFinished = true;
    }
    
    //Rebond sur les bords droit et gauche de l'écran
    if(x > 2.85 || x < -2.85){
      this.dx = this.dx * -1;
    }
    
    //Rebond sur le bord superieur
    if(y > 2.4) {
      this.dy = this.dy * -1;
    }
    
    //Rebond sur la palette
    if(Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.paddle.arcadeBody2D)){
      let delta : number = 0;
      //si la balle touche le bord gauche de la palette on applique un décalage proportionnel à la différence au centre de la palette et à l'emplacement de la balle en X dans le rebond
      if(this.actor.getX() < this.paddle.getX()){
        delta = this.paddle.getX() - this.actor.getX();
        this.dx = -delta;
      }
      //idem pour le bord gauche
      else if (this.actor.getX() > this.paddle.getLocalX()){
        delta = this.actor.getX() - this.paddle.getX();
        this.dx = delta;
      //si la balle touche le centre on applique faible décalage aléatoire pour empécher les rebonds verticaux perpetuels
      } else {
        this.dx = (Math.random() * 2) - 1;
      }
      //enfin à chaque rebond sur la palette on accélère légèrement la balle.
      this.speed += 0.01
      this.dy = this.dy * -1;
    }
    
    //Perte de la balle
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
