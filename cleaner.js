// MIT License
// Copyright (c) 2020 Luis Espino

var roomCleans = 0;
var roomDirty = 0;

function reflex_agent(location, state){
    if (state=="DIRTY") {
        if (roomCleans < 2) {
            roomCleans = 0;
            return "CLEAN";
        } else {
            if (roomDirty < 2) {
                if (location=="A") {return "RIGHT";}
                else if (location=="B") {return "LEFT";}
            } else {
                roomCleans = 0;
                roomDirty = 0;
                return "END OF CICLE";
            }
        }
    }
    else {
        roomCleans += 1;
        if (roomCleans < 2) {
            if (location=="A") {return "RIGHT";}
            else if (location=="B") {return "LEFT";}
        } else {
            roomDirty += 1;
            return "DIRTY";
        }
    }
}

function test(states){
    roomCleans < 2 ? printState(states) : console.log("\nEstado actual: Ensuciando");
    var location = states[0];		
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);
    //console.log(`Location: ${location} | State: ${state} | Action: ${action_result}`)
    document.getElementById("log").innerHTML+="<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);
    if (action_result == "CLEAN"){
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    }
    else if (action_result === "DIRTY") {
        if (location == "A") states[1] = "DIRTY";
        else if (location == "B") states[2] = "DIRTY";
    }
    else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";		
 setTimeout(function(){ test(states); }, 2000);
}

function printState(states) {
    var estado = "\nEstado actual: "
    if (states[0] === "A") {
        if (states[1] === "DIRTY") {
            states[2] === "DIRTY" ? estado = estado + "Estado 1" : estado = estado + "Estado 5";
        } else {
            states[2] === "DIRTY" ? estado = estado + "Estado 3" : estado = estado + "Estado 7";
        }
    } else {
        if (states[1] === "DIRTY") {
            states[2] === "DIRTY" ? estado = estado + "Estado 2" : estado = estado + "Estado 6";
        } else {
            states[2] === "DIRTY" ? estado = estado + "Estado 4" : estado = estado + "Estado 8";
        }
    }
    console.log(estado)
};

var states = ["A","DIRTY","DIRTY"];
// var states = ["A","DIRTY","CLEAN"];
// var states = ["A","CLEAN","DIRTY"];
// var states = ["A","CLEAN","CLEAN"];
// var states = ["B","DIRTY","DIRTY"];
// var states = ["B","DIRTY","CLEAN"];
// var states = ["B","CLEAN","DIRTY"];
// var states = ["B","CLEAN","CLEAN"];
test(states);