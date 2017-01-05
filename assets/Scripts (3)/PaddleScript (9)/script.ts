class PaddleScriptBehavior extends Sup.Behavior {
  padBody = this.actor.arcadeBody2D;
  speed : number = 0.1;
  ball = null;
  
  awake() {
    this.ball = Sup.getActor("Ball");
  }
  
  update() {

    //Contrôles au clavier
    let x : number = this.actor.getX() ; 
    if(Sup.Input.isKeyDown("D") && x < 2.35){
      this.padBody.setVelocityX(this.speed);
    }
   
    else if(Sup.Input.isKeyDown("Q") && x > -2.35){
      this.padBody.setVelocityX(-this.speed);
    }

    else{
      this.padBody.setVelocityX(0);
    }
    if(Sup.Input.isKeyDown("SPACE")){
      this.ball.getBehavior(BallScriptBehavior).startState = false;
    }
  }
}
Sup.registerBehavior(PaddleScriptBehavior);
