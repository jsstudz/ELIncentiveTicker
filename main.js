var userData = {
    "participantId" : 347722,
    "showMilestones" : true,
    "showIncentives" : true
};

var BASE_URL = "http://www.extra-life.org/api/participants/{participantId}/"
var MILESTONE_END_POINT = "/milestones";
var INCENTIVE_END_POINT = "/incentives";
var milestones = {};
var incentives;
var incentiveContainer = document.getElementById("incentives");
var milestoneContainer = document.getElementById("milestones")
var incentiveCounter = 0;
var milestoneCounter = 0;

window.onload = initialize();

function initialize() {
    if(userData.showIncentives) getJson(INCENTIVE_END_POINT, true);
    if(userData.showMilestones) getJson(MILESTONE_END_POINT, false);
    incentiveContainer.innerText = incentives;
    initializeMarquee();
    //assignOrRemoveElement(incentiveContainer, userData.showIncentives, incentives, incentiveCounter);
    //assignOrRemoveElement(milestoneContainer, userData.showMilestones, milestones, milestoneCounter);
};

function getJson(endPoint, isIncentives) {
    $.ajax({
        url: BASE_URL.replace("{participantId}", userData.participantId) + endPoint,
        async: false,
        dataType: 'json',
        success: function(data) {
            if(isIncentives) {
                var elements = data.map(i => "$" + i.amount + " - " + i.description);
                incentives = elements.join(" ");
            }
            else {
                milestones = data.map(m => "$" + m.fundraisingGoal + " - " + m.description);
            }
        }
    });
}

function initializeMarquee() {
    $('.marquee').marquee({
        allowCss3Support: true,
        css3easing: 'linear',
        easing: 'linear',
        delayBeforeStart: 0,
        direction: 'left',
        duplicated: false,
        duration: 10000,
        gap: 20,
        pauseOnCycle: false,
        pauseOnHover: false,
        startVisible: false
    });
  }

