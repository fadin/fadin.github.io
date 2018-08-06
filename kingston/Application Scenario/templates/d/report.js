function ShowYear(section, year){
    var s = new ReportSection(year);
    $.when(s[section]()).then((ret) => {
        zingchart.render({
          id: "chtResults-"+year,
          data: s._asZingOptions(s._data(ret, 'bar', section)),
          height: '600',
          width: '100%'
        });

        var tdata = s._pivot(ret, "MMM/YY");
        var columns = [];
        for(var p in tdata[0]){
            columns.push({title:p, field:p, width:200});
        }
        $("#tblResults-"+year).tabulator({
            height:"311px",
            columns: columns,
        });
        tdata = $.grep(tdata, (n, i) => {return parseFloat(n.Aggregation)>0;});
        $("#tblResults-"+year).tabulator("setData", tdata);
        
        var html = "";
        $.each(tdata, (i, v) => {
            if(i==0){
                html += "<thead><tr class='w3-light-grey'>";
                for(var p in v){
                    html += "<th>" + p + "</th>";
                }
                html += "</tr></thead>";
            }
            html += "<tr>";
            for(var p in v){
                html += "<td>" + v[p] + "</td>";
            }
            html += "</tr>";
        });
        $("#tblResults-data-"+year).html(html);

        window.sr.PostCache(1000, function(){
            if(!window.sr.bLocal) return;
            if(year>=2018){
                year = 2014;
                $.each(Object.getOwnPropertyNames( ReportSection.prototype ), (i, s) => {
                    if(s==section){
                        $("#menu-"+(i+1)).trigger("click");
                        return;
                    }
                });
                return;
            }
            $( "#section-" + (year+1) ).trigger( "click" );
        });
    });
}

end(function(){
    $("#tab-container").easytabs();
    
    ShowYear(page._data._section, 2014);
});