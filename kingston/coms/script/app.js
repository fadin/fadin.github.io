var settings = null;
var bDebug = false;

var headerHTML = "";
var footerHTML = "";
var contentHTML = "";

var landingPage = true;

var sr = null;

var pages = [];

var allHTML = "";
var allData = {};
var allOptions = null;

var required = [];

function require(js, css, name, code, fCallback) {
	if ($.inArray(name, required) > -1) {
		if (code && sr) sr.runScript(code);
		if (fCallback) fCallback();
		return;
	}

	$.getScript(js, function() {
		console.log("Require[]: " + name);
		required[required.length] = name;

		if (name == "ServiceRouter") {
			sr = new ServiceRouter();
			sr.Store = company.Store;
			sr.init(null, company.library || "EnterpriseManager", true, bDebug, true);
			if (typeof srURL !== 'undefined') sr.srURL = srURL;

			sr.fLoadingStart = function() {
				if ($.mobile) $.mobile.loading('show');
			};

			sr.fLoadingEnd = function() {
				if ($.mobile) $.mobile.loading('hide');
			};
		} else if (name == "Company") {
			if (!company.Root) company.Root = '';
		}

		if (css) {
			$("<link/>", {
				rel: "stylesheet",
				type: "text/css",
				href: css
			}).appendTo("head");
		}

		if (code && sr) sr.runScript(code);
	}).fail(function(jqxhr, settings, exception) {
		console.log("Require[]: " + name + "? " + exception);
	}).always(function() {
		if (fCallback) fCallback();
	});
}

