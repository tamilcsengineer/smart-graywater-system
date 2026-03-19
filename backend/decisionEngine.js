function analyzeWater(source) {

    let turbidity, tds, ph;

    if(source === "washing_machine"){
        turbidity = 40;
        tds = 450;
        ph = 7;
    }

    if(source === "shower"){
        turbidity = 15;
        tds = 200;
        ph = 7;
    }

    if(source === "kitchen"){
        turbidity = 70;
        tds = 600;
        ph = 6;
    }

    let reuse;

    if(turbidity < 20 && tds < 300){
        reuse = "Reuse for Washing";
    }
    else if(turbidity < 40){
        reuse = "Toilet Flushing";
    }
    else if(turbidity < 60){
        reuse = "Gardening";
    }
    else{
        reuse = "Drain";
    }

    return {
        source,
        turbidity,
        tds,
        ph,
        reuse
    };
}

module.exports = analyzeWater;