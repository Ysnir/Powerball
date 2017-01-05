class GameManagerBehavior extends Sup.Behavior {
  
  instance : GameManagerBehavior = null;
  playerLives : number = 3;
  playerScore : number = 0;
  public currentLevel  = 1;
  isCurrentLevelFinished = false;
  player = null;
  
  awake() {
    if(this.instance == null) {
      this.instance = this;
      this.player = Sup.getActor("Player");
    } else if(this.instance != this){
      this.destroy();
    }
  }

  update() {
    this.player.getChild("Lives").textRenderer.setText(this.playerLives);
    this.player.getChild("Score").textRenderer.setText(this.playerScore);
    if(this.isCurrentLevelFinished) {
      Sup.getActor("Levels").getChild(String(this.currentLevel)).destroy();
      this.currentLevel++;
      Sup.getActor("Levels").getChild(String(this.currentLevel)).setVisible(true);
      this.isCurrentLevelFinished = false;
      Sup.getActor("Ball").getBehavior(BallScriptBehavior).startState = true;
      Sup.getActor("Ball").getBehavior(BallScriptBehavior).speed = BASESPEED;
    }
  }
  
  public loseBall() {
    this.playerLives--;
    Sup.getActor("Ball").getBehavior(BallScriptBehavior).startState = true;
    if(this.playerLives < 0) {
      Sup.loadScene("GameOver");
      Sup.Storage.set("TempScore", String(this.playerScore));
    }
  } 
  
  public scoreUp(){
    this.playerScore += 10;
  }
}
Sup.registerBehavior(GameManagerBehavior);
