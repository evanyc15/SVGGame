/**
 * Created by echen on 4/30/15.
 * NOTE: Remember the SVG X-Y Plane starts at the TOP-LEFT corner
 */

$(document).ready(function(){
    var svgPlants = $('.svgPlants');
    //var svgBiker = $('#svgBiker');
    var svgGroundDirt = $('#svgGroundDirt');
    var svgGroundRoad = $('#svgGroundRoad');
    var svgGroundFound = $('#svgGroundFound');
    var gameData = {
        rockCounter: 0,
        plantInterval: 50,
        rockInterval: 5000,
        svgPlantsOrigAttr: [],
        svgBikeOrigAttr: {
            x: $(svgBiker).attr('x'),
            y: $(svgBiker).attr('y')
        }
    };
    var jumpAudio = new Audio('assets/audio/Jumping.mp3');
    var crashAudio = new Audio('assets/audio/Crash.mp3');

    for(var a = 0; a < svgPlants.length; a++){
        gameData.svgPlantsOrigAttr[a] = {
            x: $(svgPlants[a]).attr('x'),
            y: $(svgPlants[a]).attr('y')
        };
    }

    var plantInterval = setInterval(function(){
        for(var i = 0; i < svgPlants.length; i++) {
            var xCoord = $(svgPlants[i]).attr('x');
            if(xCoord < -300){
                $(svgPlants[i]).attr('x', parseInt(gameData.svgPlantsOrigAttr[i].x)+1000);
            } else {
                $(svgPlants[i]).attr('x', xCoord - 10);
            }
        }
    }, gameData.plantInterval);

    d3.select('#svgContainer').append('image')
        .attr('class', 'svgsmallRock')
        .attr('id', 'svgsmallRock'+gameData.rockCounter)
        .attr('xlink:href', 'assets/img/smallRock.png')
        .attr('width', '30px')
        .attr('height', '30px')
        .attr('x', 1150)
        .attr('y', 480);
    d3.select('#svgContainer').append('image')
        .attr('class', 'svgrockGroup')
        .attr('id', 'svgrockGroup'+gameData.rockCounter)
        .attr('xlink:href', 'assets/img/rockGroup.png')
        .attr('width', '40px')
        .attr('height', '45px')
        .attr('x', 1750)
        .attr('y', 470);

    gameData.rockCounter++;

    var rockMakeInterval = setInterval(function(){

        //var svgsmallRockHTML = '<image class="svgsmallRock" xlink:href="assets/img/smallRock.png" width="30px" height="30px" x="1150" y="480"/>';
        //var svgrockGroupHTML = '<image class="svgrockGroup" xlink:href="assets/img/rockGroup.png" width="45px" height="45px" x="1550" y="470"/>';

        d3.select('#svgContainer').append('image')
            .attr('class', 'svgsmallRock')
            .attr('id', 'svgsmallRock'+gameData.rockCounter)
            .attr('xlink:href', 'assets/img/smallRock.png')
            .attr('width', '30px')
            .attr('height', '30px')
            .attr('x', 1150)
            .attr('y', 480);
        d3.select('#svgContainer').append('image')
            .attr('class', 'svgrockGroup')
            .attr('id', 'svgrockGroup'+gameData.rockCounter)
            .attr('xlink:href', 'assets/img/rockGroup.png')
            .attr('width', '40px')
            .attr('height', '45px')
            .attr('x', 1750)
            .attr('y', 470);

        gameData.rockCounter++;
    }, gameData.rockInterval);

    var rockMoveInterval = setInterval(function(){

        for(var i = 0; i < $('.svgsmallRock').length; i++){
            var xsCoord = $($('.svgsmallRock')[i]).attr('x');

            if(xsCoord < -100){
                var id = "#"+$($('.svgsmallRock')[i]).attr('id');
                //$('.svgsmallRock').splice(i, 1);
                d3.select(id).remove()
            } else {
                $($('.svgsmallRock')[i]).attr('x', xsCoord - 10);
                var bikerX1 = parseInt(d3.select('#svgBiker').attr('x'));
                var bikerX2 = bikerX1 + 175;
                var bikerY = parseInt(d3.select('#svgBiker').attr('y')) + 140;

                // Biker is on top of rock here, reduced to 10/30 for some leeway
                if(parseInt($($('.svgsmallRock')[i]).attr('x'))+15 < bikerX2 &&  parseInt($($('.svgsmallRock')[i]).attr('x'))+25 > bikerX1){

                    if(bikerY <= parseInt($($('.svgsmallRock')[i]).attr('y'))+25 && bikerY > parseInt($($('.svgsmallRock')[i]).attr('y'))){
                        clearInterval(plantInterval);
                        clearInterval(rockMakeInterval);
                        clearInterval(rockMoveInterval);
                        crashAudio.play();
                        $("#crashContainer").show();
                    }
                }
            }
        }
        for(var i = 0; i < $('.svgrockGroup').length; i++){
            var xrCoord = $($('.svgrockGroup')[i]).attr('x');

            if(xrCoord < -100){
                var id = "#"+$($('.svgrockGroup')[i]).attr('id');
                //$('.svgrockGroup').splice(i, 1);
                d3.select(id).remove()
            } else {
                $($('.svgrockGroup')[i]).attr('x', xrCoord - 10);
                var bikerX1 = parseInt(d3.select('#svgBiker').attr('x'));
                var bikerX2 = bikerX1 + 175;
                var bikerY = parseInt(d3.select('#svgBiker').attr('y')) + 140;


                // Biker is on top of rock here
                if(parseInt($($('.svgrockGroup')[i]).attr('x'))+15 < bikerX2 &&  parseInt($($('.svgrockGroup')[i]).attr('x'))+30 > bikerX1){

                    if(bikerY <= parseInt($($('.svgrockGroup')[i]).attr('y'))+35 && bikerY > parseInt($($('.svgrockGroup')[i]).attr('y'))){
                        clearInterval(plantInterval);
                        clearInterval(rockMakeInterval);
                        clearInterval(rockMoveInterval);
                        crashAudio.play();
                        $("#crashContainer").show();
                    }
                }
            }
        }
    }, gameData.plantInterval);

    $(document).keypress(function(e) {
        if(e.which == 32) {
            $("#jumpButton").click();
        }
    });
    $("#jumpButton").on("click", function(){
        if(parseInt(d3.select('#svgBiker').attr('y')) === parseInt(gameData.svgBikeOrigAttr.y)){
            jumpAudio.play();
            d3.select('#svgBiker').attr('y', parseInt(d3.select('#svgBiker').attr('y'))-35);
            setTimeout(function(){
                d3.select('#svgBiker').attr("xlink:href", "assets/img/BikingUp.png");
                d3.select('#svgBiker').attr('y', parseInt(d3.select('#svgBiker').attr('y'))-30);
            },100);
            setTimeout(function(){
                d3.select('#svgBiker').attr('y', parseInt(d3.select('#svgBiker').attr('y'))-25);
            },200);
            setTimeout(function(){
                d3.select('#svgBiker').attr('y', parseInt(d3.select('#svgBiker').attr('y'))-20);
            },300);
            setTimeout(function(){
                d3.select('#svgBiker').attr('y', parseInt(d3.select('#svgBiker').attr('y'))-15);
            },400);
            setTimeout(function(){
                d3.select('#svgBiker').attr('y', parseInt(d3.select('#svgBiker').attr('y'))-15);
            },500);
            setTimeout(function(){
                d3.select('#svgBiker').attr('y', parseInt(d3.select('#svgBiker').attr('y'))+15);
            },600);
            setTimeout(function(){
                d3.select('#svgBiker').attr('y', parseInt(d3.select('#svgBiker').attr('y'))+15);
            },700);
            setTimeout(function(){
                d3.select('#svgBiker').attr('y', parseInt(d3.select('#svgBiker').attr('y'))+20);
            },800);
            setTimeout(function(){
                d3.select('#svgBiker').attr('y', parseInt(d3.select('#svgBiker').attr('y'))+25);
            },900);
            setTimeout(function(){
                d3.select('#svgBiker').attr('y', parseInt(d3.select('#svgBiker').attr('y'))+30);
            },1000);
            setTimeout(function(){
                d3.select('#svgBiker').attr("xlink:href", "assets/img/BikingPush.png");
                d3.select('#svgBiker').attr('y', parseInt(d3.select('#svgBiker').attr('y'))+35);
            },1100);
            d3.select('#svgBiker').attr("xlink:href", "assets/img/BikingReg.png");
        }
    });
    $("#restartGame").on("click", function(){
        location.reload();
    });
});