//set main namespace 
goog.provide('gamegrump');   
//get requirements 
goog.require('lime.Director'); 
goog.require('lime.Scene'); 
goog.require('lime.Layer');
goog.require('lime.GlossyButton');
goog.require('gamegrump.Land')    

//entrypoint 
gamegrump.start = function(){     

    //game object
    var gameObj = {
        width: 320,
        height: 480,
        timerstart: false,
        time: 180,
        currentLevel: 0,
        tile_size: 64,
        num_tiles_x: 5,
        num_tiles_y: 6,
        landLayer_w: 64*5, 
        landLayer_h: 64*6,
        controlsLayer_w: 64*5,
        controlsLayer_h: 64*1.5,
        //costPlace: 5,

        //stand shop
        stand_margin_x: 10,
        stand_margin_y: 20
    }

    var playerObj = {
        money: 300,
        currentStand: -1             
    }

    gameObj.stands = [
    {
        name: 'redtopplus',
        effect: [
            [ 0, -1,  0],
            [ 1,  0,  1],
            [ 0,  1,  0]
        ],
        image: 'redtopplus.png'
    },
    {
        name: 'redleftplus',
        effect: [
            [ 0,  1,  0],
            [-1,  0,  1],
            [ 0,  1,  0]
        ],
        image: 'redleftplus.png'
    },
    {
        name: 'redbottomplus',
        effect: [
            [ 0,  1,  0],
            [ 1,  0,  1],
            [ 0, -1,  0]
        ],
        image: 'redbottomplus.png'
    },
    {
        name: 'redrightplus',
        effect: [
            [ 0,  1,  0],
            [ 1,  0, -1],
            [ 0,  1,  0]
        ],
        image: 'redrightplus.png'
    },
    {
        name: 'empty',
        effect: [
            [ 0,  0,  0],
            [ 0,  0,  0],
            [ 0,  0,  0]
        ],
        image: 'place.png'
    },
    {
        name: 'redbotright',
        effect: [
            [ 0,  0,  0],
            [ 0,  0, -1],
            [ 0, -1,  0]
        ],
        image: 'redbotright.png'
    },
    {
        name: 'redbotleft',
        effect: [
            [ 0,  0,  0],
            [-1,  0,  0],
            [ 0, -1,  0]
        ],
        image: 'redbotleft.png'
    },
    {
        name: 'redlefttop',
        effect: [
            [ 0, -1,  0],
            [-1,  0,  0],
            [ 0,  0,  0]
        ],
        image: 'redlefttop.png'
    },
    {
        name: 'redrighttop',
        effect: [
            [ 0, -1,  0],
            [ 0,  0, -1],
            [ 0,  0,  0]
        ],
        image: 'redrighttop.png'
    },    
    {
        name: 'happy',
        effect: [
            [ 1,  1,  1],
            [ 1,  0,  1],
            [ 1,  1,  1]
        ],
        image: 'happy.png'
    },
    {
        name: 'evil',
        effect: [
            [-1, -1, -1],
            [-1,  0, -1],
            [-1, -1, -1]
        ],
        image: 'evil.png'
    },
    {
        name: 'x',
        effect: [
            [ 1, -1,  1],
            [-1,  0, -1],
            [ 1, -1,  1]
        ],
        image: 'x.png'
    },
    {
        name: 'plus',
        effect: [
            [-1,  1, -1],
            [ 1,  0,  1],
            [-1,  1, -1]
        ],
        image: 'plus.png'
    }
];

    gameObj.levels = [
    {
        stands: [{x: 0, y: 1, stand: 5},{x: 2, y: 1, stand: 4},{x: 3, y: 1, stand: 6}, {x: 1, y: 1, stand: 4}, {x: 3, y: 2, stand: 4}, {x: 3, y: 3, stand: 4}, {x: 3, y: 4, stand: 7}, {x: 2, y: 4, stand: 4}, {x: 1, y: 4, stand: 4}, {x: 0, y: 4, stand: 8}, {x: 0, y: 3, stand: 4}, {x: 0, y: 2, stand: 4}, {x: 1, y: 3, stand: 3}],
        queue: ['1', '1', '1', '0', '1', '1', '1', '1', '1', '1', '1'],
        blocked: [{x: 0, y: 0},{x:1, y: 0},{x:2, y: 0},{x:3, y: 0},{x:4, y: 0},{x:4, y: 1},{x:4, y: 2},{x:4, y: 3},{x:4, y: 4},{x:4, y: 5},{x:3, y: 5},{x:2, y: 5},{x:1, y: 5},{x:0, y: 5}]
    },
    {
        stands: [{x: 2, y: 5, stand: 1},{x: 4, y: 4, stand: 2},{x: 3, y: 3, stand: 1}, {x: 1, y: 1, stand: 0}, {x: 2, y: 2, stand: 3}],
        queue: ['0', '1', '1', '2'],
        blocked: [{x:0, y: 0}]        
    },
    {
        stands: [{x: 2, y: 4, stand: 3},{x: 1, y: 3, stand: 2},{x: 3, y: 3, stand: 1}, {x: 1, y: 1, stand: 0}, {x: 2, y: 2, stand: 3}],
        queue: ['2', '1', '1', '0'],
        blocked: [{x: 0, y: 0},{x:1, y: 2}]
    },
    {
        stands: [{x: 2, y: 4, stand: 3},{x: 1, y: 3, stand: 2},{x: 3, y: 3, stand: 1}, {x: 1, y: 1, stand: 0}, {x: 2, y: 2, stand: 3}],
        queue: ['2', '1', '1', '0'],
        blocked: [{x: 0, y: 0},{x:1, y: 2}]
    },
    {
        stands: [{x: 2, y: 4, stand: 3},{x: 1, y: 3, stand: 2},{x: 3, y: 3, stand: 1}, {x: 1, y: 1, stand: 0}, {x: 2, y: 2, stand: 3}],
        queue: ['2', '1', '1', '0'],
        blocked: [{x: 0, y: 0},{x:1, y: 2}]
    },
    {
        stands: [{x: 2, y: 4, stand: 3},{x: 1, y: 3, stand: 2},{x: 3, y: 3, stand: 1}, {x: 1, y: 1, stand: 0}, {x: 2, y: 2, stand: 3}],
        queue: ['2', '1', '1', '0'],
        blocked: [{x: 0, y: 0},{x:1, y: 2}]
    },
    {
        stands: [{x: 2, y: 4, stand: 3},{x: 1, y: 3, stand: 2},{x: 3, y: 3, stand: 1}, {x: 1, y: 1, stand: 0}, {x: 2, y: 2, stand: 3}],
        queue: ['2', '1', '1', '0'],
        blocked: [{x: 0, y: 0},{x:1, y: 2}]
    }
];

    var director = new lime.Director(document.body,gameObj.width,gameObj.height);     
    director.makeMobileWebAppCapable();     
    director.setDisplayFPS(false);        

    var gameScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    var landLayer = new lime.Layer().setAnchorPoint(0, 0);
    var hudLayer = new lime.Layer().setAnchorPoint(0, 0);
    var controlsLayer = new lime.Layer().setAnchorPoint(0, 0);
    var standsLayer = new lime.Layer().setAnchorPoint(0, 0);

    gameScene.appendChild(landLayer);
    gameScene.appendChild(controlsLayer);
    gameScene.appendChild(hudLayer);
    gameScene.appendChild(standsLayer);

    //controls area
    var controlArea = new lime.Sprite().setAnchorPoint(0,0)
        .setPosition(0, gameObj.height-gameObj.controlsLayer_h)
        .setSize(gameObj.controlsLayer_w, gameObj.controlsLayer_h)
        .setFill('#0D0D0D')
    controlsLayer.appendChild(controlArea);
    var returnButton = new lime.GlossyButton().setColor('#151B8D').setText('Level Select').setPosition(gameObj.width/2, gameObj.height -10).setSize(110, 20);
    controlsLayer.appendChild(returnButton);

    goog.events.listen(returnButton,['mousedown', 'touchstart'], function(e) {
        //gameObj.startLevel();
        director.replaceScene(menuScene);
    });

    //current stand
    /*var standSprite = new lime.Sprite().setAnchorPoint(0,0)
        .setPosition(gameObj.controlsLayer_w-210, gameObj.height-gameObj.controlsLayer_h/1.2)
        .setSize(gameObj.tile_size,gameObj.tile_size)
    controlsLayer.appendChild(standSprite);*/

//stand button
    /*var standButton = new lime.GlossyButton().setColor('#133242').setText('Stands')
        .setPosition(60, gameObj.height-gameObj.controlsLayer_h/2)
        .setSize(80, 40);
    controlsLayer.appendChild(standButton);*/ 

//money
    /*var moneyLabel = new lime.Label().setText('$'+playerObj.money).setFontColor('#E8FC08')
        .setPosition(gameObj.controlsLayer_w-50, gameObj.height-gameObj.controlsLayer_h/2);
    controlsLayer.appendChild(moneyLabel);*/ 

//time
    /*var timeLabel = new lime.Label().setText(gameObj.time).setFontColor('#00FF00')
        .setFontSize(85).setPosition(gameObj.controlsLayer_w-75, gameObj.height-gameObj.controlsLayer_h/2.1);
    controlsLayer.appendChild(timeLabel);*/

//updating money indicator
    /*gameObj.updateMoney = function() {
        moneyLabel.setText('$'+playerObj.money);
    };*/

//reset
    gameObj.startLevel = function() {
        //gameObj.time = 180;
        gameObj.activeStands = [];
        gameObj.activeQueue = [];
//create land elements
        landLayer.removeAllChildren();
        for(var i=0; i<gameObj.num_tiles_x; i++) gameObj.activeStands.push([]);

        for(var i=0; i<gameObj.num_tiles_x; i++) {
            for(var j=0; j<gameObj.num_tiles_y; j++) {
                var landElement = new gamegrump.Land(gameObj, playerObj, i, j).setPosition(i*gameObj.tile_size, j*gameObj.tile_size);
                landLayer.appendChild(landElement);
                gameObj.activeStands[i][j] = landElement;
                for (var k=0; k<gameObj.levels[gameObj.currentLevel].blocked.length; k++){
                    if(gameObj.levels[gameObj.currentLevel].blocked[k].x == i && gameObj.levels[gameObj.currentLevel].blocked[k].y == j){
                        gameObj.activeStands[i][j].blocked();
                    }
                }
            }
        }
        for (var i=0; i<gameObj.levels[gameObj.currentLevel].stands.length; i++){
            gameObj.activeStands[gameObj.levels[gameObj.currentLevel].stands[i].x][gameObj.levels[gameObj.currentLevel].stands[i].y].Start(gameObj.levels[gameObj.currentLevel].stands[i].stand);
        }
        gameObj.activeQueue = gameObj.levels[gameObj.currentLevel].queue.slice(0);
        //gameObj.timerstart = true;
        gameObj.standArea();
    };

    gameObj.standArea = function() {
        standsLayer.removeAllChildren();
        for(var i=0; i<gameObj.levels[gameObj.currentLevel].queue.length; i++) {
            var item = new lime.Sprite().setAnchorPoint(0,0).setPosition(gameObj.stand_margin_x + 8 + (gameObj.stand_margin_x + gameObj.tile_size/2)*(i%7), gameObj.height*(Math.floor((i+7)/7))*.07 + 355).setFill('images/'+gameObj.stands[i].image).setSize(gameObj.tile_size/2, gameObj.tile_size/2);
            item.label = new lime.Label().setAnchorPoint(0,0).setPosition(gameObj.stand_margin_x + 20 + (gameObj.stand_margin_x + gameObj.tile_size/2)*(i%7), gameObj.height*(Math.floor((i+7)/7))*.07 + 362).setFontColor('#FFFFFF').setText(gameObj.activeQueue[i]).setFontSize(15);

            /*if (playerObj.currentStand == i){
                itemLabel.setFontColor('#FFFF00');
            }*/
            standsLayer.appendChild(item);
            standsLayer.appendChild(item.label);
                /*var costLabel = new lime.Label().setText('cost: $'+gameObj.stands[i].cost).setFontColor('#E8FC08').setPosition(gameObj.stand_margin_x+150, gameObj.stand_margin_y*2.5 + (gameObj.stand_margin_y + gameObj.tile_size)*i);
                standLayer.appendChild(costLabel);
                var label = new lime.Label().setText('revenue: $'+gameObj.stands[i].revenue).setFontColor('#E8FC08').setPosition(gameObj.stand_margin_x+150, gameObj.stand_margin_y*3.4 + (gameObj.stand_margin_y + gameObj.tile_size)*i);
                standLayer.appendChild(label);*/

            //pick Stand
            (function(item, i) {
                goog.events.listen(item,['mousedown', 'touchstart'], function(e) {
                    if (gameObj.activeQueue[i] > 0){
                        playerObj.currentStand = i;
                        e.targetObject.label.setFontColor('#FFFF00');
                        //standSprite.setFill('images/'+gameObj.stands[gameObj.activeQueue[i]].image);
                        //director.replaceScene(gameScene);
                    }
                });
            })(item, i);
            /*var item = new lime.Sprite().setAnchorPoint(0,0).setPosition(gameObj.stand_margin_x + (gameObj.stand_margin_x + gameObj.tile_size)*i, gameObj.height-gameObj.controlsLayer_h/1.2).setFill('#0D0D0D').setSize(gameObj.tile_size, gameObj.tile_size);
            controlsLayer.appendChild(item);*/
        }

    }

    gameObj.removeQueue = function(a){
        //var newqueue = [];
        //var k = 0;
        gameObj.activeQueue[a]= gameObj.activeQueue[a]-1;
        playerObj.currentStand = '-1';
        /*for (var i=0; i<gameObj.activeQueue.length; i++){
            if (a == gameObj.activeQueue[i]){
                for (var j=0; j<gameObj.activeQueue.length; j++){
                    if (j != i){
                        newqueue[k] = gameObj.activeQueue[j];
                        k++;
                    }
                }
                gameObj.activeQueue = newqueue.slice(0);
                break;
            }
        }
        for (var i=0; i<=gameObj.activeQueue.length; i++){
            if (a==gameObj.activeQueue[i]){
                break;
            }
            if (i>=gameObj.activeQueue.length){
                //standSprite.setFill('images/blanksquare.png');
                playerObj.currentStand = '';
            }
        }*/
        gameObj.standArea();
    }

    gameObj.addQueue = function(a){
        gameObj.activeQueue[a] = gameObj.activeQueue[a] + 1;
        gameObj.standArea();
        playerObj.currentStand = '-1';
    }

    //win scene
    var winScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    var winLayer = new lime.Layer().setAnchorPoint(0, 0);

    var winBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0).setSize(gameObj.width, gameObj.height).setFill('images/GrumpsBG.png');
    winLayer.appendChild(winBackground);
    winScene.appendChild(winLayer);

    var nextButton = new lime.GlossyButton().setColor('#151B8D').setText('Next').setPosition(gameObj.width/2, gameObj.height-120).setSize(80, 40);
    var selectButton = new lime.GlossyButton().setColor('#151B8D').setText('Level Select').setPosition(gameObj.width/2, gameObj.height-60).setSize(110, 40);
    var winTitle = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,75).setSize(320,240).setFill('images/tenouttaten.png');
    winLayer.appendChild(winTitle);
    winLayer.appendChild(nextButton);
    winLayer.appendChild(selectButton);

    goog.events.listen(nextButton,['mousedown', 'touchstart'], function(e) {
        gameObj.startLevel();
        director.replaceScene(gameScene);
    });

    goog.events.listen(selectButton,['mousedown', 'touchstart'], function(e){
        director.replaceScene(menuScene);
    })

    gameObj.win = function(){
        gameObj.timerstart=false;
        gameObj.currentLevel++;
        director.replaceScene(winScene);
    }

    //lose scene
    var loseScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    var loseLayer = new lime.Layer().setAnchorPoint(0, 0);

    var loseBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0).setSize(gameObj.width, gameObj.height).setFill('images/GrumpsBG.png');
    loseLayer.appendChild(loseBackground);
    loseScene.appendChild(loseLayer);

    var restartButton = new lime.GlossyButton().setColor('#151B8D').setText('Try Again').setPosition(gameObj.width/2, gameObj.height-120).setSize(80, 40);
    var loseTitle = new lime.Label();
    loseTitle.setText("You were killed by a paralyzed Taillow!").setPosition(gameObj.width/2, gameObj.height-320);
    loseLayer.appendChild(loseTitle);
    loseLayer.appendChild(restartButton);

    goog.events.listen(restartButton,['mousedown', 'touchstart'], function(e) {
        gameObj.startLevel();
        director.replaceScene(gameScene);
    });

    gameObj.lose = function(){
        director.replaceScene(loseScene);
    }

    //menu scene
    var menuScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    var menuLayer = new lime.Layer().setAnchorPoint(0, 0);

    var menuBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0).setSize(gameObj.width, gameObj.height).setFill('images/GrumpsBG.png');
    menuLayer.appendChild(menuBackground);
    menuScene.appendChild(menuLayer);

    for (i=0; i<gameObj.levels.length; i++){
        var levelButton = new lime.GlossyButton().setColor('#151B8D').setText('Level '+ (i+1)).setPosition(60 + 100*(i%3), 50 + (gameObj.height-380)*(Math.floor(i/3)*.5)).setSize(80, 40);
        menuLayer.appendChild(levelButton);   
        (function(levelButton, i) {
            goog.events.listen(levelButton,['mousedown', 'touchstart'], function(e) {
                gameObj.currentLevel = i;
                gameObj.startLevel();
                director.replaceScene(gameScene);
            });
        })(levelButton, i)
    }
    //director.replaceScene(gameScene);

    //start screen
    var startScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    var startLayer = new lime.Layer().setAnchorPoint(0, 0);

    var startBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0).setSize(gameObj.width, gameObj.height).setFill('images/GrumpsBG.png');
    startLayer.appendChild(startBackground);
    startScene.appendChild(startLayer);

    var startButton = new lime.GlossyButton().setColor('#151B8D').setText('Start').setPosition(gameObj.width/2, gameObj.height-120).setSize(80, 40);
    var startTitle = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,75).setSize(320, 240).setFill('images/title_logo.png');
    startLayer.appendChild(startTitle);
    startLayer.appendChild(startButton);

    goog.events.listen(startButton,['mousedown', 'touchstart'], function(e) {
        //gameObj.startLevel();
        director.replaceScene(menuScene);
    });

    director.replaceScene(startScene);

    //stand store
    /*var standScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    var standLayer = new lime.Layer().setAnchorPoint(0, 0);

    var standBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0).setSize(gameObj.width, gameObj.height).setFill('#0D0D0D');
    standLayer.appendChild(standBackground);
    standScene.appendChild(standLayer);

    //close button
    var closeButton = new lime.GlossyButton().setColor('#133242').setText('Back').setPosition(gameObj.width/2, gameObj.height-25).setSize(80, 40);
    standLayer.appendChild(closeButton);

    //launch stand event
    goog.events.listen(standButton,['mousedown', 'touchstart'], function(e) {
        gameObj.openShop();
        director.replaceScene(standScene);
    });

    //close stand event
    goog.events.listen(closeButton,['mousedown', 'touchstart'], function(e) {
        director.replaceScene(gameScene);
    });

    /*dt = 50;
    lime.scheduleManager.scheduleWithDelay(function() {
        if (gameObj.timerstart == true){
            if (gameObj.time >= 1){
                gameObj.time = gameObj.time - 1;
            }
            if(gameObj.time == 0){
                gameObj.timerstart = false;
                gameObj.lose();
            }
            else if (gameObj.time < 30){
                timeLabel.setText(gameObj.time).setFontColor('#FF0000');
            }
            else if (gameObj.time < 100){
                timeLabel.setText(gameObj.time).setFontColor('#E8FC08');    
            }
            else {
                timeLabel.setText(gameObj.time);
            }
        }
    }, gameObj, dt);*/ 
    //stand items
    /*gameObj.openShop = function(){
        for(var i=0; i<gameObj.levels[gameObj.currentLevel].queue.length; i++) {
            if (gameObj.activeQueue[i]){
                var item = new lime.Sprite().setAnchorPoint(0,0).setPosition(gameObj.stand_margin_x, gameObj.stand_margin_y + (gameObj.stand_margin_y + gameObj.tile_size)*i).setFill('images/'+gameObj.stands[gameObj.activeQueue[i]].image).setSize(gameObj.tile_size, gameObj.tile_size);
                standLayer.appendChild(item);
                /*var costLabel = new lime.Label().setText('cost: $'+gameObj.stands[i].cost).setFontColor('#E8FC08').setPosition(gameObj.stand_margin_x+150, gameObj.stand_margin_y*2.5 + (gameObj.stand_margin_y + gameObj.tile_size)*i);
                standLayer.appendChild(costLabel);
                var label = new lime.Label().setText('revenue: $'+gameObj.stands[i].revenue).setFontColor('#E8FC08').setPosition(gameObj.stand_margin_x+150, gameObj.stand_margin_y*3.4 + (gameObj.stand_margin_y + gameObj.tile_size)*i);
                standLayer.appendChild(label);*/

            //pick Stand
                /*(function(item, i) {
                    goog.events.listen(item,['mousedown', 'touchstart'], function(e) {
                        playerObj.currentStand = gameObj.activeQueue[i];
                        standSprite.setFill('images/'+gameObj.stands[gameObj.activeQueue[i]].image);
                        director.replaceScene(gameScene);
                    });
                })(item, i);
            
            else{
                var item = new lime.Sprite().setAnchorPoint(0,0).setPosition(gameObj.stand_margin_x, gameObj.stand_margin_y + (gameObj.stand_margin_y + gameObj.tile_size)*i).setFill('#0D0D0D').setSize(gameObj.tile_size, gameObj.tile_size);
                standLayer.appendChild(item);
            }
        }
    }*/
}