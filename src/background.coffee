chrome = this.chrome
active = true
chrome.browserAction.onClicked.addListener (tab)->
  if active == false
    active = true
    chrome.browserAction.setIcon {
      path: 'icons/ghost64.png'
    }
  else
    active = false
    chrome.browserAction.setIcon {
      path: 'icons/ghost_gray64.png'
    }

requestMethods = {
  'getActive': ->
    active
}

chrome.runtime.onMessage.addListener (request, sender, sendResponse)->
  if typeof requestMethods[request.method] == 'function' then sendResponse({data: requestMethods[request.method]()}) else sendResponse({data:{}})