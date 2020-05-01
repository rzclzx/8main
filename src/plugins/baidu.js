/* eslint-disable */

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  if (!baidus) {
    document.getElementById('baidus').innerText = " var baidus= true;";
  } else {
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?5c1ee0c96e83faeadf9e6f7fd5648c18";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  }
  
} else if (process.env.NODE_ENV === 'development') {
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?5c1ee0c96e83faeadf9e6f7fd5648c18";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
}

export default ({ app: { router }, store }) => {
  router.afterEach((to, from) => {
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?5c1ee0c96e83faeadf9e6f7fd5648c18";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  })
}
