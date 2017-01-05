var ray : Sup.Math.Ray;

class SubmitButtonBehavior extends Sup.Behavior {
  isHover : boolean = false;
  submited : boolean = false;
  
  awake() {
    ray = new Sup.Math.Ray(this.actor.getPosition(), new Sup.Math.Vector3(0, 0, -1));
    Sup.getActor("Score").textRenderer.setText(Sup.Storage.get("TempScore"));
  }
  
  mouse(action) {
    if(!this.submited) {
      if(action == "click"){ 
      }
      else if(action == "hover"){
        Sup.getActor("Start").textRenderer.setColor(1, 0, 0);
      }
      else if(action == "unhover"){
        Sup.getActor("Start").textRenderer.setColor(1, 1, 1);
      }
    }
  }
  
  update() {
    ray.setFromCamera(Sup.getActor("Camera").camera, Sup.Input.getMousePosition());

    if(ray.intersectActor(this.actor, false).length > 0){
      if(!this.isHover){
        this.mouse("hover");
        this.isHover = true;
      }
      if(Sup.Input.wasMouseButtonJustPressed(0)){
        this.mouse("click")
      }
    }
    else if(this.isHover){
      this.isHover = false;
      this.mouse("unhover")
    }

  }
}
Sup.registerBehavior(SubmitButtonBehavior);