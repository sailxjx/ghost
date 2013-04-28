chrome = this.chrome
active = false
chrome.browserAction.onClicked.addListener (tab)->
  active = if active == false then true else false

requestMethods = {
  'getActive': ->
    active
}

chrome.runtime.onMessage.addListener (request, sender, sendResponse)->
  if typeof requestMethods[request.method] == 'function' then sendResponse({data: requestMethods[request.method]()}) else sendResponse({data:{}})