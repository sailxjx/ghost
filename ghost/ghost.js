// Generated by CoffeeScript 1.6.2
(function() {
  var bindClick, chrome, config, domainUrlMap, goDev, goPlay, goShopUrl, urlMap;

  chrome = this.chrome;

  config = {
    env: 'dev'
  };

  domainUrlMap = {
    'taobao.com|tmall.com': {
      'detail.tmall.com': 712,
      'item.taobao.com': 712
    },
    'jd.com': {
      'item.jd.com': 544
    },
    '51buy.com': {
      'item.51buy.com': 573
    }
  };

  goShopUrl = 'http://fun.51fanli.com/goshop/go';

  urlMap = {};

  this.unionClick = function() {
    var finalUrl, shopId, u, url;

    u = this.href;
    if (u.indexOf(goShopUrl) >= 0) {
      return true;
    }
    for (url in urlMap) {
      if (u.indexOf(url) >= 0) {
        shopId = urlMap[url];
        break;
      }
    }
    if (typeof shopId === 'undefined') {
      finalUrl = u;
    } else {
      finalUrl = goShopUrl + '?id=' + shopId + '&go=' + encodeURIComponent(u) + '&dn=1';
    }
    this.href = finalUrl;
    return true;
  };

  bindClick = function() {
    var a, aList, startTime, _i, _len;

    startTime = new Date();
    aList = document.getElementsByTagName('a');
    for (_i = 0, _len = aList.length; _i < _len; _i++) {
      a = aList[_i];
      a.onclick = unionClick;
    }
    return console.log("time cost: " + (new Date() - startTime));
  };

  goPlay = function() {
    var d, dd, domain, _i, _len, _ref;

    domain = location.href.split('/')[2];
    for (d in domainUrlMap) {
      _ref = d.split('|');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dd = _ref[_i];
        if (domain.indexOf(dd) >= 0) {
          urlMap = domainUrlMap[d];
          return bindClick();
        }
      }
    }
    return false;
  };

  goDev = function() {
    var domain, url;

    for (domain in domainUrlMap) {
      for (url in domainUrlMap[domain]) {
        urlMap[url] = domainUrlMap[domain][url];
      }
    }
    return bindClick();
  };

  chrome.runtime.sendMessage({
    method: 'getActive'
  }, function(response) {
    return console.log(response);
  });

  if (config.env === 'dev') {
    goDev();
  } else {
    goPlay();
  }

}).call(this);
