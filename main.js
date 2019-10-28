var userData = {
    "participantId" : 347722,
    "showMilestones" : true,
    "showIncentives" : true
};

var BASE_URL = "http://www.extra-life.org/api/participants/{participantId}/"
var MILESTONE_END_POINT = "/milestones";
var INCENTIVE_END_POINT = "/incentives";
var milestones = {};
var incentives = {};
var incentiveContainer = document.getElementById("incentives");
var milestoneContainer = document.getElementById("milestones")
var incentiveCounter = 0;
var milestoneCounter = 0;

window.onload = initialize();

function initialize() {
    if(userData.showIncentives) getJson(INCENTIVE_END_POINT, true);
    if(userData.showMilestones) getJson(MILESTONE_END_POINT, false);
    assignOrRemoveElement(incentiveContainer, userData.showIncentives, incentives, incentiveCounter);
    assignOrRemoveElement(milestoneContainer, userData.showMilestones, milestones, milestoneCounter);
};

function getJson(endPoint, isIncentives) {
    $.ajax({
        url: BASE_URL.replace("{participantId}", userData.participantId) + endPoint,
        async: false,
        dataType: 'json',
        success: function(data) {
            if(isIncentives) {
                incentives = data.map(i => "$" + i.amount + " " + i.description);
            }
            else {
                milestones = data.map(m => "$" + m.fundraisingGoal + " " + m.description);
            }
        }
    });
}

function assignOrRemoveElement(element, show, data, counter) {
    if(show) {
        element.innerText = data[counter];
        counter++;
    } else {
        element.parentNode.removeChild(element);
    }
}

function change() {
   if(userData.showIncentives) { 
       incentiveContainer.innerText = incentives[incentiveCounter];
       incentiveCounter++;
       if(incentiveCounter >= incentives.length) { incentiveCounter = 0;}
    }
   if(userData.showMilestones) {
        milestoneContainer.innerText = milestones[milestoneCounter];
        milestoneCounter++;
       if(milestoneCounter >= milestones.length) { milestoneCounter = 0;}
   }
}

setInterval(change, 5000);

