var ray : Sup.Math.Ray;

class MenuButtonBehavior extends Sup.Behavior {
  isHover : boolean = false;

  awake() {
    ray = new Sup.Math.Ray(this.actor.getPosition(), new Sup.Math.Vector3(0, 0, -1));
  }
  
  mouse(action) {
    if(action == "click"){
      Sup.loadScene("Menu");
    }
    else if(action == "hover"){
      Sup.getActor("MainMenu").textRenderer.setColor(1, 0, 0);
    }
    else if(action == "unhover"){
      Sup.getActor("MainMenu").textRenderer.setColor(1, 1, 1);
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
Sup.registerBehavior(MenuButtonBehavior);