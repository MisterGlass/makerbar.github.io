webpackJsonp([41],{1175:function(e,t){e.exports={TWITTER:1,FACEBOOK:2,GOOGLE:3,LINKEDIN:4,STUMBLE:5,REDDIT:6,PINTEREST:7,TUMBLR:8}},118:function(e,t){e.exports={TEXT:1,IMAGE:2,QUOTE:4,LINK:5,CHAT:6,AUDIO:7,VIDEO:8,VIDEO_DEPRECATED:9,REVIEW:10,STORE_ITEM:11,EVENT:12,THREAD:13,GALLERY:14,BINARY:15,CSSASSET:16,TWEAKASSET:17,DIGITALGOOD:18,ATTACHMENT:19,EXPORT_WORDPRESS:20,EXPORT_INTERNAL:21,TWEET:50,RSS:51,CHECKIN:52,DELICIOUS:53,KBARTICLE:54}},4318:function(e,t,i){var s=i(1175),n=i(118);YUI.add("squarespace-social-buttons",function(e){e.namespace("Squarespace");var t,i=e.config.win.Static,o=e.Squarespace.SocialButton,r=e.Squarespace.SocialButtons=e.Base.create("socialButtons",e.Base,[],{initializer:function(e){var t=this.get("services");this._buttonConfigs={},this._buttons=[],this._eventHandles=[],t.length>0?(this._scanForButtons(),this._initializeButtons(),this._bindEvents(),this._renderButtons()):this._markButtonsAsEmpty()},_markButtonsAsEmpty:function(){e.all(r.SOCIAL_BUTTON_CONTAINER).addClass("empty")},_scanForButtons:function(){var t=e.all(r.SOCIAL_BUTTON_CONTAINER),s=this.get("services");t.each(function(t){var n=t.getAttribute(r.TITLE),o=i.SQUARESPACE_CONTEXT.website.baseUrl+t.getAttribute(r.FULL_URL),a=parseInt(t.getAttribute(r.RECORD_TYPE),10),u=t.getAttribute(r.ASSET_URL),c=t.getAttribute(r.SYSTEM_DATA_ID),d=e.guid(r.ID_PREFIX);this._buttonConfigs[d]={id:d,title:n,url:o,recordType:a,assetUrl:u,systemDataId:c,services:s,node:t}},this)},_initializeButtons:function(){this._buttons=e.Array.map(e.Object.values(this._buttonConfigs),function(e){return new o(e)})},_bindEvents:function(){this._eventHandles.push(this.after("cleanup",this._defaultDestroy,this))},_renderButtons:function(){this._buttons.filter(this._excludeOnlyPinterest,this).forEach(function(e){var t=e.get("id");e.render(this._buttonConfigs[t].node)},this)},destructor:function(){this.fire("cleanup")},_unbindEvents:function(){this._eventHandles.forEach(function(e){e.detach(),e=null})},_defaultDestroy:function(){this._destroyButtons(),this._unbindEvents(),this.fire("destroyed")},_destroyButtons:function(){this._buttons.forEach(function(e){e.destroy()},this)},_excludeOnlyPinterest:function(e){return e.get("recordType")===n.IMAGE||!this._onlyServiceIsPinterest(e)},_onlyServiceIsPinterest:function(e){var t=e.get("services");return 1===t.length&&t[0]===s.PINTEREST}},{FULL_URL:"data-full-url",ASSET_URL:"data-asset-url",SYSTEM_DATA_ID:"data-system-data-id",RECORD_TYPE:"data-record-type",ID_PREFIX:"social-",TITLE:"data-title",SOCIAL_BUTTON_CONTAINER:".squarespace-social-buttons",ATTRS:{services:{valueFn:function(){return e.Array.map(e.Object.keys(i.SQUARESPACE_CONTEXT.website.shareButtonOptions||{}),function(e){return parseInt(e,10)})}}}});e.config.win.Squarespace.onInitialize(e,function(){t=[],e.all(".squarespace-social-buttons").isEmpty()||t.push(new e.Squarespace.SocialButtons)}),e.config.win.Squarespace.onDestroy(e,function(){t.forEach(function(e){e.destroy()}),t=null})},"1.0",{requires:["array-extras","base","node","squarespace-social-button"]})},4319:function(e,t,i){var s=i(7),n=i(38),o=i(1175);YUI.add("squarespace-social-button",function(e){e.namespace("Squarespace");var t=o,i=function(e){return e},r=e.Squarespace.SocialButton=e.Base.create("socialButton",e.Widget,[],{initializer:function(i){this._servicesRendered={},i.services.forEach(function(e){this._servicesRendered[e]=!1},this),this._open=!1,this._anims={},this._serviceRenderers={},this._serviceRenderers[t.REDDIT]=this._renderReddit,this._serviceRenderers[t.FACEBOOK]=this._renderFacebook,this._serviceRenderers[t.TWITTER]=this._renderTwitter,this._serviceRenderers[t.GOOGLE]=this._renderGoogle,this._serviceRenderers[t.LINKEDIN]=this._renderLinkedIn,this._serviceRenderers[t.STUMBLE]=this._renderStumble,this._serviceRenderers[t.PINTEREST]=this._renderPinterest,this._serviceRenderers[t.TUMBLR]=this._renderTumblr,this.publish("serviceRendered",{defaultFn:this._defaultServiceRendered,context:this}),this.publish("buttonClicked",{defaultFn:this._defaultButtonClicked,preventable:!0,context:this}),this.publish("close",{defaultFn:this.close,preventable:!0,context:this}),this.publish("servicesRendered"),this._serviceContainer=e.Node.create('<div class="ss-social-button-container"></div>')},_defaultServiceRendered:function(e){var t=e.details[0];this._servicesRendered[t]=!0,this._allServicesRendered()&&(this.set("loaded",!0),this.fire("servicesRendered",this))},open:function(){this._open=!0,this._openList()},close:function(){this._open=!1,this._closeList()},_onClick:function(e){this.fire("buttonClicked",e)},_defaultButtonClicked:function(e){this.get("loaded")?this.isOpen()?this.close():this.open():this.get("loading")||(this.once("servicesRendered",function(){this.set("loading",!1)},this),this.set("loading",!0),this._renderServices(),this.open())},isOpen:function(){return this._open},destructor:function(){this._stopAnimations()},_stopAnimations:function(){e.Object.values(this._anims).forEach(function(e){e.stop(),e=null})},_closeList:function(){var t=this.get("contentBox");if(t._node&&t.inDoc()){var i,s=t.one(".ss-social-button-wrapper"),n=t.one(".ss-social-list-wrapper"),o=s.get("offsetWidth"),r=(s.get("offsetHeight"),n.get("offsetWidth"));Math.abs(o-r);n&&n._node&&n.inDoc()&&(i=new e.Anim({node:n,duration:.3,easing:e.Easing.easeOutStrong,to:{height:0,opacity:0}}),this._anims.close=i,i.on("end",function(){n.setStyle("overflow",null),this.fire("listClose")},this),i.run())}},_openList:function(){var t=this.get("contentBox");if(t._node&&t.inDoc()){var i,s,n=t.one(".ss-social-button-wrapper"),o=t.one(".ss-social-list-wrapper"),r=t.one(".ss-social-button-list"),a=n.get("offsetWidth"),u=n.get("offsetHeight"),c=o.get("offsetWidth"),d=Math.abs(a-c);this.get("id");o.setStyles({left:(a<=c?-1:1)*d/2,top:u});var l=e.DOM.viewportRegion(),h=r.get("region"),p=h.height+h.top-(l.height+l.top),T=l.left-h.left,f=T>0;p>0&&o.setStyle("top",parseInt(o.getComputedStyle("top"),10)-p-20),f&&o.setStyle("left",parseInt(o.getComputedStyle("left"),10)+T+20),o&&o._node&&o.inDoc()&&(s=new e.Anim({node:o,duration:.3,easing:e.Easing.easeOutStrong,to:{height:r.get("offsetHeight"),opacity:1}}),this._anims.open=s,s.on("end",function(){o.setStyle("overflow","visible");var t=e.config.win.document;e.UA.touchEnabled&&e.one(t.documentElement).setStyle("cursor","pointer"),i=e.one(t).on("click",function(s){s.target.ancestor(".ss-social-list-wrapper",!0)||(this.fire("close"),i.detach(),i=null,e.one(t.documentElement).setStyle("cursor",""))},this),this.fire("listOpen")},this),s.run())}},_allServicesRendered:function(){return e.Object.values(this._servicesRendered).every(i)},bindUI:function(){var e=this.get("contentBox").one(".ss-social-button-wrapper");this.after("loadingChange",this._onLoadingChange,this),e.on("click",this._onClick,this)},_onLoadingChange:function(){this.get("boundingBox").ancestor(".squarespace-social-buttons").toggleClass("loading",this.get("loading"))},renderUI:function(){var e=this.get("contentBox");e.append('<div class="ss-social-button-wrapper"><div class="ss-social-button"><span class="ss-social-button-icon"></span>'+s("Share")+"</div></div>"),e.append('<div class="ss-social-list-wrapper"><div class="ss-social-button-list"></div></div>'),e.one(".ss-social-button-list")},_renderServices:function(){var e=this.get("contentBox").one(".ss-social-button-list");this.get("services").forEach(function(t){this._serviceRenderers[t].call(this,e)},this)},_defaultTimeoutCb:function(t,i){var a=e.Squarespace.Utils.reverseMap(o),u=n(s("(Social Button) Loading render script for service: {name} too longer than {sub1} seconds. Skipping."),{sub1:r.SCRIPT_TIMEOUT/1e3});return function(){console.warn(e.substitute(u,{name:a[t]})),this.fire("serviceRendered",t),i&&i.hide()}},_defaultFailureCb:function(t,i){var n=e.Squarespace.Utils.reverseMap(o),r=s("(Social Button) Service {name} render script failed to load.");return function(){console.warn(e.substitute(r,{name:n[t]})),this.fire("serviceRendered",t),i&&i.hide()}},_renderReddit:function(i){var n=this._serviceContainer.cloneNode(!0),o=this.get("url");this.get("contentBox");n.addClass("reddit"),n.append(e.Node.create(r.REDDIT_LINK)),n.on("click",function(e){window.open("http://reddit.com/submit?url="+encodeURIComponent(o),s("Submit to Reddit")),e.stopImmediatePropagation()}),i.append(n),this.fire("serviceRendered",t.REDDIT)},_renderTumblr:function(i){var s=this._serviceContainer.cloneNode(!0),n={url:this.get("url"),name:this.get("title")},o=e.QueryString.stringify(n);s.addClass("tumblr"),s.append(e.substitute(r.TUMBLR_TAG_TEMPLATE,{query:o})),i.append(s),e.Get.script(r.TUMBLR_URL,{onSuccess:function(){e.later(400,this,function(){this.fire("serviceRendered",t.TUMBLR)})},onFailure:this._defaultFailureCb(t.TUMBLR,s),onTimeout:this._defaultTimeoutCb(t.TUMBLR,s),timeout:r.SCRIPT_TIMEOUT,context:this,win:e.config.win})},_renderFacebook:function(i){var s=this._serviceContainer.cloneNode(!0),n=this.get("url");s.addClass("facebook"),s.append(e.Node.create(e.substitute(r.FACEBOOK_TAG_TEMPLATE,{url:n}))),i.append(s);var o=e.config.win,a=Static.SQUARESPACE_CONTEXT.facebookAppId;e.Get.script(r.FACEBOOK_URL,{onSuccess:function(){o.FB&&e.later(400,this,function(){o.FB.init({appId:a,xfbml:!1,version:"v2.7"}),o.FB.XFBML&&o.FB.XFBML.parse&&o.FB.XFBML.parse(),this.fire("serviceRendered",t.FACEBOOK)})},onFailure:this._defaultFailureCb(t.FACEBOOK,s),onTimeout:this._defaultTimeoutCb(t.FACEBOOK,s),timeout:r.SCRIPT_TIMEOUT,context:this})},_renderGoogle:function(i){var s=this._serviceContainer.cloneNode(!0),n=this.get("url");s.addClass("google"),s.append(e.Node.create(e.substitute(r.GOOGLE_TAG_TEMPLATE,{url:n}))),i.append(s),e.Get.script(r.GOOGLE_PLUS_URL,{onSuccess:function(){window.gapi&&(gapi.plusone.go(),e.later(400,this,function(){this.fire("serviceRendered",o.GOOGLE),this._googleRendered=!0}))},onFailure:this._defaultFailureCb(t.GOOGLE,s),onTimeout:this._defaultTimeoutCb(t.GOOGLE,s),timeout:r.SCRIPT_TIMEOUT,context:this}),this.fire("serviceRendered",t.GOOGLE)},_renderTwitter:function(i){var n=this._serviceContainer.cloneNode(!0),o=this.get("title"),a=this.get("url");n.append(e.Node.create('<a href="https://twitter.com/share" data-text="'+e.Escape.html(o||"")+'" data-url="'+e.Escape.html(a)+'"class="twitter-share-button">'+s("tweet")+"</a>")),n.addClass("twitter"),i.append(n),e.Get.script(r.TWITTER_URL,{onSuccess:function(){e.later(400,this,function(){this.fire("serviceRendered",t.TWITTER)})},onFailure:this._defaultFailureCb(t.TWITTER,n),onTimeout:this._defaultTimeoutCb(t.TWITTER,n),timeout:r.SCRIPT_TIMEOUT,context:this})},_renderLinkedIn:function(i){var s=this._serviceContainer.cloneNode(!0),n=(this.get("title"),this.get("url"));s.addClass("linkedin"),s.append(e.Node.create(e.substitute(r.LINKEDIN_URL_TEMPLATE,{url:n}))),i.append(s),window.IN=void 0,e.Get.script(r.LINKEDIN_URL,{onSuccess:function(){e.later(400,this,function(){this.fire("serviceRendered",t.LINKEDIN)})},onFailure:this._defaultFailureCb(t.LINKEDIN,s),onTimeout:this._defaultTimeoutCb(t.LINKEDIN,s),timeout:r.SCRIPT_TIMEOUT,context:this})},_renderStumble:function(i){var s=this._serviceContainer.cloneNode(!0),n=this.get("url"),a=this.get("id");s.addClass("stumble"),s.append(e.Node.create(e.substitute(r.STUMBLE_TAG_TEMPLATE,{url:n,id:a}))),i.append(s),e.Get.script(r.STUMBLE_URL,{onSuccess:function(){e.later(400,this,function(){STMBLPN&&(STMBLPN.wasProcessLoaded&&(STMBLPN.wasProcessLoaded=!1),STMBLPN.processWidgets()),this.fire("serviceRendered",o.STUMBLE)})},onFailure:this._defaultFailureCb(t.STUMBLE,s),onTimeout:this._defaultTimeoutCb(t.STUMBLE,s),timeout:r.SCRIPT_TIMEOUT,context:this})},_renderPinterest:function(i){var s=this._serviceContainer.cloneNode(!0),n=this.get("assetUrl"),a=this.get("url"),u=Static.SQUARESPACE_CONTEXT.website.authenticUrl+i.ancestor(".squarespace-social-buttons").getAttribute("data-full-url");this.get("id"),this.get("recordType");this.get("systemDataId")?(s.addClass("pinterest"),s.append(e.Node.create(e.substitute(r.PINTEREST_TAG_TEMPLATE,{url:encodeURIComponent(n||a),pageUrl:encodeURIComponent(u)}))),i.append(s),e.Get.script(r.PINTEREST_URL,{onSuccess:function(){e.later(400,this,function(){this.fire("serviceRendered",o.PINTEREST)},this)},onFailure:this._defaultFailureCb(t.PINTEREST,s),onTimeout:this._defaultTimeoutCb(t.PINTEREST,s),timeout:r.SCRIPT_TIMEOUT,context:this})):this.fire("serviceRendered",t.PINTEREST)}},{TWITTER_URL:"//platform.twitter.com/widgets.js",TUMBLR_URL:"//platform.tumblr.com/v1/share.js",FACEBOOK_URL:"//connect.facebook.net/en_US/sdk.js",LINKEDIN_URL:"//platform.linkedin.com/in.js",GOOGLE_PLUS_URL:"//apis.google.com/js/plusone.js",STUMBLE_URL:"http://platform.stumbleupon.com/1/widgets.js",PINTEREST_URL:"//assets.pinterest.com/js/pinit.js",LINKEDIN_URL_TEMPLATE:'<script type="IN/Share" data-url="{url}" data-counter="right"><\/script>',GOOGLE_TAG_TEMPLATE:'<g:plusone size="medium" annotation="bubble" href="{url}"></g:plusone>',FACEBOOK_TAG_TEMPLATE:'<div id="fb-root"></div><fb:like href="{url}" send="false" layout="button_count" show_faces="true"></fb:like>',PINTEREST_TAG_TEMPLATE:'<a href="//pinterest.com/pin/create/button?url={pageUrl}&media={url}" class="pin-it-button" count-layout="horizontal"><img border="0" src="//assets.pinterest.com/images/PinExt.png" title="'+s("Pin It")+'" /></a>',TUMBLR_TAG_TEMPLATE:'<a href="http://tumblr.com/share/link?{query}" title="'+s("Share on Tumblr")+'" style="display:inline-block; text-indent:-9999px; overflow:hidden; width:81px; height:20px; background:url(\'http://platform.tumblr.com/v1/share_1T.png\') top left no-repeat transparent;">'+s("Share on Tumblr")+"</a>",SCRIPT_TIMEOUT:5e3,STUMBLE_TAG_TEMPLATE:'<su:badge layout="1" location="{url}"></su:badge>',REDDIT_LINK:'<a href="#"><img src="http://www.reddit.com/static/spreddit7.gif" alt="'+s("submit to reddit")+'" border="0" /></a>',ATTRS:{url:{value:window.location.href},title:{value:document.title||window.location.href},services:{},recordType:{},assetUrl:{value:""},systemDataId:{value:""},loaded:{value:!1},loading:{value:!1}}})},"1.0",{requires:["anim","base","escape","node","querystring-stringify","squarespace-util","substitute","widget"]})},681:function(e,t){YUI.add("substitute",function(e,t){var i=e.Lang,s=/(~-(\d+)-~)/g,n=/\{LBRACE\}/g,o=/\{RBRACE\}/g,r=function(t,r,a,u){for(var c,d,l,h,p,T,f,_,E=[],g=t.length;!((c=t.lastIndexOf("{",g))<0)&&(d=t.indexOf("}",c),!(c+1>=d));)T=null,(l=(h=f=t.substring(c+1,d)).indexOf(" "))>-1&&(T=h.substring(l+1),h=h.substring(0,l)),p=r[h],a&&(p=a(h,p,T)),i.isObject(p)?e.dump?i.isArray(p)?p=e.dump(p,parseInt(T,10)):((_=(T=T||"").indexOf("dump"))>-1&&(T=T.substring(4)),p=p.toString===Object.prototype.toString||_>-1?e.dump(p,parseInt(T,10)):p.toString()):p=p.toString():i.isUndefined(p)&&(p="~-"+E.length+"-~",E.push(f)),t=t.substring(0,c)+p+t.substring(d+1),u||(g=c-1);return t.replace(s,function(e,t,i){return"{"+E[parseInt(i,10)]+"}"}).replace(n,"{").replace(o,"}")};e.substitute=r,i.substitute=r},"3.17.2",{requires:["yui-base"],optional:["dump"]})},8041:function(e,t,i){i(4318),i(4319),i(681)}},[8041]);