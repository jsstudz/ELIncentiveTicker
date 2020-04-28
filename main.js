/**
 * TODO:
 * 1. Implement isComplete on Milestones as a filter, preferably on request
 * 2. Show only Incentives that are have not been fully redeemed (might be done already?)
 * 3. Refresh every X to pull Milestones/Incentives with updated information (isComplete, all redeemed)
 */
var userData = {
    "participantId" : 347722,
    "showMilestones" : true,
    "showIncentives" : true,
    "marqueeSpeedInMilliseconds" : 15000
};

var BASE_URL = "http://www.extra-life.org/api/participants/{participantId}/"
var MILESTONE_END_POINT = "/milestones";
var INCENTIVE_END_POINT = "/incentives";
var combinedText = "";
var container = document.getElementById("container");

window.onload = initialize();

function initialize() {
    if(userData.showIncentives) getJson(INCENTIVE_END_POINT, true);
    if(userData.showMilestones) getJson(MILESTONE_END_POINT, false);
    container.innerText = combinedText;
    initializeMarquee();
};

function getJson(endPoint, isIncentives) {
    $.ajax({
        url: BASE_URL.replace("{participantId}", userData.participantId) + endPoint,
        async: false,
        dataType: 'json',
        success: function(data) {
            if(isIncentives) {
                combinedText += " Incentives: " + data.map(i => "$" + i.amount + " - " + i.description).join(" " + "| ");
            }
            else {
                combinedText += " Milestones: " + data.map(m => "$" + m.fundraisingGoal + " - " + m.description).join(" " + "| ");
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
        duration: userData.marqueeSpeedInMilliseconds,
        gap: 20,
        pauseOnCycle: false,
        pauseOnHover: false,
        startVisible: false
    });
  }

