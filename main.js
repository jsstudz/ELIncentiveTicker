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
};

function getMilestones() {
    $.ajax({
        url: BASE_URL.replace("{participantId}", userData.participantId) + MILESTONE_END_POINT,
        async: false,
        dataType: 'json',
        success: function(data) {
            milestones = data;
        }
    });
}

function getIncentives() {
    $.ajax({
        url: BASE_URL.replace("{participantId}", userData.participantId) + INCENTIVE_END_POINT,
        async: false,
        dataType: 'json',
        success: function(data) {
            incentives = data;
        }
    });
}

function change() {
    var incentive = incentives[counter];
    container.innerText = incentive.amount + " " + incentive.description;
    counter++;
    if(counter >= incentives.length) { counter = 0; }
}

setInterval(change, 1000);

