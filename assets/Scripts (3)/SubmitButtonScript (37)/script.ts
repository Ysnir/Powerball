var ray : Sup.Math.Ray;
//WORK IN PROGRESS
class SubmitButtonBehavior extends Sup.Behavior {
  isHover : boolean = false;

  highscores = [];
  
  awake() {
    ray = new Sup.Math.Ray(this.actor.getPosition(), new Sup.Math.Vector3(0, 0, -1));
    Sup.getActor("Score").textRenderer.setText(Sup.Storage.get("TempScore"));
    if(Sup.Storage.getJSON("highscores")){
      this.highscores = Sup.Storage.getJSON("highscores");
    }
  }
  
  mouse(action) {
      if(action == "click"){
        let challengerName = Sup.getActor("NameField").textRenderer.getText();
        for(let i=0; i<this.highscores.length; i++) {
          if(this.highscores[i].score < Sup.Storage.get("TempScore")) {
            this.highscores.splice(i, 0, {name: challengerName, score:Sup.Storage.get("TempScore")});
            this.highscores.pop();
            break;
          }
        }
        Sup.Storage.setJSON("highscores", this.highscores);
        Sup.Storage.remove("TempScore");
        Sup.loadScene("Highscores");
      }
      else if(action == "hover"){
        Sup.getActor("Submit").textRenderer.setColor(1, 0, 0);
      }
      else if(action == "unhover"){
        Sup.getActor("Submit").textRenderer.setColor(1, 1, 1);
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