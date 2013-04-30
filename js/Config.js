
var Config = function() {

    this.serviceUrl = "http://" + window.location.hostname + "/php/"
}

Config.prototype.getServiceUrl = function(){
    return  this.serviceUrl;
}
