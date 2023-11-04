const nGold = (19320/0.197)*6.022e23 *79;
const nSilver = (10500/0.108)*6.022e23 *47;
const nCopper = (8960/0.0635)*6.022e23 *29;
const nAluminum = (2700/0.027)*6.022e23 *13;
const nGraphite = (2267/0.012)*6.022e23 *6;
const pi = Math.PI;
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
    var diameterInput = $('#txt-diameter');
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
    let diameter;

    inputAwg.click(function(){
        inputMm.prop("checked", false);
        let mm = AwgToMm(diameterInput.val());
        diameter = mm;
        outputDiameter.text("Diamter: "+mm.toFixed(3) + " mm.");
    });
    inputMm.click(function(){
        inputAwg.prop("checked", false);
        diameter = diameterInput.val();
        outputDiameter.text("Diamter: "+diameterInput.val() + " mm.");
    });

    submitButton.click(function (){
        let area = Area(diameter);
        let ro;
        let n;
        let l = length.val();
        let resistance;

        console.log(diameter);

        if(gold.is(":checked")){
            ro = rGold;
            n = nGold;
        }
        else if(silver.is(":checked")){
            ro = rSilver;
            n = nSilver;
        }
        else if(copper.is(":checked")){
            ro = rCopper;
            n = nCopper;
        }
        else if(aluminum.is(":checked")){
            ro = rAluminum;
            n = nAluminum;
        }
        else if(graphite.is(":checked")){
            ro = rGraphite;
            n = nGraphite;
        }

        resistance = Resistance(ro, l, area);
        let current = Current(voltage.val(), resistance);
        let power = Power(current, voltage.val());
        let velocity = Velocity(current, n, area);

        

        outputResistance.text("Wire resistance: "+resistance.toExponential()+" Ω");
        outputCurrent.text("Current: "+current.toExponential() +" A");
        outputPower.text("Power dissipated by the wire: "+power.toExponential() +" W");
        outputVelocity.text("Drift velocity of electrons: "+velocity.toExponential()+" m/s");
        outputTime.text("Time it will take for electrons to traverse the entire wire: "+Time(l, velocity).toExponential() +" s");
    });

});


function Area(diameter){
    let r = (diameter / 1000)/2;
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