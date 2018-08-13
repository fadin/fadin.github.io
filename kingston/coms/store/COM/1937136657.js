var method_name = "ContentManager.cmsHTMLPageFind";

var server_time = new Date(2018, 8-1, 13, 7, 40, 0);

var execution_time = 0.040378;

ret = new Object();
ret.ToString = "Run Analytics";
ret._ToString = "Run Analytics";
ret.AlwaysGenerate = false;
ret.Body = "<%=form%>";
ret.Date = new Date(2015, 12-1, 16, 20, 14, 11);
ret.Description = "";
ret.Footer = "";
ret.ImageSource = "";
ret.Page = "Hosted/COM/analytics/run";
ret.Public = false;
ret.Script = "end(function() {\r\n\t// Any of the following formats may be used\r\n\twindow.DForm.bind();\r\n}, {\r\n\tform: window.DForm.render(\'frmAnalyticNew\', \"Data Distributions\", [{\r\n\t\tgroup: \"Distribution\",\r\n\t\ttype: \"label\",\r\n\t\tvalue: \"This will show how the Group is distributed across the selected sub-group\"\r\n\t}, {\r\n\t\tgroup: \"Distribution\",\r\n\t\tname: \"DataSet\",\r\n\t\ttype: \"select\",\r\n\t}, {\r\n\t\tgroup: \"Distribution\",\r\n\t\tname: \"Group\",\r\n\t\ttitle: \"Group\",\r\n\t\ttype: \'select\',\r\n\t\tsource: function(o, fData) {\r\n\t\t\to.DataFields = [{\r\n\t\t\t\tActive: true,\r\n\t\t\t\tDataMap: {\r\n\t\t\t\t\tActive: true,\r\n\t\t\t\t\tDataSets: [fData.DataSet]\r\n\t\t\t\t}\r\n\t\t\t}];\r\n\t\t\treturn o;\r\n\t\t}\r\n\t}, {\r\n\t\tgroup: \"Distribution\",\r\n\t\tname: \"Role\",\r\n\t\ttype: \'select\',\r\n\t\tsource: function(o, fData) {\r\n\t\t\to.Group = fData.Group;\r\n\t\t\treturn o;\r\n\t\t}\r\n\t}, {\r\n\t\tgroup: \"Distribution\",\r\n\t\tname: \"SubGroup\",\r\n\t\ttitle: \"Over\",\r\n\t\ttype: \"select\",\r\n\t\ttable: \'Group\',\r\n\t\tsource: function(o, fData) {\r\n\t\t\to.DataFields = [{\r\n\t\t\t\tActive: true,\r\n\t\t\t\tDataMap: {\r\n\t\t\t\t\tActive: true,\r\n\t\t\t\t\tDataSets: [fData.DataSet]\r\n\t\t\t\t}\r\n\t\t\t}];\r\n\t\t\treturn o;\r\n\t\t}\r\n\t}, {\r\n\t\tgroup: \"Distribution\",\r\n\t\tname: \"SubRole\",\r\n\t\ttitle: \"As Role\",\r\n\t\ttable: \"Role\",\r\n\t\ttype: \'select\',\r\n\t\tsource: function(o, fData) {\r\n\t\t\to.Group = fData.SubGroup;\r\n\t\t\treturn o;\r\n\t\t}\r\n\t}, {\r\n\t\tgroup: \"Distribution\",\r\n\t\tname: \"Interval\",\r\n\t\ttype: \"select\",\r\n\t}, {\r\n\t\tgroup: \"Distribution\",\r\n\t\tname: \"startDate\",\r\n\t\ttitle: \"Start Date\",\r\n\t\ttype: \'datetime\'\r\n\t}, {\r\n\t\tgroup: \"Distribution\",\r\n\t\tname: \"endDate\",\r\n\t\ttitle: \"End Date\",\r\n\t\ttype: \'datetime\'\r\n\t}, {\r\n\t\tgroup: \"Options\",\r\n\t\tname: \"SubIdentities\",\r\n\t\ttype: \"select\",\r\n\t\tmultiple: true,\r\n\t\ttable: \"Identity\",\r\n\t\tsource: function(o, fData) {\r\n\t\t\treturn o.ofGroup(fData.SubGroup, fData.SubRole)\r\n\t\t\t//.where(new Identity().ofGroup(fData.Group, fData.Role), fData.DataSet, false, fData.startDate, fData.endDate)\r\n\t\t\t;\r\n\t\t}\r\n\t}, {\r\n\t\tgroup: \"Options\",\r\n\t\tname: \"Aggregation\",\r\n\t\ttype: \"select\",\r\n\t\toptions: [\"COUNT\", \"AVG\", \'SUM\'],\r\n\t}, {\r\n\t\tgroup: \"Options\",\r\n\t\ttype: \"select\",\r\n\t\tname: \"MapValue\",\r\n\t\ttable: \"DataMapValue\",\r\n\t\tsource: function(o, fData) {\r\n\t\t\to.Active = true;\r\n\t\t\to.Enabled = true;\r\n\t\t\to.DataMap = fData.DataSet.DataMap;\r\n\t\t\treturn o;\r\n\t\t}\r\n\t}, {\r\n\t\tgroup: \"Options\",\r\n\t\ttype: \"select\",\r\n\t\tname: \"Transformation\",\r\n\t}, {\r\n\t\tgroup: \"Options\",\r\n\t\tname: \"Grid\",\r\n\t\ttype: \"bool\",\r\n\t}, {\r\n\t\tgroup: \"Options\",\r\n\t\tname: \"Async\",\r\n\t\ttype: \"bool\",\r\n\t}, {\r\n\t\tgroup: \"Options\",\r\n\t\tname: \"PollSeconds\",\r\n\t\ttype: \"int\",\r\n\t}, {\r\n\t\tgroup: \"Options\",\r\n\t\tname: \"Top\",\r\n\t\ttype: \"int\",\r\n\t}, {\r\n\t\tgroup: \"Options\",\r\n\t\tname: \"Divide\",\r\n\t\ttype: \"bool\",\r\n\t}, {\r\n\t\tgroup: \"Filter\",\r\n\t\tname: \"filterGroup\",\r\n\t\ttable: \"Group\",\r\n\t\ttype: \"select\",\r\n\t\tsource: function(o, fData) {\r\n\t\t\to.DataFields = [{\r\n\t\t\t\tActive: true,\r\n\t\t\t\tDataMap: {\r\n\t\t\t\t\tActive: true,\r\n\t\t\t\t\tDataSets: [fData.DataSet]\r\n\t\t\t\t}\r\n\t\t\t}];\r\n\t\t\treturn o;\r\n\t\t}\r\n\t}, {\r\n\t\tgroup: \"Filter\",\r\n\t\tname: \"groupValues\",\r\n\t\ttable: \"Identity\",\r\n\t\ttype: \"select\",\r\n\t\tsource: function(o, fData) {\r\n\t\t\to.Group = fData.filterGroup;\r\n\t\t\treturn o;\r\n\t\t}\r\n\t}, {\r\n\t\tgroup: \"Filter\",\r\n\t\tname: \"filterSubGroup\",\r\n\t\ttable: \"Group\",\r\n\t\ttype: \"select\",\r\n\t\tsource: function(o, fData) {\r\n\t\t\to.DataFields = [{\r\n\t\t\t\tActive: true,\r\n\t\t\t\tDataMap: {\r\n\t\t\t\t\tActive: true,\r\n\t\t\t\t\tDataSets: [fData.DataSet]\r\n\t\t\t\t}\r\n\t\t\t}];\r\n\t\t\treturn o;\r\n\t\t}\r\n\t}, {\r\n\t\tgroup: \"Filter\",\r\n\t\tname: \"subGroupValues\",\r\n\t\ttable: \"Identity\",\r\n\t\ttype: \"select\",\r\n\t}, {\r\n\t\tgroup: \"Chart\",\r\n\t\tname: \"Results\",\r\n\t\ttitle: \"Results\",\r\n\t\ttype: \'chart\'\r\n\t}], [{\r\n\t\tname: \'Display\',\r\n\t\tonclick: function(o) {\r\n    \t\tsr._(\"ContentManager.cmsHTMLPageFindall\", null, {\r\n    \t\t\tPage: \'Hosted/COM/Utils\'\r\n    \t\t}).done(function(_pages) {\r\n    \t\t\tsr.runScript(_pages[0].Script);\r\n    \t\t});\r\n\r\n\t\t\tvar runner = new RunAnalytic(o);\r\n\t\t\trunner.run(function(data){\r\n    \t\t\twindow.DForm.busy(false);\r\n\t\t\t    window.DForm.initChart(\"Results\", null, data);\r\n\t\t\t});\r\n\t\t}\r\n\t}, ])\r\n});";
ret.Title = "Run Analytics";
ret.Id = 1563;
ret.Authorid = 0;
ret.SectionPages = new Array();
ret.PageMenus = new Array();
ret.RelatingPages = new Array();
ret.RelatedPages = new Array();
ret.PageAccessRules = new Array();
ret.BugReports = new Array();
ret.PageAccessRights = new Array();
ret.PageStatuses = new Array();
ret.ReferenceMenus = new Array();
ret.PageAccessRequests = new Array();
ret.FeedbackPages = new Array();
ret.PageHelps = new Array();