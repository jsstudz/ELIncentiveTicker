var userData = {
    "participantId" : 347722,
    "showMilestones" : true,
    "showIncentives" : true
};

var BASE_URL = "http://www.extra-life.org/api/participants/{participantId}"
var MILESTONE_END_POINT = "/milestones";
var INCENTIVE_END_POINT = "/incentives";
var milestones = {};
var incentives = {};
var container = document.getElementById("container");
var counter = 0;

window.onload = getData();

function getData() {
    if(userData.showIncentives) getIncentives();
    if(userData.showMilestones) getMilestones();
    container.innerText = userData.showIncentives ? incentives[counter] : milestones[counter];
    counter++;
};

function getMilestones() {
    $.ajax({
        url: BASE_URL.replace("{participantId}", userData.participantId) + MILESTONE_END_POINT,
        async: false,
        dataType: 'json',
        success: function(data) {
            milestones = data.map(m => "$" + m.fundraisingGoal + " " + m.description);
        }
    });
}

function getIncentives() {
    $.ajax({
        url: BASE_URL.replace("{participantId}", userData.participantId) + INCENTIVE_END_POINT,
        async: false,
        dataType: 'json',
        success: function(data) {
            incentives = data.map(i => "$" + i.amount + " " + i.description);
        }
    });
}

function change() {
    container.innerText = incentives[counter];
    counter++;
    if(counter >= incentives.length) { counter = 0; }
}

setInterval(change, 5000);