// later on we will do this through ems by storing libs in as an entity and loading linked entities
var hrefs = [];
hrefs[hrefs.length] = {
	lib: "Company",
	primary: true,
	src: "script/company.js"
};
hrefs[hrefs.length] = {
	lib: "ServiceRouter",
	primary: true,
	src: "script/ServiceRouter.js"
};
hrefs[hrefs.length] = {
	lib: "SweetAlert",
	src: "https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js",
	css: "https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css"
};
hrefs[hrefs.length] = {
	lib: "DataTables",
	src: "https://cdn.datatables.net/1.10.10/js/jquery.dataTables.min.js",
	css: "https://cdn.datatables.net/1.10.10/css/jquery.dataTables.min.css"
};
hrefs[hrefs.length] = {
	lib: "BT Tables",
	src: "//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.9.1/bootstrap-table.min.js",
	css: "//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.9.1/bootstrap-table.min.css"
};
hrefs[hrefs.length] = {
	lib: "Ionic",
	src: "https://cdnjs.cloudflare.com/ajax/libs/ionic/1.3.2/js/ionic.min.js",
	css: "https://cdnjs.cloudflare.com/ajax/libs/ionic/1.3.2/css/ionic.min.css"
};
hrefs[hrefs.length] = {
	lib: "WebIX",
	src: "http://cdn.webix.com/edge/webix.js",
	css: "http://cdn.webix.com/edge/webix.css"
};
hrefs[hrefs.length] = {
	lib: "ThreeJS",
	src: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r74/three.js",
};
hrefs[hrefs.length] = {
	lib: "Kendo UI",
	src: "https://kendo.cdn.telerik.com/2016.1.112/js/kendo.all.min.js",
	css: ["https://kendo.cdn.telerik.com/2016.1.112/styles/kendo.common.min.css", "http://kendo.cdn.telerik.com/2016.1.112/styles/kendo.material.min.css"]
};
hrefs[hrefs.length] = {
	lib: "Semantic UI",
	src: "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.min.js",
	css: "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.min.css"
};
hrefs[hrefs.length] = {
    lib: "LZ-String",
    src: "https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.4.4/lz-string.min.js",
};
hrefs[hrefs.length] = {
	lib: "JQuery Form",
	src: "https://cdnjs.cloudflare.com/ajax/libs/jquery.form/3.51/jquery.form.min.js",
};
hrefs[hrefs.length] = {
    lib: "XLSX",
    src: [
        //"https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.12.2/jszip.js",
        "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.12.3/xlsx.full.min.js",
        ],
};
hrefs[hrefs.length] = {
    lib: "ZingChart",
    src: "https://cdnjs.cloudflare.com/ajax/libs/zingchart/2.6.2/zingchart.min.js",
};
hrefs[hrefs.length] = {
    lib: "DynaTable",
    src: "https://cdnjs.cloudflare.com/ajax/libs/Dynatable/0.3.1/jquery.dynatable.min.js",
    css: "https://cdnjs.cloudflare.com/ajax/libs/Dynatable/0.3.1/jquery.dynatable.min.css",
};
hrefs[hrefs.length] = {
	lib: "JQuery Validate",
	src: "https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.14.0/jquery.validate.min.js",
};
hrefs[hrefs.length] = {
	lib: "AngularJS",
	src: "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.min.js",
};
hrefs[hrefs.length] = {
	lib: "Underscore",
	src: "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js",
};
hrefs[hrefs.length] = {
	lib: "AccordionMenu",
	src: "http://www.jqueryscript.net/demo/Multilevel-Accordion-Menu-Plugin-For-jQuery/js/script.js",
	css: "http://www.jqueryscript.net/demo/Multilevel-Accordion-Menu-Plugin-For-jQuery/css/style.css"
};
hrefs[hrefs.length] = {
	lib: "JSGrid",
	src: "http://js-grid.com/js/jsgrid.min.js",
	css: "http://js-grid.com/css/jsgrid.min.css"
};
hrefs[hrefs.length] = {
	lib: "FancyForm",
	src: "http://fancyjs.com/fancy/build/fancyform-min.js",
	css: "http://fancyjs.com/fancy/build/fancyform-min.css"
};
hrefs[hrefs.length] = {
	lib: "Moment",
	src: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment-with-locales.min.js"
};
hrefs[hrefs.length] = {
	lib: "HTML2Canvas",
	src: "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"
};
hrefs[hrefs.length] = {
	lib: "JQuery Mobile",
	type: "mobile",
	src: "https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js",
	css: "https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css"
};
hrefs[hrefs.length] = {
	lib: "MD5",
	primary: true,
	src: "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core.js",
};
hrefs[hrefs.length] = {
	lib: "Pako",
	src: "https://cdnjs.cloudflare.com/ajax/libs/pako/1.0.3/pako.min.js"
};
hrefs[hrefs.length] = {
	lib: "PapaCSV",
	src: "https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.3.7/papaparse.min.js"
};
hrefs[hrefs.length] = {
	lib: "JQ Transform",
	src: "https://cdn.jsdelivr.net/jquery.jqtransform/1.1/jquery.jqtransform.js",
	css: "https://cdn.jsdelivr.net/jquery.jqtransform/1.1/jqtransform.css"
};
hrefs[hrefs.length] = {
	lib: "Boostrap Select",
	src: "//cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.6.2/js/bootstrap-select.min.js",
	css: "//cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.6.2/css/bootstrap-select.min.css"
};
hrefs[hrefs.length] = {
	lib: "prettyCheckable",
	src: "//cdn.jsdelivr.net/jquery.prettycheckable/1.2/prettyCheckable.js",
	css: "//cdn.jsdelivr.net/jquery.prettycheckable/1.2/prettyCheckable.css"
};
hrefs[hrefs.length] = {
	lib: "JQuery UI",
	type: "desktop",
	src: "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js",
	css: "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css"
};
hrefs[hrefs.length] = {
	lib: "EasyUI",
	//src: "http://www.jeasyui.com/easyui/jquery.easyui.min.js",
	src: "https://cdn.jsdelivr.net/npm/demo-jquery-easyui@1.0.0/jquery.easyui.min.js",
	css: ["http://www.jeasyui.com/easyui/themes/default/easyui.css", "http://www.jeasyui.com/easyui/themes/icon.css", "http://www.jeasyui.com/easyui/themes/color.css"],
};
hrefs[hrefs.length] = {
	lib: "DynaForm",
	src: "script/DynaForm.js",
	css: "http://voky.com.ua/showcase/sky-forms/examples/css/sky-forms.css"
};
hrefs[hrefs.length] = {
	lib: "EasyUI Mobile",
	src: "http://www.jeasyui.com/easyui/jquery.easyui.mobile.js",
	css: "http://www.jeasyui.com/easyui/themes/mobile.css",
},
hrefs[hrefs.length] = {
	lib: "UIkit",
	type: "desktop",
	src: "https://cdnjs.cloudflare.com/ajax/libs/uikit/2.24.2/js/uikit.min.js",
	css: "https://cdnjs.cloudflare.com/ajax/libs/uikit/2.24.2/css/uikit.min.css"
};
hrefs[hrefs.length] = {
	lib: "printThis",
	src: "https://cdnjs.cloudflare.com/ajax/libs/printThis/1.12.3/printThis.min.js",
};
hrefs[hrefs.length] = {
	lib: "Flowchart",
	type: "desktop",
	src: ["https://cdnjs.cloudflare.com/ajax/libs/svg.js/1.0.1/svg.min.js", "http://www.jqueryscript.net/demo/Simple-SVG-Flow-Chart-Plugin-with-jQuery-flowSVG/jquery.scrollTo.min.js", "http://www.jqueryscript.net/demo/Simple-SVG-Flow-Chart-Plugin-with-jQuery-flowSVG/dist/flowsvg.min.js"],
};
hrefs[hrefs.length] = {
	lib: "UIkit DatePicker",
	type: "desktop",
	src: "https://cdnjs.cloudflare.com/ajax/libs/uikit/2.22.0/js/components/datepicker.min.js",
	css: "https://cdnjs.cloudflare.com/ajax/libs/uikit/2.22.0/css/components/datepicker.css"
};
hrefs[hrefs.length] = {
	lib: "UIkit Password",
	type: "desktop",
	src: "https://cdnjs.cloudflare.com/ajax/libs/uikit/2.22.0/js/components/form-password.min.js",
	css: "https://cdnjs.cloudflare.com/ajax/libs/uikit/2.22.0/css/components/form-password.min.css"
};
hrefs[hrefs.length] = {
	lib: "Charts",
	type: "desktop",
	src: "https://cdnjs.cloudflare.com/ajax/libs/canvasjs/1.7.0/canvasjs.min.js",
	//src: "http://canvasjs.com/assets/script/canvasjs.min.js",
};
hrefs[hrefs.length] = {
	lib: "Filters",
	src: "script/filters.js"
};
hrefs[hrefs.length] = {
	lib: "ACE",
	src: "https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/ace.js"
};
hrefs[hrefs.length] = {
	lib: "doT",
	src: "https://cdnjs.cloudflare.com/ajax/libs/dot/1.0.3/doT.min.js"
};
hrefs[hrefs.length] = {
	lib: "Handlebars",
	src: "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.js"
};
hrefs[hrefs.length] = {
	lib: "EJS",
	src: "https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/embeddedjavascript/ejs_production.js",
};
hrefs[hrefs.length] = {
	lib: "XML2JSON",
	src: "https://cdnjs.cloudflare.com/ajax/libs/x2js/1.2.0/xml2json.min.js",
};
hrefs[hrefs.length] = {
	lib: "JQuery NivoSlider",
	src: "https://cdnjs.cloudflare.com/ajax/libs/jquery-nivoslider/3.2/jquery.nivo.slider.min.js"
};
hrefs[hrefs.length] = {
	lib: "NOTY",
	src: "https://cdnjs.cloudflare.com/ajax/libs/jquery-noty/2.3.8/packaged/jquery.noty.packaged.min.js",
	css: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css",
};
hrefs[hrefs.length] = {
	lib: "JQuery Easing",
	src: "https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"
};
hrefs[hrefs.length] = {
	lib: "jsPDF",
	src: "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"
};
hrefs[hrefs.length] = {
	lib: "Tabulator",
	src: "https://cdnjs.cloudflare.com/ajax/libs/tabulator/3.5.3/js/tabulator.min.js",
	css: "https://cdnjs.cloudflare.com/ajax/libs/tabulator/3.5.3/css/tabulator.min.css"
};


