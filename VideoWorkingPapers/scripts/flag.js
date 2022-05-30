var gv_starStack = [];
var gv_whiteStripeStack = [];

const gc_num_white_stripes = 7;
const gc_flip_duration = 3000; 
const gc_flip_wait = 2000;
const gc_red_flip = { fill: '#f00' }; 
const gc_blue_flip = { fill: '#39f' }; 
const gc_white_flip = { fill: '#fff' }; 

const gc_wstripe_dest = { fill: '#f00' };

const gc_frameDelay = 1.0 / 60.0;

function ticks() {
    // https://social.msdn.microsoft.com/Forums/en-US/6c201981-de7a-47fe-97c8-df426ae489e1/get-tick-count-in-javascript
    var now = new Date();
    var ticks = now.getTime();
    return ticks;
}

function flipStar(i, d, c) {
    const dOff = d + gc_flip_duration + gc_flip_wait; 
    var theStar = gv_starStack[i];
    theStar.animate(gc_flip_duration, d, 'now').attr(c);
    theStar.animate(gc_flip_duration, dOff, 'now').attr(gc_white_flip);
}

function drawStar(dContext, x, y) {
    // Should these values be hard coded???
    // I guess it doesn't matter since this is
    // supposed to done quickly...
    // https://svgjs.dev/docs/3.0/shape-elements/#svg-polygon
    // https://svgjs.dev/docs/3.0/manipulating/#scale
    const x_offset = 203;
    const y_offset = 170;    
    var polygon = dContext.polygon(
        '16,156 154,244 101,385 241,297 ' +
        '380,385 327,244 466,156 296,156 ' +
        '241, 14 187, 156'
    );
    var someStar = 
        polygon.fill('#fff').move(x-x_offset, y-y_offset).scale(0.1);
    gv_starStack.push(someStar);
}

