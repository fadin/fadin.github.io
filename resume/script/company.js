var company = {
    Code: "resume",
    Required: ["knockout", "Underscore"],
    Responsive: true,
    Name: "",
    library: "",
    OnPageLoad: () => {
        return $.when(new User().code(sr.$_REQUEST("code"), "=").findAll()).then(ret => {
            window.me = ret[0];
            window.frames[0].location = 'website/' + window.me._template._code;
        });
    },
};


/* for web version */
if (window.location.href.indexOf("/nammour.com/") <= -1) {
    company.Store = "store/" + company.Code + "/";
}

/* for mobile version */
// company.Store = "http://www.nammour.com/store/";

var CMS_ROOT = "Hosted/" + company.Code + "/";