var loading = {
	steps: 15,
	loader: null,
	position: 0
};

function step() {
	try {
		if (!loading.loader) {
			$("body").append("<center><div id='topLoader'></div></center>");
			loading.loader = $("#topLoader").percentageLoader({
				width: 256,
				height: 256,
				controllable: true,
				progress: 0,
				onProgressUpdate: function(val) {
					loading.loader.setValue(Math.round(val * 100.0));
				}
			});
		}
	} catch (e) { /*console.log("%LOADER: " + e.message);*/ }

	try {
		loading.loader.setProgress((loading.position++) / loading.steps);
		//loading.loader.setValue(100*loading.position/loading.steps + '%');
	} catch (e) { /*console.log("%LOADER: " + e.message);*/ }
}

var hash = {};

function setURL(url) {
	location.hash = "#" + url;
	fromHash();

	history.pushState({
		_code: allData.page._code
	}, allData.page._title, toHash());
	RenderPage({
		_code: (hash["page"] || 'index')
	})
}

function fromHash() {
	hash = {};
	var a_hash = location.hash.substring(1).split(/[\&\=]+/);
	if (a_hash.length > 1) {
		for (i = 0; i < a_hash.length; i += 2) {
			hash[a_hash[i]] = a_hash[i + 1];
		}
	}
	return hash;
}

