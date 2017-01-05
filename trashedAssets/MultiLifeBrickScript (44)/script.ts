class MultiLifeBrickScriptBehavior extends Sup.Behavior {

  update() {
    if(Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies())) {
        
    }
  }
}
Sup.registerBehavior(MultiLifeBrickScriptBehavior);
