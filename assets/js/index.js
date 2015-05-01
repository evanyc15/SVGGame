/**
 * Created by echen on 4/30/15.
 */

$(document).ready(function(){
    var svgPlants = $('.svgPlants');
    var svgGroundWaterPlat = $('.svgGroundWaterPlat');
    var svgBiker = $('#svgBiker');
    var svgGroundDirt = $('#svgGroundDirt');
    var svgGroundRoad = $('#svgGroundRoad');
    var svgGroundFound = $('#svgGroundFound');
    var svgGroundWater = $('#svgGroundWater');
    var gameData = {
        plantInterval: 50,
        terrainInterval: 1000,
        ground: true,
        water: false,
        svgPlantsOrigAttr: [],
        svgGroundWaterPlatOrigAttr: [],
        svgBikeOrigAttr: {
            x: $(svgBiker).attr('x'),
            y: $(svgBiker).attr('y')
        }
    };

    var terrainInterval;
    var terrainTimeout;

    for(var a = 0; a < svgPlants.length; a++){
        gameData.svgPlantsOrigAttr[a] = {
            x: $(svgPlants[a]).attr('x'),
            y: $(svgPlants[a]).attr('y')
        };
    }
    for(var b = 0; b < svgGroundWaterPlat.length; b++){
        gameData.svgGroundWaterPlatOrigAttr[b] = {
            x: $(svgGroundWaterPlat[b]).attr('x'),
            y: $(svgGroundWaterPlat[b]).attr('y')
        };
    }
    setInterval(function(){
        for(var i = 0; i < svgPlants.length; i++) {
            var xCoord = $(svgPlants[i]).attr('x');
            if(xCoord < -300){
                $(svgPlants[i]).attr('x', parseInt(gameData.svgPlantsOrigAttr[i].x)+1000);
            } else {
                $(svgPlants[i]).attr('x', xCoord - 10);
            }
        }
    }, gameData.plantInterval);
    setInterval(function(){
        // This is to show water
        if(gameData.ground && !gameData.water){

            gameData.ground = false;
            gameData.water = true;

            terrainTimeout = setTimeout(function(){

                svgGroundWater.show();
                svgGroundWaterPlat.show();
                terrainInterval = setInterval(function(){
                    if(parseInt(svgGroundWater.attr('x')) < -1000) {
                        svgGroundWater.attr('x', 1000);
                        svgGroundWater.hide();
                        clearInterval(terrainInterval);
                        clearTimeout(terrainTimeout);

                        setTimeout(function(){
                            gameData.ground = true;
                            gameData.water = false;
                        }, 3000);
                    } else {
                        svgGroundWater.attr('x', parseInt(svgGroundWater.attr('x')) - 10);
                        for(var j = 0; j < svgGroundWaterPlat.length; j++) {
                            var xCoordW = $(svgGroundWaterPlat[j]).attr('x');

                            if(xCoordW < -300){
                                $(svgGroundWaterPlat[j]).attr('x', parseInt(gameData.svgGroundWaterPlatOrigAttr[j].x));
                                $(svgGroundWaterPlat[j]).hide();
                            } else {
                                $(svgGroundWaterPlat[j]).attr('x', xCoordW - 10);
                            }
                        }
                    }
                }, gameData.plantInterval);
            }, 3000);
        }
    }, gameData.terrainInterval);

    $("#jumpButton").on("click", function(){
        $(svgBiker).attr('y', gameData.svgBikeOrigAttr.y-10);
        setTimeout(function(){
            svgBiker.attr("xlink:href", "assets/img/BikingUp.png");
            $(svgBiker).attr('y', gameData.svgBikeOrigAttr.y-25);
        },100);
        setTimeout(function(){
            $(svgBiker).attr('y', gameData.svgBikeOrigAttr.y-40);
        },200);
        setTimeout(function(){
            $(svgBiker).attr('y', gameData.svgBikeOrigAttr.y-55);
        },300);
        setTimeout(function(){
            $(svgBiker).attr('y', gameData.svgBikeOrigAttr.y-70);
        },400);
        setTimeout(function(){
            $(svgBiker).attr('y', gameData.svgBikeOrigAttr.y-85);
        },500);
        setTimeout(function(){
            $(svgBiker).attr('y', gameData.svgBikeOrigAttr.y-70);
        },600);
        setTimeout(function(){
            $(svgBiker).attr('y', gameData.svgBikeOrigAttr.y-55);
        },700);
        setTimeout(function(){
            $(svgBiker).attr('y', gameData.svgBikeOrigAttr.y-40);
        },800);
        setTimeout(function(){
            $(svgBiker).attr('y', gameData.svgBikeOrigAttr.y-25);
        },900);
        setTimeout(function(){
            $(svgBiker).attr('y', gameData.svgBikeOrigAttr.y-10);
        },1000);
        setTimeout(function(){
            svgBiker.attr("xlink:href", "assets/img/BikingPush.png");
            $(svgBiker).attr('y', gameData.svgBikeOrigAttr.y);
        },1100);
        svgBiker.attr("xlink:href", "assets/img/BikingReg.png");
    });
});