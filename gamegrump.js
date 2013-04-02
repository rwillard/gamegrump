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
        tile_size: 64,
        num_tiles_x: 5,
        num_tiles_y: 6,
        landLayer_w: 64*5, 
        landLayer_h: 64*6,
        controlsLayer_w: 64*5,
        controlsLayer_h: 64*1.5,
        costPlace: 5,

        //stand shop
        stand_margin_x: 50,
        stand_margin_y: 20
    }

    var playerObj = {
        money: 300,
        currentStand: 0             
    }

    gameObj.stands = [
    {
        name: 'happy',
        effect: [
            [ 1,  1,  1],
            [ 1,  0,  1],
            [ 1,  1,  1]
        ],
        image: 'happy.png',
        happiness: 50
    },
    {
        name: 'evil',
        effect: [
            [-1, -1, -1],
            [-1,  0, -1],
            [-1, -1, -1]
        ],
        image: 'evil.png',
        happiness: 50
    },
    {
        name: 'x',
        effect: [
            [ 1, -1,  1],
            [-1,  0, -1],
            [ 1, -1,  1]
        ],
        image: 'x.png',
        happiness: 50
    },
    {
        name: 'plus',
        effect: [
            [-1,  1, -1],
            [ 1,  0,  1],
            [-1,  1, -1]
        ],
        image: 'plus.png',
        happiness: 50
    },
];

    var director = new lime.Director(document.body,gameObj.width,gameObj.height);     
    director.makeMobileWebAppCapable();     
    director.setDisplayFPS(false);        

    var gameScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    var landLayer = new lime.Layer().setAnchorPoint(0, 0);
    var hudLayer = new lime.Layer().setAnchorPoint(0, 0);
    var controlsLayer = new lime.Layer().setAnchorPoint(0, 0);

    gameScene.appendChild(landLayer);
    gameScene.appendChild(controlsLayer);
    gameScene.appendChild(hudLayer);

    //controls area
    var controlArea = new lime.Sprite().setAnchorPoint(0,0)
        .setPosition(0, gameObj.height-gameObj.controlsLayer_h)
        .setSize(gameObj.controlsLayer_w, gameObj.controlsLayer_h)
        .setFill('#0D0D0D')
    controlsLayer.appendChild(controlArea);

//stand button
    var standButton = new lime.GlossyButton().setColor('#133242').setText('Stands')
        .setPosition(60, gameObj.height-gameObj.controlsLayer_h/2)
        .setSize(80, 40);
    controlsLayer.appendChild(standButton); 

//money
    var moneyLabel = new lime.Label().setText('$'+playerObj.money).setFontColor('#E8FC08')
        .setPosition(gameObj.controlsLayer_w-50, gameObj.height-gameObj.controlsLayer_h/2);
    controlsLayer.appendChild(moneyLabel); 

//updating money indicator
    gameObj.updateMoney = function() {
        moneyLabel.setText('$'+playerObj.money);
    };

    gameObj.activeStands = [];
//create land elements
    for(var i=0; i<gameObj.num_tiles_x; i++) gameObj.activeStands.push([]);

    for(var i=0; i<gameObj.num_tiles_x; i++) {
        for(var j=0; j<gameObj.num_tiles_y; j++) {
            var landElement = new gamegrump.Land(gameObj, playerObj, i, j).setPosition(i*gameObj.tile_size, j*gameObj.tile_size);
            landLayer.appendChild(landElement);
            gameObj.activeStands[i][j] = landElement;
        }
    }

    director.replaceScene(gameScene);
    //stand store
    var standScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    var standLayer = new lime.Layer().setAnchorPoint(0, 0);

    var standBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0).setSize(gameObj.width, gameObj.height).setFill('#0D0D0D');
    standLayer.appendChild(standBackground);
    standScene.appendChild(standLayer);

    //close button
    var closeButton = new lime.GlossyButton().setColor('#133242').setText('Back').setPosition(gameObj.width/2, gameObj.height-25).setSize(80, 40);
    standLayer.appendChild(closeButton);

    //launch stand event
    goog.events.listen(standButton,['mousedown', 'touchstart'], function(e) {
        director.replaceScene(standScene);
    });

    //close stand event
    goog.events.listen(closeButton,['mousedown', 'touchstart'], function(e) {
        director.replaceScene(gameScene);
    }); 

    //stand items
    for(var i=0; i<gameObj.stands.length; i++) {
        var item = new lime.Sprite().setAnchorPoint(0,0).setPosition(gameObj.stand_margin_x, gameObj.stand_margin_y + (gameObj.stand_margin_y + gameObj.tile_size)*i).setFill('images/'+gameObj.stands[i].image).setSize(gameObj.tile_size, gameObj.tile_size);
    standLayer.appendChild(item);

    var nameLabel = new lime.Label().setText(gameObj.stands[i].name).setFontColor('#E8FC08').setPosition(gameObj.stand_margin_x+150, gameObj.stand_margin_y*1.5 + (gameObj.stand_margin_y + gameObj.tile_size)*i);
    standLayer.appendChild(nameLabel);
    /*var costLabel = new lime.Label().setText('cost: $'+gameObj.stands[i].cost).setFontColor('#E8FC08').setPosition(gameObj.stand_margin_x+150, gameObj.stand_margin_y*2.5 + (gameObj.stand_margin_y + gameObj.tile_size)*i);
    standLayer.appendChild(costLabel);
    var label = new lime.Label().setText('revenue: $'+gameObj.stands[i].revenue).setFontColor('#E8FC08').setPosition(gameObj.stand_margin_x+150, gameObj.stand_margin_y*3.4 + (gameObj.stand_margin_y + gameObj.tile_size)*i);
    standLayer.appendChild(label);*/

    //pick Stand
    (function(item, i) {
        goog.events.listen(item,['mousedown', 'touchstart'], function(e) {
            playerObj.currentStand = i;
            director.replaceScene(gameScene);
        });
    })(item, i);
}
}