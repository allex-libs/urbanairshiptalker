function createLib (execlib) {
  'use strict';

  var lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib;

  var NA_Endpoint = 'https://go.urbanairship.com'; //The base URL for Airship's North American cloud site.
  var EU_Endpoint = 'https://go.airship.eu'; //The base URL for Airship's European cloud site.

  var AcceptHeaderString = 'application/vnd.urbanairship+json; version=3;';
  var ContentTypeJSONString = 'application/json';

  function UATalker(config){
    this.AppKey = config.AppKey;
    this.AppSecret = config.AppSecret;
    this.AppMasterSecret = config.AppMasterSecret;
    this.Endpoint = null;
    if (!!config.Use_NA_Endpoint){
      this.Endpoint = NA_Endpoint;
    }else{
      this.Endpoint = EU_Endpoint;
    }
  }

  UATalker.prototype.destroy = function(){
    this.Endpoint = null;
    this.AppMasterSecret = null;
    this.AppSecret = null;
    this.AppKey = null;
  };

	/* params example
	{
		 "audience": {
				"channel": "<YOUR_CHANNEL_ID>"
		 },
		 "device_types": [
				"web"
		 ],
		 "notification": {
				"alert": "Hello, Web!",
				"web": {
					 "title": "My First Web Push Title",
					 "require_interaction": true,
					 "icon": {
							"url": "https://example.com/icon.png"
					 }
				}
		 }
	}
	*/
  UATalker.prototype.pushNotification = function(params){
    var d = q.defer();
    lib.request(this.Endpoint, {
      headers: {
        Authorization: this.createMasterAuthorizationString(),
        Accept: AcceptHeaderString,
        'Content-Type': ContentTypeJSONString
      },
      parameters: this.createParamObj(params),
      method: 'POST',
      onComplete: this.onPushNotificationComplete.bind(this,d),
      onError: this.onPushNotificationError.bind(this,d)
    });
    return d.promise;
  };

  UATalker.prototype.createMasterAuthorizationString = function(){
    var ret = 'Basic ';
    var key = this.AppKey + ':' + this.AppMasterSecret;
    var buff = new Buffer(key);
    var base64key = buff.toString('base64');
    ret += base64key;
    return ret;
  };

  //TODO checks and polishing
  UATalker.prototype.createParamObj = function(params){
    return {
      audience: {
        channel : params.channel_id
      },
      notification: {
        alert : params.notification_msg
      },
      device_types: [
        'web'
      ]
    };
  };

  UATalker.prototype.onPushNotificationComplete = function(defer, result){
    console.log('Push Notification - Success', result);
    defer.resolve(result);
  };

  UATalker.prototype.onPushNotificationError = function(defer,error){
    console.log('Push Notification - Error', error);
    defer.reject(new lib.Error('PUSH_NOTIFICATION_ERROR', error))
  };

  return {
    UATalker : UATalker
  }
}

module.exports = createLib;
