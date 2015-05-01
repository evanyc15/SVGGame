/**
 * Created by echen on 4/30/15.
 */

$(document).ready(function(){
    var svgPlants = $('.svgPlants');
    var svgsmallRock = $('.svgsmallRock');
    var svgrockGroup = $('.svgrockGroup');
    var svgBiker = $('#svgBiker');
    var svgGroundDirt = $('#svgGroundDirt');
    var svgGroundRoad = $('#svgGroundRoad');
    var svgGroundFound = $('#svgGroundFound');
    var gameData = {
        plantInterval: 50,
        svgPlantsOrigAttr: [],
        svgBikeOrigAttr: {
            x: $(svgBiker).attr('x'),
            y: $(svgBiker).attr('y')
        },
        svgsmallRockOrigAttr: [],
        svgrockGroupAttr: []
    };

    for(var a = 0; a < svgPlants.length; a++){
        gameData.svgPlantsOrigAttr[a] = {
            x: $(svgPlants[a]).attr('x'),
            y: $(svgPlants[a]).attr('y')
        };
    }
    for(var a = 0; a < svgsmallRock.length; a++){
        gameData.svgsmallRockOrigAttr[a] = {
            x: $(svgsmallRock[a]).attr('x'),
            y: $(svgsmallRock[a]).attr('y')
        }
    }
    for(var a = 0; a < svgrockGroup.length; a++){
        gameData.svgrockGroupAttr[a] = {
            x: $(svgrockGroup[a]).attr('x'),
            y: $(svgrockGroup[a]).attr('y')
        }
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
        for(var i = 0; i < svgsmallRock.length; i++) {
            var xCoords = $(svgsmallRock[i]).attr('x');
            if(xCoords < -300){
                $(svgsmallRock[i]).attr('x', parseInt(gameData.svgsmallRockOrigAttr[i].x));
            } else {
                $(svgsmallRock[i]).attr('x', xCoords - 10);
            }
        }
        for(var i = 0; i < svgrockGroup.length; i++) {
            var xCoordg = $(svgrockGroup[i]).attr('x');
            if(xCoordg < -300){
                $(svgrockGroup[i]).attr('x', parseInt(gameData.svgrockGroupAttr[i].x));
            } else {
                $(svgrockGroup[i]).attr('x', xCoordg - 10);
            }
        }
    }, gameData.plantInterval);

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