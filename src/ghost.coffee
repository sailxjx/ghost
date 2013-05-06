chrome = this.chrome

# ghost
ghost = 
  configs: {}
  ready: false  # ready for action
  # hooks of goplay: include preHook and postHook, divided by domains
  # supported websites and their url patterns
  drivers:
    'taobao.com|tmall.com':
      'urlMap':
        'detail.tmall.com': 712
        'item.taobao.com': 712
      'preHook': (callback)->  # taobao is sth strange, unionClick could not bind to every archor
        setTimeout callback, 1000
    'jd.com':
      'urlMap':
        'item.jd.com': 544
    '51buy.com':
      'urlMap':
        'item.51buy.com': 573

# kill me later
goShopUrl = 'http://fun.51fanli.com/goshop/go'

# urlmap to replace the origin href
urlMap = {}

this.unionClick = ()->
  u = this.href
  return true if u.indexOf(goShopUrl) >= 0
  for url of urlMap
    if u.indexOf(url) >= 0
      shopId = urlMap[url]
      break
  if typeof shopId == 'undefined'
    finalUrl = u
  else
    finalUrl = goShopUrl + '?id=' + shopId + '&go=' + encodeURIComponent(u) + '&dn=1'
  this.href = finalUrl
  return true

bindClick = ->
  aList = document.getElementsByTagName 'a'
  for a in aList
    a.addEventListener 'click', ()->
      unionClick.call(this)
  return true

goPlay = ->
  domain = location.href.split('/')[2]
  for d of ghost.drivers
    for dd in d.split('|')
      if domain.indexOf(dd) >= 0
        urlMap = ghost.drivers[d]['urlMap']
        if typeof ghost.drivers[d]['preHook'] == 'function'
          return ghost.drivers[d]['preHook'] bindClick
        else
          return bindClick()
  return false

readyForPlay = ->
  if ghost.ready == true then return false else ghost.ready = true  # this should be called once
  startTime = new Date()
  chrome.runtime.sendMessage {
      method: 'getActive'
    }, (response)->
      if response.data == true
        goPlay()
        console.log "time cost: " + (new Date() - startTime)
        return true

document.addEventListener 'DOMContentLoaded', readyForPlay