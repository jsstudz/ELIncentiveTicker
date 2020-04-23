var userData = {
    "participantId" : 400560,
    "showMilestones" : true,
    "showIncentives" : true,
    "marqueeSpeedInMilliseconds" : 15000
};

var BASE_URL = "https://www.extra-life.org/api/participants/{participantId}/"
var MILESTONE_END_POINT = "milestones";
var INCENTIVE_END_POINT = "incentives";
var container = document.getElementById("container");

var v = new Vue({
    el: "#ticker",
    data: {
        combinedText: "",
        incentiveUrl: BASE_URL.replace("{participantId}", userData.participantId) + INCENTIVE_END_POINT,
        milestoneUrl: BASE_URL.replace("{participantId}", userData.participantId) + MILESTONE_END_POINT
    },
    methods: {
        initialize() {
            if(userData.showIncentives) this.getJson(this.incentiveUrl, true);
            if(userData.showMilestones) this.getJson(this.milestoneUrl, false);
            this.initializeMarquee();
        },
        getJson(endPoint, isIncentives) {
            axios.get(endPoint).then((response) => {
                isIncentives ?
                    this.combinedText += " Incentives: " + response.data.map(i => "$" + i.amount + " - " + i.description).join(" " + "| ") :
                    this.combinedText += " Milestones: " + response.data.map(m => "$" + m.fundraisingGoal + " - " + m.description).join(" " + "| ");
            })
        },
        initializeMarquee() {
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
    }
})

v.initialize();


