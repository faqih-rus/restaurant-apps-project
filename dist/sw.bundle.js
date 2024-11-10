/*! For license information please see sw.bundle.js.LICENSE.txt */
(()=>{function t(r){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(r)}function r(){"use strict";r=function(){return n};var e,n={},o=Object.prototype,i=o.hasOwnProperty,a=Object.defineProperty||function(t,r,e){t[r]=e.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",s=c.asyncIterator||"@@asyncIterator",f=c.toStringTag||"@@toStringTag";function l(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{l({},"")}catch(e){l=function(t,r,e){return t[r]=e}}function h(t,r,e,n){var o=r&&r.prototype instanceof w?r:w,i=Object.create(o.prototype),c=new T(n||[]);return a(i,"_invoke",{value:S(t,e,c)}),i}function p(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}n.wrap=h;var y="suspendedStart",v="suspendedYield",d="executing",g="completed",m={};function w(){}function b(){}function x(){}var L={};l(L,u,(function(){return this}));var E=Object.getPrototypeOf,_=E&&E(E(F([])));_&&_!==o&&i.call(_,u)&&(L=_);var j=x.prototype=w.prototype=Object.create(L);function k(t){["next","throw","return"].forEach((function(r){l(t,r,(function(t){return this._invoke(r,t)}))}))}function O(r,e){function n(o,a,c,u){var s=p(r[o],r,a);if("throw"!==s.type){var f=s.arg,l=f.value;return l&&"object"==t(l)&&i.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,c,u)}),(function(t){n("throw",t,c,u)})):e.resolve(l).then((function(t){f.value=t,c(f)}),(function(t){return n("throw",t,c,u)}))}u(s.arg)}var o;a(this,"_invoke",{value:function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}})}function S(t,r,n){var o=y;return function(i,a){if(o===d)throw Error("Generator is already running");if(o===g){if("throw"===i)throw a;return{value:e,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=N(c,n);if(u){if(u===m)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===y)throw o=g,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=d;var s=p(t,r,n);if("normal"===s.type){if(o=n.done?g:v,s.arg===m)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(o=g,n.method="throw",n.arg=s.arg)}}}function N(t,r){var n=r.method,o=t.iterator[n];if(o===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,N(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var i=p(o,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,m;var a=i.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,m):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function P(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function G(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function F(r){if(r||""===r){var n=r[u];if(n)return n.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var o=-1,a=function t(){for(;++o<r.length;)if(i.call(r,o))return t.value=r[o],t.done=!1,t;return t.value=e,t.done=!0,t};return a.next=a}}throw new TypeError(t(r)+" is not iterable")}return b.prototype=x,a(j,"constructor",{value:x,configurable:!0}),a(x,"constructor",{value:b,configurable:!0}),b.displayName=l(x,f,"GeneratorFunction"),n.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===b||"GeneratorFunction"===(r.displayName||r.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,x):(t.__proto__=x,l(t,f,"GeneratorFunction")),t.prototype=Object.create(j),t},n.awrap=function(t){return{__await:t}},k(O.prototype),l(O.prototype,s,(function(){return this})),n.AsyncIterator=O,n.async=function(t,r,e,o,i){void 0===i&&(i=Promise);var a=new O(h(t,r,e,o),i);return n.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},k(j),l(j,f,"Generator"),l(j,u,(function(){return this})),l(j,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var r=Object(t),e=[];for(var n in r)e.push(n);return e.reverse(),function t(){for(;e.length;){var n=e.pop();if(n in r)return t.value=n,t.done=!1,t}return t.done=!0,t}},n.values=F,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(G),!t)for(var r in this)"t"===r.charAt(0)&&i.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=i.call(a,"catchLoc"),s=i.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!s)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=r&&r<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=r,o?(this.method="next",this.next=o.finallyLoc,m):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),m},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),G(e),m}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;G(e)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:F(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),m}},n}function e(t,r,e,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void e(t)}c.done?r(u):Promise.resolve(u).then(n,o)}self.importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"),self.workbox.setConfig({debug:!0});var n=self.workbox,o=n.precaching,i=n.routing,a=n.strategies,c=o.precacheAndRoute,u=i.registerRoute,s=a.StaleWhileRevalidate;c([{'revision':'4e0e34f265fae8f33b01b27ae29d9d6f','url':'./sw.bundle.js.LICENSE.txt'},{'revision':'c2e9932b2c3506f3de4abee86c394ccd','url':'app-7bd12dde.bundle.js'},{'revision':'4e0e34f265fae8f33b01b27ae29d9d6f','url':'app-7bd12dde.bundle.js.LICENSE.txt'},{'revision':'86f04fbeabbcfdd20a207d64283206e4','url':'app-d0362038.bundle.js'},{'revision':'4e0e34f265fae8f33b01b27ae29d9d6f','url':'app-d0362038.bundle.js.LICENSE.txt'},{'revision':'7c41f43aaf61539c30e19377daedfc48','url':'app-e4317507.bundle.js'},{'revision':'4e0e34f265fae8f33b01b27ae29d9d6f','url':'app-e4317507.bundle.js.LICENSE.txt'},{'revision':'d10949afc522e6e058712ceb42034f97','url':'app-f6563343.bundle.js'},{'revision':'1a63937d97e187319834de43d1bd0fde','url':'app.webmanifest'},{'revision':'0760fae8cf2d2b172678847987d1d95c','url':'data/DATA.json'},{'revision':'923e1610b9d68d2445eb28d6e0f54aaa','url':'favicon.png'},{'revision':'34d9d8d646af9f294d968811da10e546','url':'icons/icon-128x128.png'},{'revision':'2dd174daa627ee198c37c9dfe8cdc34d','url':'icons/icon-144x144.png'},{'revision':'42ee3d984a8d535d697ccbb4428e8647','url':'icons/icon-152x152.png'},{'revision':'923e1610b9d68d2445eb28d6e0f54aaa','url':'icons/icon-192x192.png'},{'revision':'7f775b04df567c8d90c9bad2c89e2d81','url':'icons/icon-384x384.png'},{'revision':'f6705cd9d5d52d8483a2bf9b47cb5f60','url':'icons/icon-512x512.png'},{'revision':'1d463ddf39f394788393e31e1f0e9dbc','url':'icons/icon-72x72.png'},{'revision':'7619371082a792ebb06768c13bf094bf','url':'icons/icon-96x96.png'},{'revision':'529fc044352d0e2e6a050f8ab2d557a5','url':'images/hero-image_4-large.jpg'},{'revision':'e525873f5e01865e9adbce399696faa6','url':'images/hero-image_4-small.jpg'},{'revision':'529fc044352d0e2e6a050f8ab2d557a5','url':'images/heros/hero-image_4-large.jpg'},{'revision':'e525873f5e01865e9adbce399696faa6','url':'images/heros/hero-image_4-small.jpg'},{'revision':'4ea98fe648a0b853ab379c928b5fd0bf','url':'images/heros/hero-image_4.jpg'},{'revision':'d1152144645d943125f0965bc469daf5','url':'images/heros/white_on_black-removebg-preview (1)-large.jpg'},{'revision':'e0e52ef1b2d50f34699b931e2c2304bb','url':'images/heros/white_on_black-removebg-preview (1)-small.jpg'},{'revision':'da470c6c2c377d2e5bf0eebdca2dfc1d','url':'images/heros/white_on_black-removebg-preview (1).jpg'},{'revision':'05d6e47859fa8fba4b19c11b209759ae','url':'index.html'},{'revision':'0c9881968d9f026bd338fd2551f04deb','url':'vendors-27545368.bundle.js'},{'revision':'e077ff2b51895f26399c3e8e494932ce','url':'vendors-6083c9c7.bundle.js'},{'revision':'4b0ef3557cd7ae17d13427fb27554b86','url':'vendors-ac19a3e4.bundle.js'},{'revision':'162c1179b314275b015ca004a1e41331','url':'vendors-d2eb5610.bundle.js'}]),self.addEventListener("install",(function(){self.skipWaiting()})),self.addEventListener("push",(function(t){var r=t.data.json(),e={title:r.title,options:{body:r.options.body,icon:r.options.icon,image:r.options.image}};t.waitUntil(self.registration.showNotification(e.title,e.options))})),self.addEventListener("notificationclick",(function(t){t.notification.close();var n=function(){var t,n=(t=r().mark((function t(){return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=3,self.clients.openWindow("https://www.dicoding.com/");case 3:case"end":return t.stop()}}),t)})),function(){var r=this,n=arguments;return new Promise((function(o,i){var a=t.apply(r,n);function c(t){e(a,o,i,c,u,"next",t)}function u(t){e(a,o,i,c,u,"throw",t)}c(void 0)}))});return function(){return n.apply(this,arguments)}}();t.waitUntil(n())}));u((function(t){return t.url.href.startsWith("https://restaurant-api.dicoding.dev")}),new s({cacheName:"restaurant-api"}))})();
//# sourceMappingURL=sw.bundle.js.map