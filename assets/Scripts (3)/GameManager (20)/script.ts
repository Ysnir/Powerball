class GameManagerBehavior extends Sup.Behavior {
  
  instance : GameManagerBehavior = null;
  playerLives : number = 5;
  playerScore : number = 0;
  public currentLevel  = 0;
  public maxLevel = 5;
  public collectibleSpawnRate = 0.5;
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
      if(this.currentLevel !== this.maxLevel) {
        Sup.getActor("Levels").getChild(String(this.currentLevel)).setVisible(true);
        this.isCurrentLevelFinished = false;
        Sup.getActor("Ball").getBehavior(BallScriptBehavior).startState = true;
        Sup.getActor("Ball").getBehavior(BallScriptBehavior).speed = BASESPEED;
      } else {
        this.gameOver();
      }
    }
  }
  
  public generateCollectible() {
    if(Math.random() >= this.collectibleSpawnRate) {
      switch(Math.floor((Math.random() * 2) + 1)) {
        case 1:
          Sup.appendScene("Prefabs/DeathCollectible");
          break;
        case 2:
          Sup.appendScene("Prefabs/FastSpeedCollectible");
          break;
      }
    }
  }
  
  public loseBall() {
    this.playerLives--;
    Sup.getActor("Ball").getBehavior(BallScriptBehavior).startState = true;
    if(this.playerLives < 0) {
      this.gameOver();
    }
  }
  
  public gameOver() {
      Sup.Storage.set("TempScore", String(this.playerScore));
      Sup.loadScene("GameOver");
  }
  
  public scoreUp(){
    this.playerScore += 10;
  }
}
Sup.registerBehavior(GameManagerBehavior);
