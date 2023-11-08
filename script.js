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
    var electron = $('#electron');
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
    let currentYPos = 0;
    let currentXPos = 0;

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
        currentXPos = 0;
        currentYPos = 0;
        let area = Area(diameter);
        let ro;
        let n;
        let l = length.val();
        let resistance;


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

        randomWalk();

    });

    function randomWalk() {
        const maxXPos = 600;
      
        function moveElectron() {

            const dX = Math.random() *  (3 - (-2)) + (-2);
            const dY = Math.random() * 10 - 5;
      

            currentXPos += dX;
            currentYPos += dY;
      

            currentYPos = Math.max(0, Math.min(100, currentYPos));
      

            electron.css({
                left: currentXPos + 'px',
                top: currentYPos + 'px'
            });
        
                if (currentXPos < maxXPos) {
                    requestAnimationFrame(moveElectron);
                }else{
                    electron.css({
                        left: 0 + 'px',
                        top: 0 + 'px'
                    });
                    currentXPos = 0;
                    currentYPos = 0;
                }
            }

        moveElectron();
    }
    
/*     function MoveBottom(){
        electron.animate(
            {
                top: currentYPosition + 10 + 'px'
            },
            {
                duration: 600,
                complete: function() {
                electron.css('top:'+ currentYPosition + 10 +'px');
                }
            }
            );
            currentYPosition += 10;
    }

    function MoveTop(){
        electron.animate(
            {
                top: currentYPosition - 10 + 'px'
            },
            {
                duration: 600,
                complete: function() {
                electron.css('top:'+ currentYPosition - 10 +'px');
                }
            }
            );
            currentYPosition -= 10;
    }

    function MoveRight(){
        electron.animate(
            {
                left: currentXPosition + 10 + 'px'
            },
            {
                duration: 600,
                complete: function() {
                electron.css('left:'+ currentXPosition + 10 +'px');
                }
            }
            );
            currentXPosition += 10;
            console.log("Mover" + currentXPosition );
    }

    function MoveLeft(){
        electron.animate(
            {
                left: currentXPosition - 10 + 'px'
            },
            {
                duration: 600,
                complete: function() {
                electron.css('left:'+ currentYPosition - 0 +'px');
                }
            }
            );
            currentXPosition -= 10;
            console.log("Mover" + currentXPosition );
    } */

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

