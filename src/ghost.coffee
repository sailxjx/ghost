chrome = this.chrome

# configs
config = 
  env: 'dev'

# supported websites and their url patterns
domainUrlMap = 
  'taobao.com|tmall.com':
    'detail.tmall.com': 712
    'item.taobao.com': 712
  'jd.com':
    'item.jd.com': 544
  '51buy.com':
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
    eventPrefix = if typeof a.onclick == 'function' then a.onclick else null
    a.addEventListener 'click', ()->
      unionClick.call(this)

goPlay = ->
  domain = location.href.split('/')[2]
  for d of domainUrlMap
    for dd in d.split('|')
      if domain.indexOf(dd) >= 0
        urlMap = domainUrlMap[d]
        return bindClick()
  return false

goDev = ->
  for domain of domainUrlMap
    for url of domainUrlMap[domain]
      urlMap[url] = domainUrlMap[domain][url]
  return bindClick()

window.addEventListener 'load', ()->
  startTime = new Date()
  chrome.runtime.sendMessage {
      method: 'getActive'
    }, (response)->
      if response.data == true
        if config.env == 'dev'
          goDev() 
        else
          goPlay()
        console.log "time cost: " + (new Date() - startTime)