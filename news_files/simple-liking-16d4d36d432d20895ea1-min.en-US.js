webpackJsonp([46],{2762:function(e,t,i){"use strict";var a=function(e){return e&&e.__esModule?e:{default:e}}(i(26)),n=i(818),o=[],r=null,c=function(){var e=o.map(function(e){return e.itemId}).join(",");n.get("/api/blog-like-count/"+e).then(function(e){var t=e.data;o.forEach(function(e){t.hasOwnProperty(e.itemId)?e.resolve(t[e.itemId]):e.reject()}),o=[],r=null})},s=function(e){return new a.default(function(t,i){o.push({itemId:e,resolve:t,reject:i}),null!==r&&clearTimeout(r),r=setTimeout(c,100)})};e.exports={like:function(e){return n.post("/api/content-items/"+e+"/sentiment/like").then(function(e){return e.data})},getLikeCount:function(e){return s(e)}}},4315:function(e,t,i){var a=i(7),n=i(2762);YUI.add("squarespace-simple-liking",function(e){var t=e.config.win.Static;e.Squarespace.SimpleLike={TEXT_LIKE_VERB_NONE:a("No Likes"),TEXT_LIKE_VERB_SINGULAR:a("Like"),TEXT_LIKE_VERB_PLURAL:a("Likes"),TEXT_LIKE_ACTIVATED:a("You like this"),TEXT_LIKE_SUGGEST:a("Click to like"),attached:!1,attach:function(){if(!this.attached){this.attached=!0;var i;try{localStorage&&((i=e.JSON.parse(localStorage.getItem("squarespace-likes")))||(i={}),localStorage.setItem("squarespace-likes",e.JSON.stringify(i)))}catch(e){i={}}this.eventHandlers=[];var o=e.delegate("click",function(t){var o=t.currentTarget,r=o.getAttribute("data-item-id");if(r){for(var c=0;c<5;++c)e.Squarespace.SimpleLike.burst(o);o.hasClass("clicked")||o.hasClass("float")||n.like(r).then(function(t){if(!0===t.commited){var n=parseInt(o.getAttribute("data-like-count"),10);o.setAttribute("data-like-count",n+1),e.Squarespace.SimpleLike.renderLikeCount(o),o.addClass("clicked");try{localStorage&&(i[r]=!0,localStorage.setItem("squarespace-likes",e.JSON.stringify(i)))}catch(e){console.warn("Unable to save like to local storage: ",e)}}t.error&&(e.Squarespace.Utils.areCookiesEnabled()||e.config.win.alert(a("You need to enable cookies to be able to like something.")))}.bind(this)).catch(function(e){console.error("Something went wrong liking!",e)})}},"body",".sqs-simple-like");this.eventHandlers.push(o),e.all(".sqs-simple-like").each(function(a){var o=a.getAttribute("data-item-id");o&&(t.SQUARESPACE_CONTEXT.websiteSettings.simpleLikingEnabled||a.remove(),i[o]&&a.addClass("clicked"),n.getLikeCount(o).then(function(t){a.setAttribute("data-like-count",t),e.Squarespace.SimpleLike.renderLikeCount(a)}).catch(function(){e.Squarespace.SimpleLike.renderLikeCount(a)}))})}},detach:function(){this.attached=!1,this.eventHandlers.forEach(function(e){e.detach()})},renderLikeCount:function(e){var t=e.getAttribute("data-item-id"),i=e.getAttribute("data-like-count"),a=e.one(".like-count");t&&a&&a.setContent(this.formatLikeText(i))},formatLikeText:function(t){return 0===t?e.Squarespace.SimpleLike.TEXT_LIKE_VERB_NONE:1===t?"1 "+e.Squarespace.SimpleLike.TEXT_LIKE_VERB_SINGULAR:t+" "+e.Squarespace.SimpleLike.TEXT_LIKE_VERB_PLURAL},burst:function(t){var i=t.cloneNode(!0);i.one(".like-count")&&i.one(".like-count").remove();var a=t.one(".like-icon");a&&"none"!==a.getStyle("display")||(a=t),i.setStyles({position:"absolute",left:a.getX()+"px",top:a.getY()+"px"}),e.one(e.config.doc.body).append(i);var n=new e.Anim({node:i,duration:2,easing:e.Easing.easeOut});n.set("to",{curve:e.Squarespace.SimpleLike.randomCurve(i)}),n.on("end",function(){this.get("node").remove()}),n.run(),i.removeClass("clicked"),i.addClass("float")},randomCurve:function(e){for(var t=[],i=Math.floor(2*Math.random())?1:-1,a=Math.floor(2*Math.random())?1:-1,n=e.getX(),o=e.getY(),r=0;r<3;++r)n+=Math.floor(30*Math.random())*i,o+=Math.floor(30*Math.random())*a,t.push([n,o]);return t}},e.config.win.Squarespace.onInitialize(e,function(){t.SQUARESPACE_CONTEXT.websiteSettings.simpleLikingEnabled&&e.Squarespace.SimpleLike.attach()}),e.config.win.Squarespace.onDestroy(e,function(){!0===e.Squarespace.SimpleLike.attached&&e.Squarespace.SimpleLike.detach()})},"1.0",{requires:["anim","json","node","squarespace-util"]})},8038:function(e,t,i){i(4315)}},[8038]);