_c({Page: "Hosted/COM/ReportSection"}, ret => {
    sr.runScript(ret[0].Script);
}, "ContentManager.cmsHTMLPageFindall");
_c({Page: "Hosted/COM/ImportModule"}, ret => {
    if(typeof Patient === "function") return;
    sr.runScript(ret[0].Script);
    var mi = new ImportModule({Organization: {Code: 'ARZ', OPERATORS: {Code: '='}}});
    mi.setTemplate(ret[0].Body);
    $.when(mi.generate()).then(() => {
    });
}, "ContentManager.cmsHTMLPageFindall");