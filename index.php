<html>
<head>
<title>keeper-18</title>
<meta name="description" content="Статьи обо всём. Преимущественно, об IT.">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name=”fragment” content="!" />
<link rel="stylesheet" href="lib/css/editor.min.css" />
<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
<link href="lib/css/bootstrap.min.css" rel="stylesheet" media="all" type="text/css">
<link href="lib/css/blog.style.css" rel="stylesheet" media="all" type="text/css">
<link href="http://vjs.zencdn.net/5.11.6/video-js.css" rel="stylesheet">

<link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">

<script src="https://code.jquery.com/jquery-3.1.1.min.js"   integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="   crossorigin="anonymous"></script>

<script src="http://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
<script src="lib/js/angular.min.js"></script>
<script src="lib/js/angular-route.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.17/angular-sanitize.min.js"></script>
<script src="lib/js/wysiwyg.min.js"></script>
<script src='lib/js/angular-cookies.min.js'></script>

<script src="lib/js/ng-file-upload-shim.min.js"></script> <!-- for no html5 browsers support -->
<script src="lib/js/ng-file-upload.min.js"></script>

<script src='lib/app/ngApp.js'></script>
<script src='lib/controllers/homeCtrl.js'></script>
<script src='lib/controllers/articleDetailsCtrl.js'></script>
<script src='lib/admin/controllers/addPictureCtrl.js'></script>
<script src='lib/admin/controllers/adminCtrl.js'></script>
<script src='lib/admin/controllers/editContentCtrl.js'></script>
<script src='lib/admin/controllers/addArticleCtrl.js'></script>
<script src='lib/admin/controllers/categoriesHandlerCtrl.js'></script>
<script src='lib/admin/controllers/editArticleCtrl.js'></script>
<script src='lib/admin/controllers/commentsHandlerCtrl.js'></script>

<!-- ---------- ckeditor -------- -->
<script src='lib/js/ckeditor/ckeditor.js'></script>
<script src='lib/js/ckfinder/ckfinder.js'></script>
<script src='lib/js/ckeditor/plugins/youtube/plugin.js'></script>
<!-- ---------- ckediror -------- -->
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-2846616623368708",
    enable_page_level_ads: true
  });
</script>
    <script type="text/javascript">
    var BrowserDetect = {
  init: function () {
      this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
      this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
      this.OS = this.searchString(this.dataOS) || "an unknown OS";
  },
  searchString: function (data) {
  for (var i=0;i<data.length;i++) {
  var dataString = data[i].string;
  var dataProp = data[i].prop;
  this.versionSearchString = data[i].versionSearch || data[i].identity;
  if (dataString) {
  if (dataString.indexOf(data[i].subString) != -1)
  return data[i].identity;
  }
  else if (dataProp)
  return data[i].identity;
  }
  },
  searchVersion: function (dataString) {
  var index = dataString.indexOf(this.versionSearchString);
  if (index == -1) return;
  return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
  },
  dataBrowser: [
  {
  string: navigator.userAgent,
  subString: "Chrome",
  identity: "Chrome"
  },
  { string: navigator.userAgent,
  subString: "OmniWeb",
  versionSearch: "OmniWeb/",
  identity: "OmniWeb"
  },
  {
  string: navigator.vendor,
  subString: "Apple",
  identity: "Safari",
  versionSearch: "Version"
  },
  {
  prop: window.opera,
  identity: "Opera",
  versionSearch: "Version"
  },
  {
  string: navigator.vendor,
  subString: "iCab",
  identity: "iCab"
  },
  {
  string: navigator.vendor,
  subString: "KDE",
  identity: "Konqueror"
  },
  {
  string: navigator.userAgent,
  subString: "Firefox",
  identity: "Firefox"
  },
  {
  string: navigator.vendor,
  subString: "Camino",
  identity: "Camino"
  },
  {
  /* For Newer Netscapes (6+) */
  string: navigator.userAgent,
  subString: "Netscape",
  identity: "Netscape"
  },
  {
  string: navigator.userAgent,
  subString: "MSIE",
  identity: "Internet Explorer",
  versionSearch: "MSIE"
  },
  {
  string: navigator.userAgent,
  subString: "Gecko",
  identity: "Mozilla",
  versionSearch: "rv"
  },
  {
  /* For Older Netscapes (4-) */
  string: navigator.userAgent,
  subString: "Mozilla",
  identity: "Netscape",
  versionSearch: "Mozilla"
  }
  ],
  dataOS : [
  {
  string: navigator.platform,
  subString: "Win",
  identity: "Windows"
  },
  {
  string: navigator.platform,
  subString: "Mac",
  identity: "Mac"
  },
  {
  string: navigator.userAgent,
  subString: "iPhone",
  identity: "iPhone/iPod"
  },
  {
  string: navigator.platform,
  subString: "Linux",
  identity: "Linux"
  }
  ]
};
BrowserDetect.init();
//function addSafariStyle(){
//    if(BrowserDetect.browser == 'Safari'){
//        var style = document.querySelector('#safari');
//      style.innerHTML += '.header-top-block{height: 206px !important;}.phone-email{text-decoration: underline;}.phone-call-order-nd {margin: 8px 0 16px 0;}.show-lead-form a{padding-top: 1px !important; font-size: 1.35em !important; height: 1.58em !important; margin: 12px auto 13px !important; width: 13.5em !important; }.header-slogan span:first-child{line-height: 15px;}.header-phone{top: 21px;}.header-slogan span:nth-child(2){line-height: 16.9px;}#commentName, #commentEmail, #commentText{color: #2f2f2f !important;}#commentName, #commentEmail{line-height: 23px;}';
//    }
//}
//setTimeout(addSafariStyle, 300);
</script>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-89579176-1', 'auto');
    ga('send', 'pageview');

  </script>
    <style id="safari"></style>
</head>
<body>
    <div ng-app="app">
        <ng-view />
    </div>
</body>
<script type="text/javascript" src="https://vk.com/js/api/share.js?93" charset="windows-1251"></script>
<script src="lib/js/connect.facebook.js"></script>
<script src="lib/js/connect.all.js"></script>
<script src="lib/js/angular-socialshare.min.js"></script>