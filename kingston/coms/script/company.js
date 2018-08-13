var company = {
    Code: "COM",
    Required: ["EJS", "LZ-String", "DynaForm", "Filters", "Moment", "Charts", "Flowchart", "NOTY", "ZingChart", "XLSX", "XML2JSON", "PapaCSV", "DynaTable", "Underscore", "EasyUI"],
    Responsive: true,
    OnPageLoad: function(data){
        $.parser.parse();

        if(false) $.when(sr.import($.map(["ImportModule"], x => "Hosted/"+company.Code+"/" + x))).then((...pages) => {
            var mi = new ImportModule({Organization: {Code: 'ARZ', OPERATORS: {Code: '='}}});
            mi.setTemplate(pages[0][0].Body);
            $.when(mi.generate()).then(() => {
                // are the classes ready?
            });
        });
    },
    //GACode: 'UA-3880962-1',
    Name: "Corporate Measures",
    library: "CorporateMeasures"
};

/* for web version */
if(window.location.href.indexOf("/nammour.com/") <= -1) {
    company.Store = "store/"+company.Code+"/";
}

/* for mobile version */
// company.Store = "http://www.nammour.com/store/";

var CMS_ROOT = "Hosted/"+company.Code+"/";