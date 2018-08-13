window.Filters = class {
    constructor() {
        if(!window.me) window.me = {Id: 4};
    }
    
    User() {
        return {Id: window.me?window.me.Id:-1};
    }
    
    Group() {
        return {Active: true, Organization: this.Organization()};
    }
    
    DataSet() {
        return {Active: true, DataSource: this.DataSource()}
    }
    
    Organization() {
        return {Active: true, OrganizationUsers: this.User()};
    }
    
    DataSource() {
        return {Active: true, Organization: this.Organization()};
    }
    
    DataMap() {
        return {Active: true, Organization: this.Organization()};
    }
    
    Batch() {
        return {Active: true, Owner: this.User()};
    }
    
    DataField() {
        return {Active: true, Group: this.Group()};
    }
}

var filters = new window.Filters();