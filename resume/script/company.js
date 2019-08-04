var company = {
    Code: "resume",
    Required: ["knockout", "Underscore"],
    Responsive: true,
    Name: "",
    library: "",
    OnPageLoad: () => {
        return $.when(new User().code(sr.$_REQUEST("code"), "=").findAll()).then(ret => {
            window.me = ret[0];
            window.me._user_User_Experiences.sort((a, b) => b._from - a._from);
            window.me._user_User_Educations.sort((a, b) => b._from - a._from);
            window.me._user_User_Skills.sort((a, b) => b._percentage - a._percentage);
            window.me._user_User_Publications.sort((a, b) => b._date - a._date);

            window.frames[0].location = 'website/' + window.me._template._code;
            /*(async () => {
                let ipdata = await $.getJSON('https://gd.geobytes.com/GetCityDetails?callback=?');
                if ($.grep(window.me._user_User_Country_Exclusions, ex => ex._country._name == ipdata.geobytescountry).length) {
                    console.log("Country Not Supported");
                } else {
                    window.frames[0].location = 'website/' + window.me._template._code;
                }
            })();*/
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