function startAnimation(startingDivTag) {
    var startDiv = document.getElementById(startingDivTag);
    startDiv.hidden = true;

    let gv_width = 1280;
    let gv_height = 720;
    var stripeHeight = gv_height / 13;
    // var gv_bSquareEdgeLength = stripeHeight * 7;
    var gv_vStarPadFactor = 0.1;

    var gv_starAreaH = (stripeHeight * 7);
    var gv_starXPad = gv_starAreaH * 0.05;

    var gv_starAreaW = 
        stripeHeight * 9; // Hack, width slightly longer than height
    var gv_starYPad = gv_starAreaW * 0.05;

    // SVG.on(document, 'DOMContentLoaded', function () {
    var draw = SVG().addTo('body');

    // Make View Port for scaling
    draw.viewbox(0, 0, gv_width, gv_height);

    // Make sure there isn't any transparency
    draw.rect(gv_width, gv_height).move(0, 0).fill('#fff');

    var i, j;
    // Draw the red stripes
    for (i = 0; i < 7; i++) {
        draw.rect(gv_width, stripeHeight).move(0, i * (2 * stripeHeight)).fill('#f00');
    }

    // Draw the white stripes
    for (j = 0; j < gc_num_white_stripes; j++) {
        // BEGIN Not Needed 
        // var width;             
        // if (j < 3) {
        //     width = gv_width;
        // } else {
        //     width = gv_width;
        // }
        // END   Not Needed 

        var whiteStrip = 
            draw.rect(gv_width, stripeHeight).move(0, (2*j+1) * stripeHeight).fill('#fff');
        gv_whiteStripeStack.push(whiteStrip);
    }

    // Draw the place where the stars go
    // (aka: The blue square)
    draw.rect(
        gv_starAreaW,
        gv_starAreaH
    ).move(0, 0).fill('#00f');

    // Draw a single star
    // More stars should come later
    // drawStar(draw, 20, 20);

    // Draw nine rows of stars
    var numStarLines = 9;
    var numStarCols = 11;
    var starSpacingH = 
        (gv_starAreaH - gv_starXPad) / numStarLines;
    var starSpacingC = 
        (gv_starAreaW - gv_starYPad) / numStarCols;
    for (i = 0; i < numStarLines; i++) {
        var x, y;
        if ((i % 2) == 0) {
            // Even row
            for (j = 0; j < 6; j++) {
                x = (j * 2 * starSpacingC) + (gv_starXPad / 2);
                y = (i * starSpacingH) + (gv_starYPad / 2);
//                    console.log('Even Row: x=' + x + ' y=' + y);
                drawStar(draw, x, y);
            }
        } else {
            // Odd row
            for (j = 0; j < 5; j++) {
                x = (((j * 2) + 1) * starSpacingC) + (gv_starXPad / 2);
                y = (i * starSpacingH) + (gv_starYPad / 2);
//                    console.log('Odd Row: x=' + x + ' y=' + y);
                drawStar(draw, x, y);
            }
        }
    }

    // https://stackoverflow.com/questions/9300655/
    // play-mp3-file-using-javascript
    new Audio('./cyberWar.mp3').play();
   
    // From above, we should have fifty stars in gv_starStack
    flipStar(12, 0, gc_red_flip);
    flipStar(37, 0, gc_blue_flip);

    flipStar(14, 2000, gc_red_flip);
    flipStar(19, 2000, gc_red_flip);
    flipStar(20, 2000, gc_red_flip);
    flipStar(29, 2000, gc_blue_flip);
    flipStar(34, 2000, gc_blue_flip);
    flipStar(35, 2000, gc_blue_flip);

    flipStar(7,  6000, gc_red_flip);
    flipStar(12, 6000, gc_red_flip);
    flipStar(13, 6000, gc_red_flip);
    flipStar(17, 6000, gc_red_flip);
    flipStar(18, 6000, gc_red_flip);
    flipStar(23, 6000, gc_red_flip);

    flipStar(42, 6000, gc_blue_flip);
    flipStar(37, 6000, gc_blue_flip);
    flipStar(36, 6000, gc_blue_flip);
    flipStar(32, 6000, gc_blue_flip);
    flipStar(31, 6000, gc_blue_flip);
    flipStar(26, 6000, gc_blue_flip);
    
    // Other animation
    // https://www.javatpoint.com/javascript-timer
    var timeToDraw = 2000;

    var debugFrameHandlerCount = 0;
    function frameHandler() {
        curTime = ticks();
        var totalElapsedTime = curTime - startTime;

        for (var i = 0; i < lines.length; i++) {
            var lineCmd = lines[i];  
            var delay = lineCmd.delay;          
            var totalElaspedTimeRelative = totalElapsedTime - delay;
            var theLine = lineCmd.line;
            var sX = lineCmd.startX;
            var sY = lineCmd.startY;
            var eX = lineCmd.endX;
            var eY = lineCmd.endY;
            if (
                (totalElapsedTime > delay) // && 
                // (totalElaspedTimeRelative < timeToDraw) 
            ) {
                var newX, newY;
                if (totalElaspedTimeRelative >= timeToDraw) {
                    newX = eX;
                    newY = eY;
                } else {
                    newX = 
                        sX + 
                        (eX - sX) * 
                        (totalElaspedTimeRelative / timeToDraw);
                    newY = 
                        sY + 
                        (eY - sY) * 
                        (totalElaspedTimeRelative / timeToDraw);
                }

                theLine.plot(sX, sY, newX, newY);
            }
        }
    }

    var lines = [];

    var startTime = ticks();
    var lastTime = startTime;
    var curTime = 0;
    // https://jsfiddle.net/Fuzzy/ve7frkxd/
    var line = draw.line(0, 0, 0, 0);
    line.stroke({ color: '#0C2', width: 10, linecap: 'round' });
    lines.push(
        {
            line: line,
            delay: 0,
            startX: gv_width, 
            startY: gv_height * 1.0 / 8.0,
            endX: gv_width - (4.4 / 8.0 * gv_width),
            endY: gv_height * 1.0 / 8.0
        }
    );
    // https://jsfiddle.net/Fuzzy/ve7frkxd/
    var line2 = draw.line(0, 0, 0, 0);
    line2.stroke({ color: '#0C2', width: 10, linecap: 'round' });
    lines.push(
        {
            line: line2,
            delay: 0,
            startX: gv_width, 
            startY: gv_height * 1.3 / 8.0, 
            endX: gv_width - (4.2 / 8.0 * gv_width),
            endY: gv_height * 1.3 / 8.0
        }
    );
    var line3 = draw.line(0, 0, 0, 0);
    line3.stroke({ color: '#0C2', width: 10, linecap: 'round' });
    lines.push(
        {
            line: line3,
            delay: timeToDraw,
            startX: gv_width - (4.4 / 8.0 * gv_width), 
            startY: gv_height * 1.0 / 8.0,
            endX: gv_width - (4.4 / 8.0 * gv_width),
            endY: gv_height * 8.0 / 8.0
        }
    );
    // https://jsfiddle.net/Fuzzy/ve7frkxd/
    var line4 = draw.line(0, 0, 0, 0);
    line4.stroke({ color: '#0C2', width: 10, linecap: 'round' });
    lines.push(
        {
            line: line4,
            delay: timeToDraw,
            startX: gv_width - (4.2 / 8.0 * gv_width), 
            startY: gv_height * 1.3 / 8.0, 
            endX: gv_width - (4.2 / 8.0 * gv_width),
            endY: gv_height * 8.0 / 8.0
        }
    );    
    setInterval(frameHandler, gc_frameDelay);

    // Mess with the white stripes
    var pace = gc_flip_duration / 2;
    var d;
    for (j = 0; gc_num_white_stripes; j++) {
        d = 0;
        for (i = 0; i < 20; i++) {
            gv_whiteStripeStack[j].animate(pace, d, 'now').attr(gc_blue_flip);
            d += pace;
            gv_whiteStripeStack[j].animate(pace, d, 'now').attr({ fill: '#fff' });
            d += pace;
            gv_whiteStripeStack[j].animate(pace, d, 'now').attr(gc_red_flip);
            d += pace;
            gv_whiteStripeStack[j].animate(pace, d, 'now').attr({ fill: '#fff' });  
            d += pace;               
        }
    }

        // flipStar(10, 300, gc_red_flip);
        // flipStar(47, 500, gc_blue_flip);
        // flipStar(14, 1000, gc_red_flip);
        // flipStar(2, 1300, gc_blue_flip);
        // flipStar(5, 1300, gc_red_flip);
        // flipStar(7, 1300, gc_red_flip);
        // flipStar(20, 1300, gc_red_flip);
        // flipStar(26, 1300, gc_red_flip);
        // flipStar(33, 1300, gc_red_flip);
        // flipStar(37, 1400, gc_blue_flip);
        // flipStar(1, 1400, gc_blue_flip);
        // flipStar(0, 1600, gc_blue_flip);
        // flipStar(49, 1000, gc_red_flip);
        // flipStar(25, 1900, gc_blue_flip);
        


    // https://svgjs.dev/docs/3.0/shape-elements/



        // Let's fade one of them to red and back to white and then to 
        // blue and back to white as a test
        // https://svgjs.dev/docs/3.0/animating/
        // var s,d,c;
        // s = gv_starStack[3]; 
        // c = gc_red_flip; d = 0; 
        // doff = d + gc_flip_duration;
        // s.animate(gc_flip_duration, 3000, 'now').attr(c);
        // s.animate(gc_flip_duration, doff, 'now').attr(gc_white_flip);
//     // theStar.animate(
//     //     gc_flip_duration,
//     //     d + gc_flip_duration, 
//     //     'now'
//     // ).attr(gc_white_flip);

        // flipStar(gv_starStack[3], 0, gc_red_flip);

        // flipStar(7, 50, gc_blue_flip);
        
        // flipStar(15, 200, gc_red_flip);
        // flipStar(4, 200, gc_red_flip);
        // flipStar(8, 300, gc_red_flip);
        
        

        // drawStar(draw, 0, 0);
        // This is not generating the expected reults.
        // There must be something goofy with scaling
        // going on...
        //drawStar(draw, 10, 10);
        //drawStar(draw, 20, 20);
        //drawStar(draw, 30, 30);
        //drawStar(draw, 40, 40);
    // })
}