function toHash() {
	var ret = "#";
	for (var p in hash) {
		ret += p + "=" + hash[p];
	}
	return ret;
}

function stripHTML(dirtyString) {
	return dirtyString.replace(/<[^>]*>/g, "");
}

function Equals(a, b) {
	// null and undefined are treated as the same: equal
	var _a = a || null;
	var _b = b || null;
	if (_a === _b) return true;
	if (!_a || !_b) return false; // one is null and the other is not

	// if(typeof a === 'undefined' || typeof b === 'undefined') return false; // one is undefined
	if ((_a.toEntityObject && !_b.toEntityObject) || (_b.toEntityObject && !_a.toEntityObject)) return false; // both should be either EMS or non EMS objects

	//console.log("Equals: at this point: a="+_a+", b="+_b);

	// safe: both either EMS or non EMS
	if (_a.toEntityObject) return _a.Equals(_b); // EMS bundels the Equals functions
	if (_a.Id && _b.Id && _a.Id == _b.Id) return true;
	return false;
}

function groupBy(ar, field) {
	var fields = [];
	for (var i = 0; i < ar.length; i++) {
		var fIndex = fields.length;
		for (var j = 0; j < fields.length; j++) {
			if (sr.Equals(fields[j].key, ar[i][field])) {
				// found
				fIndex = j;
				fields[j].values.push(ar[i]);
				break;
			}
		}
		if (fIndex == fields.length) {
			// not found
			fields.push({
				key: ar[i][field],
				values: [ar[i]]
			});
		}
	}

	return fields;
}

function buildTree(arNodes, sParent, sChildren, nParent) {
	// find the children of the nParent node
	var children = [];
	for (var i = 0; i < arNodes.length; i++) {
		try {
			if (nParent) {
				try {
					//console.log("Node: " + arNodes[i]._name + ", Parent: " + nParent._name + ", Equal: " + (arNodes[i][sParent].Equals(nParent)));
				} catch (e) {
					//console.log("WHAT? " + nParent._name + ", " + e.message);
				}
			}
			if (arNodes[i][sParent] == nParent || (arNodes[i][sParent] && arNodes[i][sParent].Equals && arNodes[i][sParent].Equals(nParent)) || (arNodes[i][sParent].Id && arNodes[i][sParent].Id == nParent.Id)) {
				//if(nParent) console.log("found child of " + nParent._name + ": " + arNodes[i]._name);
				//if(!nParent) console.log("found root node : " + arNodes[i]._name);
				children[children.length] = arNodes[i];
			}
		} catch (e) {
			//console.log("i=" + i + ", " + e.message);
		}
	}

	if (nParent) nParent[sChildren] = children;

	for (i = 0; i < children.length; i++) {
		//console.log("Building subtree");
		buildTree(arNodes, sParent, sChildren, children[i]);
	}
}

