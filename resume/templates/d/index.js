function templateRendered() {
    $("body").css("overflow", "hidden");
    ko.applyBindings(window.me, frames.cntResume.document.body);
    if (frames.cntResume.reRender) frames.cntResume.reRender();
}

var user = new User().code($.urlParam("code"), "=");
var objs = [user,
    new User_Education().user(user),
    new User_Experience().user(user),
    new User_Skill().user(user),
    new User_Interest().user(user),
    new User_Social().user(user),
    new User_Portfolio().user(user),
    new User_Pricing().user(user),
    new User_Testimonial().user(user),
    new User_Publication().user(user)
];

if (true) {
    $.when(...$.map(objs, o => o.findAll())).then((u, ue, ux, us, ui, usc, up, upx, ut, upb) => {
        window.me = u[0];

        window.me.user_User_Educations(ue.sort((a, b) => b._from - a._from));
        window.me.user_User_Experiences(ux.sort((a, b) => b._from - a._from));
        window.me.user_User_Skills(us.sort((a, b) => b._percentage - a._percentage));
        window.me.user_User_Publications(upb.sort((a, b) => b._date - a._date));
        window.me.user_User_Interests(ui);
        window.me.user_User_Socials(usc);
        window.me.user_User_Portfolios(up);
        window.me.user_User_Pricings(upx);
        window.me.user_User_Testimonials(ut);
    }).then(() => {
        $.when(window._FrEMD.end()).then(() => {});
    });
} else {
    $.when(sr._("EnterpriseManager.emsEntityValueFindall", null, {
        EntityAttribute: {
            Id: 0,
        },
        EntityObject: {
            THIS: $.map(objs, o => o.toEntityObject())
        }
    })).then(ret => {
        console.log(ret);
    });
}