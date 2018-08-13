function <%=c.Name.replace(' ', '_')%>(id)
{
	this.EntityClass = {Id: <%=c.Id%>, Name: "<%=c.Name%>"};
	
	this.EntityValues = [];
	this.ValueEntities = [];

	this.Date = null;
	this.Id = id;

<%
    for(var i=0; i<c.EntityAttributes.length; i++){
        var ea = c.EntityAttributes[i];
%>
	/** start: setters and getters for <%=ea.Name%> **/
	this.EntityValues.push({EntityAttribute: {Id: <%=ea.Id%>, Name: "<%=ea.Name%>"}});
	this.<%=ea.Name.replace(' ', '_')%> = function(v, co, id)
	{
		if(co) this._<%=ea.Name.replace(' ', '_')%>_coop = co;
		
		var ev = this.EntityValue("<%=ea.Name%>");
		
		if(id) ev.Id = id;

<%
    var attrN = "";
    if(ea.IsBool) attrN = "Bool";
    if(ea.IsInt) attrN = "Int";
    if(ea.IsLong) attrN = "Long";
    if(ea.IsFloat) attrN = "Float";
    if(ea.IsString) attrN = "String";
    if(ea.IsText) attrN = "Text";
    if(ea.IsDate) attrN = "Date";
    if(ea.EntityType) attrN = "Object";
%>
		var attr = "<%=attrN%>";
		if(arguments.length){
		    // a setter
            this._<%=ea.Name.replace(' ', '_')%> = v;
<%
    if(ea.EntityType){
%>
		    ev[attr + "Value"] = ((v && v.toEntityObject)?v.toEntityObject():v);
<%
    }else{
%>
		    ev[attr + "Value"] = v;
<% } %>
		    this._<%=ea.Name.replace(' ', '_')%>_set = true;

		    // values were given, therefore a setter
		    return this;
		} else {
		    return this._<%=ea.Name.replace(' ', '_')%>;
		}
	}

	this.clear_<%=ea.Name.replace(' ', '_')%> = function()
	{
		this._<%=ea.Name.replace(' ', '_')%>_set = false;
		this._<%=ea.Name.replace(' ', '_')%> = null;
		this._<%=ea.Name.replace(' ', '_')%>_coop = null;
		return this;
	}

	this._<%=ea.Name.replace(' ', '_')%>_set = false;
	this._<%=ea.Name.replace(' ', '_')%> = null;
	this._<%=ea.Name.replace(' ', '_')%>_coop = "";

	/** end: setters and getters for <%=ea.Name%> **/
<% } %>

<%
for(var i=0; i < c.TypedAttributes.length; i++)
{
    var ta = c.TypedAttributes[i];
	var taName = ta.EntityClass.Plural.replace(' ', '_');
%>
	/** start: setters and getters for <%=ta.Name%>_<%=taName%> **/
	this._<%=ta.Name.replace(' ', '_')%>_<%=taName%> = new Array();
	this._<%=ta.Name.replace(' ', '_')%>_<%=taName%>_set;
	this.<%=ta.Name.replace(' ', '_')%>_<%=taName%> = function(v)
	{
		this._<%=ta.Name.replace(" ", "_")%>_<%=taName%> = v;
		this._<%=ta.Name.replace(" ", "_")%>_<%=taName%>_set = true;
		return this;
	}
	this.clear_<%=ta.Name.replace(' ', '_')%>_<%=taName%> = function()
	{
		this._<%=ta.Name.replace(" ", "_")%>_<%=taName%>_set = false;
		this._<%=ta.Name.replace(" ", "_")%>_<%=taName%> = new Array();
		return this;
	}
	/** end: setters and getters for <%=ta.Name.replace(' ', '_')%>_<%=taName%> **/

<% } %>


    this.Equals = function(obj)
    {
        try
        {
            return this.Id==obj.Id && this.EntityClass.Id==obj.EntityClass.Id;
        }
        catch(e)
        {
            return false;
        }
    }

<%
for(var i=0; i<c.EntityAttributes.length; i++)
{
    var ea = c.EntityAttributes[i];
	if(!ea.EntityType) continue;
%>
    this.by<%=ea.EntityType.Name.replace(' ', '_')%> = function(ar)
    {
        var ret = [];
        for(var i=0; i<ar.length; i++){
            for(var j=0; j<ret.length; j++){
                if(ar[i]["_<%=ea.Name.replace(' ', '_')%>]"] && ar[i]["_<%=ea.Name.replace(' ', '_')%>]"].Equals(ret[j])){
                    ret[j]._<%=ea.Name.replace(' ', '_')%>_<%=c.Plural.replace(' ', '_')%>.push(ar[i]);
                }
            }
        }
        return ret;
    }
<% } %>

    this.toString = function()
    {
<%
var _name = null;
for(var i=0; i<c.EntityAttributes.length; i++)
{
    var ea = c.EntityAttributes[i];
    if(ea.EntityType || !ea.IsString) continue;
    if(_name==null) _name = ea;
    if(_name && ea.Name=="name") _name=ea;
}
%>
        return this._<%=_name.Name.replace(" ", "_")%>;
    }
    
    this.EntityValue = function(aName)
    {
		for(var i=0; i<this.EntityValues.length; i++) if(this.EntityValues[i].EntityAttribute.Name==aName) return this.EntityValues[i];
    }

	this.toEntityObject = function(bQuery)
	{
		var ret = new Object();
		if(this.Date) ret.Date = this.Date;
		if(this.Id) ret.Id = this.Id;

		ret.OPERATORS = new Object();
<%
for(var i=0; i<c.EntityAttributes.length; i++)
{
    var ea = c.EntityAttributes[i];
%>
        if(this._<%=ea.Name.replace(' ', '_')%>_set) ret.OPERATORS.<%=ea.Name.replace(' ', '_')%> = this._<%=ea.Name.replace(' ', '_')%>_coop;
<% } %>

		ret.EntityClass = this.EntityClass;

		ret.EntityValues = [];
		ret.OPERATORS.EntityValues = "INTERSECT";
		if(bQuery){
		    // return only set EntityValues
<%
for(var i=0; i<c.EntityAttributes.length; i++)
{
    var ea = c.EntityAttributes[i];
%>
            if(this._<%=ea.Name.replace(' ', '_')%>_set){
                var ev = this.EntityValue("<%=ea.Name%>");
<%
    if(false && ea.EntityType){
%>
                ret.EntityValues.push({Id: ev.Id, EntityAttribute: ev.EntityAttribute, OPERATORS: ev.OPERATORS,
                    EntityValues: this._<%=ea.Name.replace(' ', '_')%>?(this._<%=ea.Name.replace(' ', '_')%>.toEntityObject?this._<%=ea.Name.replace(' ', '_')%>.toEntityObject(true):this._<%=ea.Name.replace(' ', '_')%>):[]});
<%
    }else{
%>
                ret.EntityValues.push(ev);
<%  } %>
            }
<% } %>
		}else{
		    ret.EntityValues = this.EntityValues;
		}
		
		ret.ValueEntities = ret.ValueEntities;
		ret.OPERATORS.ValueEntities = "INTERSECT";

		return ret;
	}
}