$("document").ready(function() {
	fromHash();

	var l_hrefs = [];
	for (var i = 0; i < hrefs.length; i++) {
		if (hrefs[i].disabled) continue;
		if (hrefs[i].type && ((isMobile() && hrefs[i].type != "mobile") || (!isMobile() && hrefs[i].type == "mobile"))) {
			continue;
		}

		l_hrefs[l_hrefs.length] = hrefs[i];
	}

	hrefs = l_hrefs;

	var loadContent = function() {
		$.get(company.Root + "blocks" + m() + "/header.htm" + randURL(), function(html) {
			console.log("header loaded");
			headerHTML = html;
		}).always(function() {
			step();
			$.get(company.Root + "blocks" + m() + "/footer.htm" + randURL(), function(html) {
				console.log("footer loaded");
				footerHTML = html;
			}).always(function() {
				step();
				$.get(company.Root + "blocks" + m() + "/content.htm" + randURL(), function(html) {
					console.log("content loaded");
					contentHTML = html;
				}).always(function() {
					step();
					window.lang = hash['lang'] || company.Language || 'en';
					RenderPage({
						_code: (hash['page'] || 'index')
					});
					//setURL("page=" + (hash['page'] || 'index'));
				});
			});
		});
	}

	// loading dependencies
	var loadHREFS = function() {
		if (!hrefs.length) {
			// last step when done
			if (!company.library) {
                window.sr._("emsEntityAttributeFindall", function(eas){
					step();
                    window.EntityClasses = [];
                    for(var i=0; i<eas.length; i++){
                        var ec = null;
                        for(var j=0; j<window.EntityClasses.length; j++){
                            if(window.EntityClasses[j].Id==eas[i].EntityClass.Id){
                                ec = window.EntityClasses[j];
                                eas[i].EntityClass = ec;
                                break;
                            }
                        }
                        if(!ec) window.EntityClasses.push(ec = eas[i].EntityClass);
                
                        ec.EntityAttributes.push(eas[i]);
                    }
                    
                    var EntityClassJS = "script/EntityClass.js";
                    if (!(typeof window.company === 'undefined') && window.company && !window.company.Store) {
                        EntityClassJS = "../ems/script/EntityClass.js";
                    }
                    window.sr.Get(EntityClassJS + "?rand=" + Math.random(), function(html){
                        step();
                        var code = "";
                        for(var i=0; i<window.EntityClasses.length; i++) code += new EJS({text: html}).render({c: window.EntityClasses[i]});

                        window.sr.runScript(code);

                        loadContent();
                    });
                }, {EntityClass: {Company: {Code: company.Code}}});
                return;
			} else {
				loadContent();
			}
		}
		
		if(!hrefs[0]) return;

		if (!hrefs[0].primary && (!(typeof company === 'undefined') && company.Required && $.inArray(hrefs[0].lib, company.Required) == -1)) {
			hrefs.shift();
			loadHREFS();
			return;
		}

		var src = hrefs[0].src;
		if (!(typeof company === 'undefined') && company && !company.Store) {
			if (hrefs[0].lib == "ServiceRouter") src = "../cms/" + src;
			if (hrefs[0].lib == "DynaForm") src = "../ems/" + src;
		}
		var js = Array.isArray(src) ? src : [src];
		for(var j = 0; j < js.length; j++){
    		$.getScript(js[j], function() {
    		    if(!hrefs[0]) return;
    		    
    			console.log("Require[" + (hrefs.length - 1) + "]: " + hrefs[0].lib);
    
    			if (hrefs[0].lib == "ServiceRouter") {
    				sr = new ServiceRouter();
    				sr.Store = company.Store;
    				sr.init(null, company.library || "EnterpriseManager", true, bDebug);
    				if (typeof srURL !== 'undefined') sr.srURL = srURL;
    
    				sr.fLoadingStart = function() {
    					if ($.mobile) $.mobile.loading('show');
    				};
    
    				sr.fLoadingEnd = function() {
    					if ($.mobile) $.mobile.loading('hide');
    				};
    			} else if (hrefs[0].lib == "Company") {
    				if (!company.Root) company.Root = '';
    			}
    
    			if (hrefs[0].css) {
    				var css = Array.isArray(hrefs[0].css) ? hrefs[0].css : [hrefs[0].css];
    
    				for (var s = 0; s < css.length; s++) $("<link/>", {
    					rel: "stylesheet",
    					type: "text/css",
    					href: css[s]
    				}).appendTo("head");
    			}
    
    			if (hrefs[0].code && sr) sr.runScript(hrefs[0].code);
    		}).fail(function(jqxhr, settings, exception) {
    			console.log("Require[" + (hrefs.length - 1) + "]: " + hrefs[0].lib + "? " + exception);
    		}).always(function() {
    			step();
    			hrefs.shift();
    			loadHREFS();
    		});
		}
	};

	loadHREFS();
});

