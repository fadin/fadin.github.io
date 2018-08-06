window.ReportSection = class {
    constructor(year) {
        this._year = year;
        this._start = moment().year(this._year).startOf('year');
        this._end = moment().year(this._year).endOf('year');
    }

    _dates() {
        var ret = [];
        for (var d = moment(this._start); d <= moment(this._end).add({
                Month: 1
            }).startOf('month'); ret.push(moment(d).toDate()), d.add({
                Month: 1
            }));
        return ret;
    }

    _inpatient(o) {
        o = o || {};
        o.pcf_PatType = {
            Id: 730,
            OPERATORS: {
                Name: '='
            }
        };
        return o;
    }

    _outpatient(o) {
        o = o || {};
        o.pcf_PatType = {
            Id: 938,
            OPERATORS: {
                Name: '='
            }
        };
        return o;
    }

    _referring(o) {
        o = o || {};
        o.RefDocCode = {
            Id: -900
        };
        return o;
    }

    _attending(o) {
        o = o || {};
        o.TrDocCode = {
            Id: -900
        };
        return o;
    }

    _pivot(total, format) {
        var ret = [];
        var times = groupBy(total, 'PARTITIONID');
        for (var i = 0; i < times.length; i++) {
            var groups = groupBy(times[i].values, 'name');
            for (var j = 0; j < groups.length; j++) {
                ret.push({
                    Time: moment(times[i].key).format(format).toString(),
                    Dimension: groups[j].key,
                    Aggregation: groups[j].values[0].V0
                });
            }
        }
        return ret;
    }

    _asZingOptions(data) {
        var options = {
            "graphset": []
        };

        for (var g = 0; g < data.labels.length; g++) {
            var gset = {
                type: data.type || "bar",
                options: {},
            };

            if (data.type == "grid") {
                gset.options.style = {
                    ".th": {
                        "y": "0px",
                        "background-color": "#7ca82b",
                        "font-color": "#fff",
                        "font-size": "12",
                        "font-weight": "none",
                        "height": "20px"
                    }
                };
                gset.options["col-labels"] = [];
            }
            gset["stacked"] = data.labels.length > 0;
            gset["plot"] = {
                "value-box": {
                    value: "%v",
                    placement: "top-in",
                    "font-color": "white",
                },
                tooltip: {
                    value: "%v"
                }
            };
            if (data.type != "grid") {
                gset["plotarea"] = {
                    "margin-right": "25%"
                };
                gset["legend"] = {
                    "toggle-action": "hide",
                    "item": {
                        "cursor": "pointer"
                    },
                    "draggable": true,
                    "drag-handler": "icon"
                };
            }
            gset["title"] = {
                "text": data.title,
                "font-family": "arial",
                "x": "40px",
                "y": "5px",
                "align": "left",
                "bold": false,
                "font-size": "16px",
                "font-color": "#000000",
                "background-color": "none"
            };
            gset["subtitle"] = {
                "text": "<i>" + "Between " + moment(data.startDate).format("DD/MM/YYYY") + " and " + moment(data.endDate).format("DD/MM/YYYY") + "</i>",
                "font-family": "arial",
                "x": "40px",
                "y": "25px",
                "align": "left",
                "bold": false,
                "font-size": "16px",
                "font-color": "#7E7E7E",
                "background-color": "none"
            };

            gset.labels = [];
            for (var t = 0; t < gset.labels.length; t++) {
                gset.labels[t] = {
                    "text": gset.labels[t],
                    "hook": "node:plot=2;index=" + t
                };
            }
            gset["scaleX"] = {
                "values": [],
            };
            var labels = groupBy(data.data, data.dimensions[0]);
            for (var i = 0; i < labels.length; i++) {
                gset["scaleX"].values.push(moment(labels[i].key).format(data.interval.Format).toString());
            }

            gset.series = [];
            var gData = groupBy(data.data, data.labels[g]);
            for (var i = 0; i < gData.length; i++) {
                if (data.type == "grid") {
                    gset.options["col-labels"].push(gData[i].key);
                }
                var values = Array(labels.length);
                for (var j = 0; j < gData[i].values.length; j++) {
                    var v = gData[i].values[j];
                    for (var l = 0; l < labels.length; l++) {
                        if (labels[l].key == v[data.dimensions[0]]) {
                            values[l] = parseInt(v[data.values[0]]);
                        }
                    }
                }
                gset.series.push({
                    values: values,
                    text: gData[i].key,
                });
            }

            // for grid type, transpose the values
            if (data.type == "grid") {
                var s = gset.series;
                // the series values need to be transposed
                var series = [];
                for (var _s = 0; _s < gset["scaleX"].values.length; _s++) {
                    series[_s] = {
                        values: [gset["scaleX"].values[_s]]
                    };
                    for (var c = 0; c < s.length; c++) {
                        series[_s].values.push(s[c].values[_s]);
                    }
                }
                gset.series = series;
                gset.options["col-labels"].unshift("");

                var maxColWidth = 20;
                for (var _o = 0; _o < gset.options["col-labels"].length; _o++) {
                    var v = gset.options["col-labels"][_o];
                    if (v.length > maxColWidth - 1) {
                        gset.options["col-labels"][_o] = v.toString().substring(0, maxColWidth);
                    }
                }
            }

            options.graphset.push(gset);
        }
        //console.log(options);
        return options;
    }

    _topData(ar, gField, vField, top) {
        if (!top) {
            return ar;
        }

        ret = [];
        $.each(sr.groupBy(ar, gField), function(key, values) {
            values.values.sort(function(a, b) {
                if (parseFloat(a[vField]) < parseFloat(b[vField])) {
                    return 1;
                } else if (parseFloat(a[vField]) > parseFloat(b[vField])) {
                    return -1;
                } else {
                    return 0;
                }
            });
            $.each(values.values, function(i, v) {
                if (i < top) {
                    ret.push(v);
                }
            });
        });
        return ret;
    }

    _data(total, type, title) {
        return {
            type: type || 'bar' /*grid*/ ,
            data: this._topData(total, "PARTITIONID", "V0", 5),
            labels: ["name"],
            values: ['V0'],
            dimensions: ['PARTITIONID'],
            title: /*"Top " + top + " " + */ title || "",
            startDate: this._start,
            endDate: this._end,
            interval: {
                Month: 1,
                Format: 'MMM/YY'
            },
        };
    }

    'Physicians by Gender'() {
        return sr._("CorporateMeasures.comGroupCounts", null, new Doctor().StatusPhysicians({
            Doc_Sex: {
                Id: -900
            }
        }, this._start, this._end)._identity, [
            new Gender()._identity
        ], this._dates());
    }

    'Physicians by Category'() {
        return sr._("CorporateMeasures.comGroupCounts", null, new Doctor().StatusPhysicians({
            Dos_Code: {
                Id: -900
            }
        }, this._start, this._end)._identity, [
            new DoctorSpeciality()._identity
        ], this._dates());
    }

    'Employees by Job Type'() {
        return sr._("CorporateMeasures.comGroupCounts", null, new Employee().StatusEmployees({
            Job_TypeCode: {
                Id: -900
            }
        }, this._start, this._end)._identity, [
            new JobType()._identity
        ], this._dates());
    }

    'Employees by Status'() {
        return sr._("CorporateMeasures.comGroupCounts", null, new Employee().StatusEmployees({
            Emp_Status: {
                Id: -900
            }
        }, this._start, this._end)._identity, [
            new EmployeeStatus()._identity
        ], this._dates());
    }

    'Employees by Department'() {
        return sr._("CorporateMeasures.comGroupCounts", null, new Employee().StatusEmployees({
            Dep_Code: {
                Id: -900
            }
        }, this._start, this._end)._identity, [
            new Department()._identity
        ], this._dates());
    }

    'Admissions by Type'() {
        return sr._("CorporateMeasures.comGroupCounts", null, new Patient().StatusAdmissions({
            pcf_PatType: {
                Id: -900
            }
        }, this._start, this._end)._identity, [
            new PatientType()._identity
        ], this._dates());
    }

    'Inpatients by Referrals'() {
        sr.bAsync = true;
        return sr._("CorporateMeasures.comGroupCounts", null, new Patient().StatusAdmissions(
            this._referring(this._inpatient()), this._start, this._end)._identity, [
            new Doctor().ReferringStatusAdmissions(this._inpatient(), this._start, this._end)._identity
        ], this._dates());
    }

    'Inpatients by Attending'() {
        sr.bAsync = true;
        return sr._("CorporateMeasures.comGroupCounts", null, new Patient().StatusAdmissions(
            this._attending(this._inpatient()), this._start, this._end)._identity, [
            new Doctor().TreatingStatusAdmissions(this._inpatient(), this._start, this._end)._identity
        ], this._dates());
    }

    'Outpatients by Referrals'() {
        sr.bAsync = true;
        return sr._("CorporateMeasures.comGroupCounts", null, new Patient().StatusAdmissions(
            this._referring(this._outpatient()), this._start, this._end)._identity, [
            new Doctor().ReferringStatusAdmissions(this._outpatient(), this._start, this._end)._identity
        ], this._dates());
    }

    'Outpatients by Attending'() {
        sr.bAsync = true;
        return sr._("CorporateMeasures.comGroupCounts", null, new Patient().StatusAdmissions(
            this._attending(this._outpatient()), this._start, this._end)._identity, [
            new Doctor().TreatingStatusAdmissions(this._outpatient(), this._start, this._end)._identity
        ], this._dates());
    }

    'Inpatients by Department'() {
        return sr._("CorporateMeasures.comGroupCounts", null, new Patient().StatusAdmissions(
            this._inpatient({
                Dep_Code: {
                    Id: -900
                }
            }), this._start, this._end)._identity, [
            new Department()._identity
        ], this._dates());
    }

    'Outpatients by Department'() {
        return sr._("CorporateMeasures.comGroupCounts", null, new Patient().StatusAdmissions(
            this._outpatient({
                Dep_Code: {
                    Id: -900
                }
            }), this._start, this._end)._identity, [
            new Department()._identity
        ], this._dates());
    }

    'Inpatients by Re-admission'() {
        return sr._("CorporateMeasures.comGroupCounts", null, new Patient().StatusAdmissions(
            this._inpatient({
                pcf_AdmBefore: {
                    Id: -900
                }
            }), this._start, this._end)._identity, [
            new AdmittedBefore()._identity
        ], this._dates());
    }

    'AVG LOS by Division'() {
        return sr._("CorporateMeasures.comIdentityValues", null, new Patient().StatusStay({
            Mes_Code: {
                Id: -900
            }
        }, this._start, this._end).TimeInBed(this._start, this._end), [
            new MedicalService()._identity
        ], this._dates(), "(1.0/60)*AVG");
    }

    'Consultations by Division'() {
        return sr._("CorporateMeasures.comGroupCounts", null, new Patient().Consulations({
            Mes_Code: {
                Id: -900
            }
        }, this._start, this._end)._identity, [
            new MedicalService()._identity
        ], this._dates());
    }

    'Inpatients by Coverage'() {
        sr.bAsync = true;
        return sr._("CorporateMeasures.comGroupCounts", null, new Patient().StatusAdmissions(
            this._inpatient({
                Cov_Code: {
                    Id: -900
                }
            }), this._start, this._end)._identity, [
            new Coverage()._identity
        ], this._dates());
    }

    'Outpatients by Coverage'() {
        sr.bAsync = true;
        return sr._("CorporateMeasures.comGroupCounts", null, new Patient().StatusAdmissions(
            this._outpatient({
                Cov_Code: {
                    Id: -900
                }
            }), this._start, this._end)._identity, [
            new Coverage()._identity
        ], this._dates());
    }

    'Lab Exams by Patient Type'() {
        sr.bAsync = true;
        return sr._("CorporateMeasures.comGroupCounts", null, new LabRequestDetail().LabMap({
            pcf_PatType: {
                Id: -900
            }
        }, this._start, this._end)._identity, [
            new PatientType()._identity
        ], this._dates());
    }

    'Operations by Patient Type'() {
        sr.bAsync = true;
        return sr._("CorporateMeasures.comGroupCounts", null, new OprRequestDetail().OperationsMap({
            pcf_PatType: {
                Id: -900
            }
        }, this._start, this._end)._identity, [
            new PatientType()._identity
        ], this._dates());
    }

    'Operations by Medical Acts'() {
        sr.bAsync = true;
        return sr._("CorporateMeasures.comGroupCounts", null, new OprRequestDetail().OperationsMap({
            Opx_MedAct: {
                Id: -900
            }
        }, this._start, this._end)._identity, [
            new MedicalAct()._identity
        ], this._dates());
    }

    'Operations Totals in $1K by Patient Type'() {
        sr.bAsync = true;
        return sr._("CorporateMeasures.comIdentityValues", null, new OprRequestDetail().OperationsMap({
            pcf_PatType: {
                Id: -900
            }
        }, this._start, this._end).GenTotalCC(this._start, this._end), [
            new PatientType()._identity
        ], this._dates(), "1.0/1000*SUM");
    }
};
