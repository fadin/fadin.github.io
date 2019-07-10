var company = {
    Code: "resume",
    Required: ["Underscore", "knockout", "html2canvas", "js2PDF"],
    Responsive: true,
    Name: "Resume Management System",
    OnPageLoad: () => {
        console.log("Page Loaded: " + page._code);
    },
};


/* for web version */
if (window.location.href.indexOf("/nammour.com/") <= -1) {
    company.Store = "store/" + company.Code + "/";
}

/* for mobile version */
// company.Store = "http://www.nammour.com/store/";

var CMS_ROOT = "Hosted/" + company.Code + "/";