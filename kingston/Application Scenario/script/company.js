var company = {
    Code: "arzhospital",
    Required: ["EJS", "NOTY", "Moment", "JQuery UI", "ZingChart", "printThis", "Underscore", "Tabulator"],
    Responsive: true,
    OnPageLoad: function(data){
    },
    //GACode: 'UA-3880962-1',
    Name: "Arz Hospital"
};

/* for web version */
if(window.location.href.indexOf("/nammour.com/") <= -1) {
    company.Store = "store/"+company.Code+"/";
}

/* for mobile version */
// company.Store = "http://www.nammour.com/store/";

var CMS_ROOT = "Hosted/"+company.Code+"/";