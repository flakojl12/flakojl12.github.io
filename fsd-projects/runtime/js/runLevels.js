var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE

    function createSawBlade(x, y) {
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(
        hitZoneSize,
        damageFromObstacle
      );
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/sawblade.png");
      sawBladeHitZone.addChild(obstacleImage);
      obstacleImage.x = -25;
      obstacleImage.y = -25;
    }

    createSawBlade(400, 500);
    createSawBlade(600, 500);
    createSawBlade(800, 500);

    function createEnemy(x, y) {
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "red");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = x;
      enemy.y = y;

      game.addGameItem(enemy);

      enemy.velocityX = -1;
      enemy.rotationalVelocity = 1;
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-10);
      };
      enemy.onProjectileCollision = function () {
        game.increaseScore(100);
        enemy.fadeOut();
      };
    }

    createEnemy(700, 550);
    createEnemy(1000, 550);
    createEnemy(1500, 550);

    function createReward(x, y) {
      var reward = game.createGameItem("reward", 25);
      var rewardAppearance = draw.rect(50, 50, "blue");
      rewardAppearance.x = -25;
      rewardAppearance.y = -25;
      reward.addChild(rewardAppearance);
      reward.x = x;
      reward.y = y;

      game.addGameItem(reward);

      reward.onPlayerCollision = function () {
        game.increaseScore(500);
        reward.shrink();
      };
      reward.onProjectileCollision = function () {
        game.increaseScore(500);
        reward.shrink();
      };
    }

    createReward(100, 550);

    function createMarker(x, y) {
      var gameEndMarker = game.createGameItem("marker", 35);
      var markerAppearance = draw.rect(75, 75, "white");
      markerAppearance.x = -37.5;
      markerAppearance.y = -37.5;
      gameEndMarker.addChild(markerAppearance);
      gameEndMarker.x = x;
      gameEndMarker.y = y;

      game.addGameItem(gameEndMarker);

      gameEndMarker.onPlayerCollision = function () {
        game.increaseScore(1000);
        gameEndMarker.shrink();
        game.startLevel();
      };
      gameEndMarker.onProjectileCollision = function () {
        game.increaseScore(1000);
        gameEndMarker.shrink();
        game.startLevel();
      };
    }

    createMarker(1000, 550);

    function startLevel() {
      // TODO 13 goes below here

      var level = levelData[currentLevel];
      var levelObjects = level.gameItems;

      for (var i = 0; i < levelObjects.length; i++) {
        var obj = levelObjects[i];
        if (obj.type === "sawblade") {
          createSawBlade(obj.x, obj.y);
        } else if (obj.type === "enemy") {
          createEnemy(obj.x, obj.y);
        } else if (obj.type === "reward") {
          createReward(obj.x, obj.y);
        } else if (obj.type === "gameEndMarker") {
          createMarker(obj.x, obj.y);
        }
      }

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