function m() {
	return (isMobile() ? "" : "/d");
	//return "";
}

function isMobile() {
	//return window.sr.isMobile;
	try {
		if (company.Responsive) return false;
	} catch (e) {}

	var check = false;
	(function(a, b) {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
}

function _alert(msg, delay) {
    if(noty){
        noty({text: msg, type: 'success'});
    }else{
        // the default
        $("<div title='Information'><p>" + msg + "</p></div>").dialog();
    }
}

function myReplace(s, arFrom, arTo) {
	for (var i = 0; i < arFrom.length; i++) {
		s = s.replace(new RegExp(arFrom[i], 'g'), arTo[i]);
	}
	return s;
}

function Print(data) {
	var mywindow = window.open('', 'EMS Printed Document', 'height=400,width=600');
	mywindow.document.write('<html><head><title>Printed Document</title>');
	mywindow.document.write('</head><body >');
	mywindow.document.write(data);
	mywindow.document.write('</body></html>');

	mywindow.document.close(); // necessary for IE >= 10
	mywindow.focus(); // necessary for IE >= 10

	mywindow.print();
	mywindow.close();

	return true;
}

function img(dImg) {
	return "data:image/png;base64," + dImg;
}

function end(fCallBack, data) {
	if (!data) data = window.page.data || {};

	data.page = allData.page;
	data.pages = allData.pages;

	doCalls(function() {
		var sHTML = allHTML;
		if (!(typeof EJS === 'undefined')) {
			sHTML = new EJS({
				text: allHTML
			}).render(data);
		} else if (!(typeof doT === 'undefined')) {
			var tempFn = doT.template(allHTML);
			sHTML = tempFn(data);
		} else if (!(typeof Handlebars === 'undefined')) {
			var template = Handlebars.compile(allHTML);
			sHTML = template(data);
		}

		var oContent = $('body');
		if (!isMobile()) {
			oContent.html(sHTML);

			//oContent.hide();
			//oContent.fadeIn(1000);
			document.title = company.Name;
		} else {
			if (false && landingPage) {
				if ($.mobile) $.mobile.autoInitializePage = false;
				oContent.html(sHTML);
				if ($.mobile) $.mobile.initializePage();
				landingPage = false;
			} else {
				var oPage = $(sHTML);
				oPage.appendTo($.mobile.pageContainer);

				var old = true;
				allOptions = allOptions || {};
				if (old) {
					allOptions.dataUrl = allData.page._code;
					if ($.mobile) $.mobile.activePage.remove();
					if ($.mobile) $.mobile.changePage(oPage, allOptions);
				} else {
					$("document").pagecontainer("getActivePage").remove();
					oPage.enhanceWithin();
					$(":mobile-pagecontainer").pagecontainer("change", '#' + data.page._code, allOptions);
					console.log("showed");
				}
			}
		}

		if (company.css) {
			if (isMobile() && company.css.mobile) {
				for (var i = 0; i < company.css.mobile.length; i++) {
					$("<link/>", {
						rel: "stylesheet",
						type: "text/css",
						href: company.css.mobile[i]
					}).appendTo("head");
				}
			} else if (!isMobile() && company.css.desktop) {
				for (var i = 0; i < company.css.desktop.length; i++) {
					$("<link/>", {
						rel: "stylesheet",
						type: "text/css",
						href: company.css.desktop[i]
					}).appendTo("head");
				}
			}
		}
		if (company.js) {
			if (isMobile() && company.js.mobile) {
				for (var i = 0; i < company.js.mobile.length; i++) $.getScript(company.js.mobile[i]);
			} else if (!isMobile() && company.js.desktop) {
				for (var i = 0; i < company.js.desktop.length; i++) $.getScript(company.js.desktop[i]);
			}
		}

		if (company.GACode) {
			// google analytics
			(function(i, s, o, g, r, a, m) {
				i['GoogleAnalyticsObject'] = r;
				i[r] = i[r] || function() {
					(i[r].q = i[r].q || []).push(arguments)
				}, i[r].l = 1 * new Date();
				a = s.createElement(o),
					m = s.getElementsByTagName(o)[0];
				a.async = 1;
				a.src = g;
				m.parentNode.insertBefore(a, m)
			})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
			ga('create', company.GACode, 'auto');
			ga('send', 'pageview');
		}

		if (company.OnPageLoad) {
			company.OnPageLoad(data);
		}

		if (fCallBack) {
			fCallBack(data);
		} else {
			window.sr.PostCache(1000);
		}
	});
}

var _calls = [];

function _c(obj, fCallBack, sMethod) {
	_calls.splice(0, 0, {
		Callback: fCallBack,
		obj: obj,
		Name: sMethod
	});
}

function doCalls(fCallBack) {
	if (!_calls.length) {
		_calls = [];
		if (fCallBack) fCallBack();
		return;
	}

	if (_calls[_calls.length - 1].Name) {
		sr._(_calls[_calls.length - 1].Name, function(ret) {
			if (ret && ret.length && ret[0].Order) {
				ret.sort(function(a, b) {
					if (a.Order < b.Order) return -1;
					if (a.Order > b.Order) return 1;
					return 0;
				});
			}
			if (_calls[_calls.length - 1].Callback) _calls[_calls.length - 1].Callback(ret);
			_calls.pop();
			doCalls(fCallBack);
		}, _calls[_calls.length - 1].obj);
	} else {
		_o(function(ret) {
			if (ret && ret.length && ret[0]._order) {
				ret.sort(function(a, b) {
					if (a._order < b._order) return -1;
					if (a._order > b._order) return 1;
					return 0;
				});
			}
			if (_calls[_calls.length - 1].Callback) _calls[_calls.length - 1].Callback(ret);
			_calls.pop();
			doCalls(fCallBack);
		}, _calls[_calls.length - 1].obj);
	}
}

function _o(fCallBack, obj) {
	step();
	// with the entityattributes already loaded, why do we need to do this again in emsFormValues.
	if(false) sr._("emsEntityValueFindall", function(ret){
		try {
		    // can we use EntityClass.js to convert the array to EntityClass[]?
		    
			fCallBack(ret);
		} catch (e) {
			console.log(obj);
			console.log("_o: " + e.message);
		}
	}, {
		EntityObject: (obj ? obj.toEntityObject(true) : null)
	});
	
	if(true) sr._("emsFormValues", function(ret) {
		try {
			fCallBack(ret);
		} catch (e) {
			console.log(obj);
			console.log("_o: " + e.message);
		}
	}, {
		EntityObject: (obj ? obj.toEntityObject(true) : null)
	});
}

function randURL() {
	return "?__rand=" + Math.random();
}

function toSettings(s, o) {
	return s;
	for (var i = 0; i < s.length; i++) {
		if (!s[i].Parent) {

		}
	}
}

function _lang(code) {
	window.lang = code;
	setURL("page=" + (allData.page._code || 'index'));
}

function RenderPageCMS(page, data, options, fFail) {
	if (!CMS_ROOT) return fFail(page, options);

	sr._("ContentManager.cmsHTMLPageFind", function(ret) {
		if (ret) {
			// store to avoid redundant loading
			ret._code = page._code;

			console.log("Page " + page._code + " found in CMS, serving...");

			allHTML = (ret.Body ? ret.Body : contentHTML);
			if (false && options && options.role && options.role == "dialog") {
				headerHTML = '<div id="' + page._code + '" name="' + page._code + '" data-role="page" data-dialog="true"><div data-role="header" data-theme="b"><h1>Dialog</h1></div><div role="main" class="ui-content">';
				footerHTML = '</div></div>';
			}
			allHTML = headerHTML + allHTML + footerHTML;
			allData = {
				settings: settings,
				page: ret,
				pages: pages
			};
			allOptions = options;

			sr.runScript(ret.Script);

			if (!ret.Script) end();
		} else {
			fFail(page, options);
		}
	}, {
		Page: CMS_ROOT + page._code
	});
}

function RenderPage(page, data, options, fFail) {
	for (var i = 0; i < pages.length; i++) {
		if (pages[i]._code == page._code && pages[i]._language && (pages[i]._language == (window.lang || company.Language || "en"))) {
			console.log((window.lang || company.Language || "en"));
			page = pages[i];
			break;
		}
	}

	page.data = data;
	window.page = page;
	if (!sr.bLocal && (page.Body || page.toEntityObject)) {
		console.log("Page " + page._code + " already loaded, serving...");
		// found the page and it is an object
		allHTML = (contentHTML ? contentHTML : page.Body);
		allHTML = headerHTML + allHTML + footerHTML;
		allData = {
			settings: settings,
			page: page,
			pages: pages
		};
		allOptions = options;

		sr.runScript(page.Script);

		if (!page.Script){
		    end();
		}
	} else {
		RenderPageCMS(page, data, options, function(page, options) {
			console.log("Page " + page._code + " not found in CMS, looking in EMS");
			var eoPage = null;
			try {
				eoPage = new Page().code(page._code, "=");
				if (eoPage.language) eoPage.language(window.lang || company.Language || "en", "=");
			} catch (e) {
				console.log("EMS does not have a Page class, failing on purpose: " + e.message);
			}
			_o(function(ret) {
				if (ret && ret.length) {
					console.log("Page " + page._code + " found in EMS, trying templates");
					page = ret[0];
				} else {
					console.log("Page " + page._code + " not found in EMS, so going local");
				}
				sr.Get(company.Root + "templates" + m() + "/" + page._code + ".htm" + randURL(), function(content) {
					step();
					if (content) {
						console.log("Page " + page._code + " html template found");
						page.Body = content;
					} else {
						console.log("Page " + page._code + " has no html template");
						page.Body = contentHTML || page._content || ("Page " + page._code + " does not exist");
					}

					// only cache pages that come from EMS
					if (page.toEntityObject) pages[pages.length] = page;

					allHTML = headerHTML + page.Body + footerHTML;
					allData = {
						settings: settings,
						page: page,
						pages: pages
					};
					allOptions = options;

					sr.Get(company.Root + "blocks" + m() + "/main.js" + randURL(), function(js) {
						step();
						if (js) {
							console.log("Main script found.");
							sr.runScript(js);
							// problem here, we cannot cascade sr ajax calls yet
							// the script, when done, should not call end(). we call end() in the next get block
						}

						sr.Get(company.Root + "templates" + m() + "/" + page._code + ".js" + randURL(), function(js) {
							step();
							if (js) {
								console.log("Page " + page._code + " script is retrieved");
								page.Script = js;
								sr.runScript(js);
                                // the script, when done, should call end()
							} else {
								end();
							}
						});
					});
				});
			}, eoPage);
		});
	}
}