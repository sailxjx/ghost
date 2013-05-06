// Generated by CoffeeScript 1.6.2
(function() {
  var bindClick, chrome, ghost, goPlay, goShopUrl, readyForPlay, urlMap;

  chrome = this.chrome;

  ghost = {
    configs: {},
    ready: false,
    drivers: {
      'taobao.com|tmall.com': {
        'urlMap': {
          'detail.tmall.com': 712,
          'item.taobao.com': 712
        },
        'preHook': function(callback) {
          return setTimeout(callback, 1000);
        }
      },
      'jd.com': {
        'urlMap': {
          'item.jd.com': 544
        }
      },
      '51buy.com': {
        'urlMap': {
          'item.51buy.com': 573
        }
      }
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
    var a, aList, _i, _len;

    aList = document.getElementsByTagName('a');
    for (_i = 0, _len = aList.length; _i < _len; _i++) {
      a = aList[_i];
      a.addEventListener('click', function() {
        return unionClick.call(this);
      });
    }
    return true;
  };

  goPlay = function() {
    var d, dd, domain, _i, _len, _ref;

    domain = location.href.split('/')[2];
    for (d in ghost.drivers) {
      _ref = d.split('|');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dd = _ref[_i];
        if (domain.indexOf(dd) >= 0) {
          urlMap = ghost.drivers[d]['urlMap'];
          if (typeof ghost.drivers[d]['preHook'] === 'function') {
            return ghost.drivers[d]['preHook'](bindClick);
          } else {
            return bindClick();
          }
        }
      }
    }
    return false;
  };

  readyForPlay = function() {
    var startTime;

    if (ghost.ready === true) {
      return false;
    } else {
      ghost.ready = true;
    }
    startTime = new Date();
    return chrome.runtime.sendMessage({
      method: 'getActive'
    }, function(response) {
      if (response.data === true) {
        goPlay();
        console.log("time cost: " + (new Date() - startTime));
        return true;
      }
    });
  };

  document.addEventListener('DOMContentLoaded', readyForPlay);

}).call(this);
