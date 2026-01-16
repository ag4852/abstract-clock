let smoothSecPct = 0;

// setup() is called once at page-load
function setup() {
    createCanvas(800, 600);
}

// draw() is called 60 times per second
function draw() {
    let hr = hour() % 12;  // 0-11
    let min = minute();    // 0-59
    let sec = second();    // 0-59

    // Hour: 1-12 spikes 
    let hrSpikes = hr === 0 ? 12 : hr;

    // Minute: 1-60 spikes
    let minSpikes = min + 1;

    background(30);

    let centerX = width / 2;
    let centerY = height / 2;

    // Hour 
    fill(80, 120, 200, 150);
    noStroke();
    drawSpiky(centerX, centerY, 245, 260, hrSpikes);

    // Minute
    fill(120, 200, 120, 150);
    noStroke();
    drawSpiky(centerX, centerY, 165, 180, minSpikes);

    // Seconds 
    let targetPct = sec / 59;

    // Fill animation
    if (targetPct < smoothSecPct - 0.5) {
        smoothSecPct = 0;
    }

    smoothSecPct = lerp(smoothSecPct, targetPct, 0.25);

    let secInner = 165 * smoothSecPct;
    let secOuter = 180 * smoothSecPct;

    fill(40, 100, 40, 200);
    noStroke();
    drawSpiky(centerX, centerY, secInner, secOuter, minSpikes);

    // Debug text
    fill(255);
    noStroke();
    textSize(14);
    text(`${hour()}:${nf(min, 2)}:${nf(sec, 2)}`, 10, 25);
    text(`spikes: ${hrSpikes} (hr) / ${minSpikes} (min) | sec fill: ${sec}/59`, 10, 45);
}

// Spiky blob
function drawSpiky(x, y, innerRadius, outerRadius, numSpikes) {
    let points = [];
    let angle = TWO_PI / numSpikes;

    for (let i = 0; i < numSpikes; i++) {
        let a = angle * i - HALF_PI;

        let ox = x + cos(a) * outerRadius;
        let oy = y + sin(a) * outerRadius;
        points.push({x: ox, y: oy});

        let ia = a + angle / 2;
        let ix = x + cos(ia) * innerRadius;
        let iy = y + sin(ia) * innerRadius;
        points.push({x: ix, y: iy});
    }

    beginShape();
    curveVertex(points[points.length - 2].x, points[points.length - 2].y);
    curveVertex(points[points.length - 1].x, points[points.length - 1].y);
    for (let p of points) {
        curveVertex(p.x, p.y);
    }
    curveVertex(points[0].x, points[0].y);
    curveVertex(points[1].x, points[1].y);
    curveVertex(points[2].x, points[2].y);
    endShape();
}
