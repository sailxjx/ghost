// Generated by CoffeeScript 1.6.2
(function() {
  var active, chrome, requestMethods;

  chrome = this.chrome;

  active = false;

  chrome.browserAction.onClicked.addListener(function(tab) {
    return active = active === false ? true : false;
  });

  requestMethods = {
    'getActive': function() {
      return active;
    }
  };

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request, sender, sendResponse);
    if (typeof requestMethods[request.method] === 'function') {
      return sendResponse({
        data: requestMethods[request.method]()
      });
    } else {
      return sendResponse({
        data: {}
      });
    }
  });

}).call(this);
