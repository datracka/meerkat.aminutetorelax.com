
var Config = function() {

    this.serviceUrl = "http://meerkat.aminutetorelax.local/php/"
}

Config.prototype.getServiceUrl = function(){
    return  this.serviceUrl;
}
