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
    polygon.fill('#fff').move(x-x_offset, y-y_offset).scale(0.1);       
}

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

SVG.on(document, 'DOMContentLoaded', function () {
    var draw = SVG().addTo('body');

    // Make View Port for scaling
    draw.viewbox(0, 0, gv_width, gv_height);

    // Make sure there isn't any transparency
    draw.rect(gv_width, gv_height).move(0, 0).fill('#fff');

    // Draw the red stripes
    var i, j;
    for (var i = 0; i < 7; i++) {
        draw.rect(gv_width, stripeHeight).move(0, i * (2 * stripeHeight)).fill('#f00');
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
                console.log('Even Row: x=' + x + ' y=' + y);
                drawStar(draw, x, y);
            }
        } else {
            // Odd row
            for (j = 0; j < 5; j++) {
                x = (((j * 2) + 1) * starSpacingC) + (gv_starXPad / 2);
                y = (i * starSpacingH) + (gv_starYPad / 2);
                console.log('Odd Row: x=' + x + ' y=' + y);
                drawStar(draw, x, y);
            }
        }
    }

    // drawStar(draw, 0, 0);
    // This is not generating the expected reults.
    // There must be something goofy with scaling
    // going on...
    //drawStar(draw, 10, 10);
    //drawStar(draw, 20, 20);
    //drawStar(draw, 30, 30);
    //drawStar(draw, 40, 40);
})