const nGold = (19320/0.197)*6.022e23 *79;
const nSilver = (10500/0.108)*6.022e23 *47;
const nCopper = (8960/0.0635)*6.022e23 *29;
const nAluminum = (2700/0.027)*6.022e23 *13;
const nGraphite = (2267/0.012)*6.022e23 *6;
const pi = Math.pi;
const rGold = 2.44e-8;
const rSilver = 1.59e-8;
const rCopper = 1.724e-8;
const rAluminum = 2.65e-8;
const rGraphite = 60e-8;
const q = 1.6e-19;

$(document).ready(function() {
    var cable = $('#cable');
    var outputResistance = $('#output-resistance');
    var outputCurrent = $('#output-current');
    var outputPower = $('#output-power');
    var outputVelocity = $('#output-velocity');
    var outputTime = $('#output-time');
    var length = $('#txt-length');
    var diameter = $('#txt-diameter');
    var inputMm = $('#mm');
    var inputAwg = $("#awg");
    var outputDiameter = $('#diametermm');
    var gold = $('#gold');
    var silver = $('#silver');
    var copper = $('#copper');
    var aluminum = $('#aluminum');
    var graphite = $('#graphite');
    var voltage = $('#txt-voltage');
    var submitButton = $('#submit-button');


    submitButton.click(function (){

    });

    inputAwg.click(function(){
        inputMm.prop("checked", false);
        let mm = AwgToMm(diameter.val());
        outputDiameter.text("Diamter: "+mm.toFixed(3) + " mm.");
    });
    inputMm.click(function(){
        inputAwg.prop("checked", false);
        outputDiameter.text("Diamter: "+diameter.val() + " mm.");
    });

});


function Area(diameter){
    let r = diameter/2;
    return pi * (r*r);
}

function AwgToMm(awg){
    return  0.127 * Math.pow(92, (36 - awg) / 39);
}

function Resistance(ro, l, A){
    return ro*(l/A);
}

function Current(V,R){
    return V/R;
}

function Power(I,V){
    return I*V;
}

function Velocity(I,n,A){
    return I / (n*q*A);
}

function Time(l,v){
    return l/v;
}