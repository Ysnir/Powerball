//WORK IN PROGRESS
class HighscoreScriptBehavior extends Sup.Behavior {
  highscores = [];
  
  awake() {
    //Sup.log(Sup.Storage.getJSON("highscores"));
    if(Sup.Storage.getJSON("highscores")){
      this.highscores = Sup.Storage.getJSON("highscores");
    }
    for(let i=0; i<5; i++) {
      Sup.getActor("HallOfFame").getChildren()[i].getChild("Name").textRenderer.setText(this.highscores[i].name);
      Sup.getActor("HallOfFame").getChildren()[i].getChild("Score").textRenderer.setText(this.highscores[i].score);
    }
  }

}
Sup.registerBehavior(HighscoreScriptBehavior);
