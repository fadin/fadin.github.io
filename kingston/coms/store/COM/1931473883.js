var method_name = "ContentManager.cmsHTMLPageFind";

var server_time = new Date(2018, 8-1, 13, 7, 38, 12);

var execution_time = 0.041953;

ret = new Object();
ret.ToString = "Map Builder";
ret._ToString = "Map Builder";
ret.AlwaysGenerate = false;
ret.Body = "<%=form%>";
ret.Date = new Date(2017, 1-1, 4, 9, 18, 15);
ret.Description = "";
ret.Footer = "";
ret.ImageSource = "";
ret.Page = "Hosted/COM/FrameBuilder";
ret.Public = false;
ret.Script = "end(function() {\r\n\twindow.DForm.bind();\r\n}, {\r\n\tform: window.DForm.render(\'frmFrameBuilder\', \"Frame Builder\", [{\r\n\t\tgroup: \"Settings\",\r\n\t\ttype: \"label\",\r\n\t\tvalue: \"Choose a set of parameters to create and customize a Data Frame, and test the results in real-time.\"\r\n\t}, {\r\n\t\tgroup: \"Settings\",\r\n\t\tname: \"Name\",\r\n\t\ttype: \"string\",\r\n\t}, {\r\n\t\tgroup: \"Settings\",\r\n\t\tname: \"Group\",\r\n\t\ttype: \"select\",\r\n\t\tsource: (o, f) => {\r\n\t\t    o.DataFields = [{\r\n\t\t        Active: true,\r\n\t\t        DataMap: filters.DataMap()\r\n\t\t    }];\r\n\t\t    return o;\r\n\t\t}\r\n\t}, {\r\n\t\tgroup: \"Settings\",\r\n\t\tname: \"Role\",\r\n\t\ttype: \"select\",\r\n\t\tsource: function(o, f){\r\n\t\t    o.Group = f.Group;\r\n\t\t    return o;\r\n\t\t}\r\n\t}, {\r\n\t\tgroup: \"Settings\",\r\n\t\tname: \"DataMap\",\r\n\t\ttype: \"select\",\r\n\t\tsource: function(o, f){\r\n\t\t    o.DataFields = [{\r\n\t\t        Active: true,\r\n\t\t        Group: f.Group\r\n\t\t    }];\r\n\t\t    if(f.Role) o.DataFields[0].Role = f.Role;\r\n\t\t    return o;\r\n\t\t}\r\n\t}, {\r\n\t\tgroup: \"Settings\",\r\n\t\tname: \"DataField\",\r\n\t\ttype: \"select\",\r\n\t\tsource: function(o, f){\r\n\t        o.OPERATORS = (o.OPERATORS || {});\r\n\t\t    if(f.Role){\r\n\t\t        o.Role = f.Role;\r\n\t\t        o.OPERATORS.Role = \"!=\";\r\n\t\t    }else if(f.Group){\r\n\t\t        o.Group = f.Group;\r\n\t\t        o.OPERATORS.Group = \"!=\";\r\n\t\t    }\r\n\t\t    \r\n\t\t    if(f.DataMap) o.DataMap = f.DataMap;\r\n\t\t    return o;\r\n\t\t}\r\n\t}, {\r\n\t\tgroup: \"Settings\",\r\n\t\tname: \"Identity\",\r\n\t\ttitle: \"Value\",\r\n\t\ttype: \"select\",\r\n\t\tsource: function(o, f){\r\n\t\t    o.Group = f.DataField.Group;\r\n\t\t    return o;\r\n\t\t}\r\n\t}, {\r\n\t\tgroup: \"Settings\",\r\n\t\tname: \"DataMapValue\",\r\n\t\ttitle: \"Map Value\",\r\n\t\ttype: \"select\",\r\n\t\tsource: function(o, f){\r\n\t\t    o.DataMap = f.DataMap;\r\n\t\t    return o;\r\n\t\t}\r\n\t}, {\r\n\t\tgroup: \"Settings\",\r\n\t\tname: \"Aggregation\",\r\n\t\ttype: \"select\",\r\n\t\tsource: function(o, f){\r\n\t\t    if(!f.DataMapValue) o.Id = -1;\r\n\t\t    return o;\r\n\t\t}\r\n\t}, {\r\n\t\tgroup: \"Settings\",\r\n\t\tname: \"Parent\",\r\n\t\ttable: \"DataFrame\",\r\n\t\ttype: \"select\",\r\n\t\tsource: function(o, f){\r\n\t\t    o.Group = f.Group;\r\n\t\t    o.Name = f.Name;\r\n\t        o.OPERATORS = (o.OPERATORS || {});\r\n\t\t    o.OPERATORS.Name = \"!=\";\r\n\t\t    return o;\r\n\t\t}\r\n\t}, {\r\n\t\tgroup: \"Test\",\r\n\t\tname: \"StartDate\",\r\n\t\ttype: \"datetime\",\r\n\t}, {\r\n\t\tgroup: \"Test\",\r\n\t\tname: \"Interval\",\r\n\t\ttype: \"select\",\r\n\t}, {\r\n\t\tgroup: \"Test\",\r\n\t\tname: \"EndDate\",\r\n\t\ttype: \"datetime\",\r\n\t}/*, {\r\n\t\tgroup: \"Code\",\r\n\t\tname: \"frameTemplate\",\r\n\t\ttype: \"text\",\r\n\t}, {\r\n\t\tgroup: \"Code\",\r\n\t\tname: \"frameCode\",\r\n\t\ttype: \"text\",\r\n\t}*/, {\r\n\t\tgroup: \"Results\",\r\n\t\tname: \"resCount\",\r\n\t\ttype: \"string\",\r\n\t}], [{\r\n\t\tname: \'Save Frame\',\r\n\t\tonclick: function(o) {\r\n\t        window.DForm.busy(true);\r\n\t\t    sr._(\"comDataFrameInsert\", (ret) => {\r\n\t\t        window.DForm.busy(false);\r\n\t\t        window.oDataFrame = ret;\r\n\t\t    }, {\r\n\t\t        Active: true,\r\n\t\t        Date: moment().toDate(),\r\n\t\t        User: window.me,\r\n\t\t        Parent: o.Parent,\r\n\t\t        DataField: o.DataField,\r\n\t\t        Enabled: true,\r\n\t\t        Name: o.Name,\r\n\t\t        DataMapValue: o.DataMapValue,\r\n\t\t        Aggregation: o.Aggregation,\r\n\t\t    });\r\n\t\t}\r\n\t}/*, {\r\n\t\tname: \'Compile Frame\',\r\n\t\tonclick: function(o) {\r\n\t\t    window.DForm.set({\r\n\t\t        frameCode: _.template(o.frameTemplate)({o: o, name: (s) => {return s.replace(/[\\ |\\-|\\.]/g, \'\')}})\r\n\t\t    })\r\n\t\t}\r\n\t}*/, {\r\n\t\tname: \'Test Frame\',\r\n\t\tonclick: function(o) {\r\n\t\t    \r\n\t\t}\r\n\t}])\r\n});";
ret.Title = "Map Builder";
ret.Id = 1588;
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