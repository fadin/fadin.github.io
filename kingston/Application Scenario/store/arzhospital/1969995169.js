var method_name = "ContentManager.cmsHTMLPageFindall";

var server_time = new Date(2018, 7-1, 23, 14, 8, 0);

var execution_time = 0.041982;

ret = new Array();
ret[0] = new Object();
ret[0].ToString = "Import Module";
ret[0]._ToString = "Import Module";
ret[0].AlwaysGenerate = false;
ret[0].Body = "window.<%=group.Name.replace(/[\\ |\\-|\\.]/g, \'\')%> = class {\n\tconstructor() {\n\t    this._identity = {\n\t        Active: true,\n\t        Enabled: true,\n\t        Group: {\n\t            Active: true,\n\t            Id: <%=group.Id%>,\n\t        },\n\t        OPERATORS: {PerformanceIdentities: \"INTERSECT\"},\n\t        PerformanceIdentities: [],\n\t    };\n\t}\n\t\n\trole(r) {\n\t    this._identity.Role = {Name: r, OPERATORS: {Name: \'=\'}};\n\t    return this;\n\t}\n\t\n\t_call(f, o) {\n\t    return sr._(\"CorporateMeasures.com\" + f, null, o || this._identity);\n\t}\n\t\n\tfindAll() {\n\t    return this._call(\"IdentityFindall\");\n\t}\n\t\n\tcount() {\n\t    return this._call(\"IdentityCount\");\n\t}\n\t\n\t_takenOn(p, start, end) {\n\t    p.OPERATORS = p.OPERATORS || {};\n        if(start && !end){\n            p.TakenOn = moment(start).toDate();\n            p.OPERATORS.TakenOn=\'>=\';\n        }else if(!start && end){\n            p.TakenOn = moment(end).toDate();\n            p.OPERATORS.TakenOn=\'<=\';\n        }else if(start && end){\n            p.TakenOn = moment(start).toDate();\n            p.OPERATORS.TakenOn=\"BETWEEN \" + (sr.toDateTime(moment(end).toDate()) || end);\n        }\n\t}\n\n<% $.each(group.DataMapValues, (__, dfv) => { %>\n    <%=(dfv.Code).replace(/[\\ |\\-|\\.]/g, \'\')%>(start, end) {\n        var ret = {\n            Active: true,\n\t\t\tDataMapValue: {Id: <%=dfv.Id%>},\n\t\t\tPerformance: {\n                Active: true,\n                DataSet: {\n                    DataMap: {\n                        Active: true,\n                        Id: <%=dfv.DataMap.Id%>,\n                    }\n                },\n                Batch: {\n                    Active: true,\n                    Enabled: true,\n                },\n                OPERATORS: {PerformanceIdentities: \"INTERSECT\"},\n                PerformanceIdentities: [{\n                    Active: true,\n                    Identity: this._identity,\n                }],\n\t\t\t},\n\t\t};\n\t\t\n\t\tthis._takenOn(ret.Performance, start, end);\n\t\treturn ret;\n    }\n<% }); %>\n\t\n<% $.each(group.DataFields, (__, df) => { %>\n    <%=((df.Role?df.Role.Name:\"\")+df.DataMap.Name).replace(/[\\ |\\-|\\.]/g, \'\')%>(options, start, end) {\n        for(var p in options){\n            var pi = {\n                Active: true,\n                DataField: {\n                    Active: true,\n                    Id: <%=df.Id%>,\n                },\n                Performance: {\n                    Active: true,\n                    DataSet: {\n                        DataMap: {\n                            Active: true,\n                            Id: <%=df.DataMap.Id%>,\n                        }\n                    },\n                    Batch: {\n                        Active: true,\n                        Enabled: true,\n                    },\n                    PerformanceIdentities: [{\n                        Active: true,\n                        DataField: {\n                            Active: true,\n                            Id: 0,\n                        },\n                        Identity: {\n                            Active: true,\n                            Group: {\n                                Active: true,\n                                Id: 0,\n                            },\n                        },\n                    }],\n                }\n            };\n            this._takenOn(pi.Performance, start, end);\n\n            switch(p){\n        <% $.each(df.DataMap.DataFields, (__, f) => { %>\n                case \"<%=f.CodeField.replace(/[\\ |\\-|\\.]/g, \'\')%>\": {\n                    if(!options[p]) break;\n\n                    var _pi = $.extend({}, pi);\n                    _pi.Performance.PerformanceIdentities[0].DataField = <%=f.Id%>;\n                    _pi.Performance.PerformanceIdentities[0].Identity.Group.Id = <%=f.Group.Id%>;\n\n                    if(options[p]._identity){\n                        // coming from this script\n                        _pi.Performance.PerformanceIdentities[0].Identity = options[p]._identity;\n                    }else{\n                        for(var _p in options[p]){\n                            _pi.Performance.PerformanceIdentities[0].Identity[_p] = options[p][_p];\n                        }\n                    }\n                    this._identity.PerformanceIdentities.push(_pi);\n                    break;\n                }\n        <% }); %>\n                default: {\n                    break;\n                }\n            }\n        }\n        \n        return this;\n    }\n<% }); %>\n};";
ret[0].Date = new Date(2018, 6-1, 25, 11, 59, 43);
ret[0].Description = "";
ret[0].Footer = "";
ret[0].ImageSource = "";
ret[0].Page = "Hosted/COM/ImportModule";
ret[0].Public = false;
ret[0].Script = "window.ImportModule = class {\r\n\tconstructor(filter) {\r\n\t\tthis._filter = filter;\r\n\t\tif(!this._filter.DataSets) this._filter.DataSets = [{Active: true}];\r\n\t}\r\n\t\r\n\tsetTemplate(template) {\r\n\t    this._template = template;\r\n\t}\r\n\t\r\n\t_buildDataMaps() {\r\n\t\t$.when(sr._(\"CorporateMeasures.comDataFieldFindall\", null, {\r\n\t\t\tDataMap: this._filter\r\n\t\t}), sr._(\"CorporateMeasures.comDataMapValueFindall\", null, {\r\n\t\t\tDataMap: this._filter\r\n\t\t})).done((...arRet) => {\r\n\t\t\tthis._dataMaps = [];\r\n\t\t\t$.each(sr.groupBy(arRet[0], \"DataMap\"), (__, f) => {\r\n\t\t\t    if(!f.key) return;\r\n\t\t\t    f.key.DataFields = f.values;\r\n\t\t\t    $.each(f.key.DataFields, (__, df) => {\r\n                    df.DataMap = f.key;\r\n\t\t\t    });\r\n\t\t\t    this._dataMaps.push(f.key);\r\n\t\t\t});\r\n\t\t\t$.each(sr.groupBy(arRet[1], \"DataMap\"), (__, v) => {\r\n\t\t\t    $.each(this._dataMaps, (__, m) => {\r\n\t\t\t        if(sr.Equals(m, v.key)){\r\n                        m.DataMapValues = v.values;\r\n                        $.each(v.values, (__, vv) => {\r\n                            vv.DataMap = m;\r\n                        });\r\n\t\t\t        }\r\n\t\t\t    });\r\n\t\t\t});\r\n\t\t\t\r\n\t\t    this._groups = [];\r\n\t\t    $.each(sr.groupBy(arRet[0], \"Group\"), (__, g) => {\r\n\t\t        if(!g.key) return;\r\n\t            g.key.DataFields = g.values;\r\n\t            this._groups.push(g.key);\r\n\t\t    });\r\n\t\t    \r\n\t\t    $.each(this._groups, (__, g) => {\r\n                g.DataMapValues = g.DataMapValues || [];\r\n                $.each(g.DataFields, (__, df) => {\r\n                    $.merge(g.DataMapValues, df.DataMap.DataMapValues);\r\n                });\r\n\t\t    });\r\n\t\t});\r\n\t}\r\n\r\n\tgenerate() {\r\n\t    $.when(this._buildDataMaps()).then(() => {\r\n\t        $.each(this._groups, (__, g) => {\r\n\t            var code = _.template(this._template)({group: g});\r\n\t            //if(g.Name==\"Doctor\") console.log(code);\r\n\t            sr.runScript(code);\r\n\t        });\r\n\t    });\r\n\t}\r\n};";
ret[0].Title = "Import Module";
ret[0].Id = 1594;
ret[0].Authorid = 0;
ret[0].SectionPages = new Array();
ret[0].PageMenus = new Array();
ret[0].RelatingPages = new Array();
ret[0].RelatedPages = new Array();
ret[0].PageAccessRules = new Array();
ret[0].BugReports = new Array();
ret[0].PageAccessRights = new Array();
ret[0].PageStatuses = new Array();
ret[0].ReferenceMenus = new Array();
ret[0].PageAccessRequests = new Array();
ret[0].FeedbackPages = new Array();
ret[0].PageHelps = new Array();