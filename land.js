goog.provide('gamegrump.Land');
goog.require('lime.Sprite');

/**
 * Land elements
 * 
 * @param {} gameObj
 */
gamegrump.Land = function(gameObj, playerObj, xpos, ypos) {
    goog.base(this);

    this.sprite = new lime.Sprite();
    this.appendChild(this.sprite);
    this.sprite.setAnchorPoint(0, 0);
    this.sprite.setSize(gameObj.tile_size,gameObj.tile_size);
    this.sprite.setFill('images/place.png');

    this.influenceLabel = new lime.Label();
    this.influenceLabel.setText("0").setPosition(gameObj.tile_size/2, gameObj.tile_size/3);
    this.appendChild(this.influenceLabel);

    this.happinessLabel = new lime.Label();
    this.happinessLabel.setText("0").setPosition(gameObj.tile_size/2, gameObj.tile_size/1.5);
    this.appendChild(this.happinessLabel);

    this.state = this.EMPTY;
    this.happiness = 0;
    this.happinessInfluence = 0;
    var land = this;
    goog.events.listen(this.sprite,['mousedown', 'touchstart'], function(e) {
        e.event.stopPropagation();        
        if(land.state == land.EMPTY && playerObj.money >= gameObj.costPlace) {
            //place land
            land.stand = playerObj.currentStand;
            land.state = land.PLACED;
            land.sprite.setFill('images/'+gameObj.stands[playerObj.currentStand].image);
            land.happiness = gameObj.stands[playerObj.currentStand].happiness;
            land.happinessLabel.setText(gameObj.stands[playerObj.currentStand].happiness).setFontColor('#00FF00'); 

            //update player money
            playerObj.money -= gameObj.costPlace;
            gameObj.updateMoney();

            for(var i=0; i < 3; i++){
                for(var j=0; j < 3; j++){
                    if(gameObj.activeStands[(xpos-1)+i] && gameObj.activeStands[(xpos-1)+i][(ypos-1)+j]){
                        var neighbor = gameObj.activeStands[(xpos-1)+i][(ypos-1)+j]
                        neighbor.happinessInfluence += gameObj.stands[land.stand].effect[i][j];
                        neighbor.influenceLabel.setText(gameObj.activeStands[xpos-1+i][ypos-1+j].happinessInfluence.toString()).setFontColor('#E8FC08');
                    }
                }
            }
        }
        /*else if(land.state == land.PLACED && playerObj.money >= gameObj.crops[playerObj.currentCrop].cost) {
        //plant
        land.setFill('images/growing.png');
        land.state = land.GROWING;

        //store crop and left time for it to be ready and to die
        land.crop = playerObj.currentCrop;
        land.ripeTime = gameObj.crops[playerObj.currentCrop].time_to_ripe * 1000;
        land.deathTime = gameObj.crops[playerObj.currentCrop].time_to_death * 1000;

        //update player money
        playerObj.money -= gameObj.crops[playerObj.currentCrop].cost;
        gameObj.updateMoney();
    	}
    	else if(land.state == land.READY ) {
        //harvest
        land.setFill('images/bare_land.png');
        land.state = land.EMPTY;

        //update player money
        playerObj.money += gameObj.crops[land.crop].revenue;
        gameObj.updateMoney();
    	}  */
    });
	//growing plants
	dt = 1000;
	lime.scheduleManager.scheduleWithDelay(function() {
        if(this.state == land.PLACED){
            this.happiness += this.happinessInfluence/10;
            if (this.happiness > 100){
                this.happiness = 100;
            }
            if (this.happiness < 0){
                this.happiness = 0;
            }
            this.happinessLabel.setText(Math.round(this.happiness).toString());
        }
	}, land, dt);
}

goog.inherits(gamegrump.Land,lime.Node);
//states
gamegrump.Land.prototype.EMPTY = 0;
gamegrump.Land.prototype.PLACED = 1;
gamegrump.Land.prototype.GROWING = 2;
gamegrump.Land.prototype.READY = 3;