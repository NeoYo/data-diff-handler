!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(window,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=4)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isFunction=e.isString=e.isObject=e.isArray=void 0,e.isArray=function(t){return"[object Array]"==Object.prototype.toString.call(t)},e.isObject=function(t){return"[object Object]"==Object.prototype.toString.call(t)},e.isString=function(t){return"[object String]"==Object.prototype.toString.call(t)},e.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.syncQueryHOC=e.SyncQueryFactory=e.syncQueryCb=void 0;const r=n(2),i=n(5),o=n(3),c=n(0),s=n(6);e.syncQueryCb=function(t){return function(e,n){e.callbackName=n,c.isArray(t)&&t.length>0&&(e.callbackDeps=t)}};function u(t,e,n,u){return u=c.isObject(u)?Object.assign({wait:300},u):{wait:300},class extends t{constructor(t){super(t),this.prevStateCache={},this.state=Object.assign(Object.assign({},this.state),this.getStateFromURL(e)),this.reBindCallback(!1,!0),this.prevStateCache=this.state,!0===u.disableAutoSync&&(this.triggerSync=()=>{this.stateDiffEffect(this.state)}),this.stateDiffEffect=r.debounce(this.stateDiffEffect,u.wait).bind(this)}getStateFromURL(t){const e=location.href.split("?")[1];if(null!=e)return i.queryToState(e,t,u.parser)}syncStateToURL(t){const[n,r]=location.href.split("?"),c=o.filterQuery(r,(t,n)=>-1===e.indexOf(t)),s=`${n}?${i.stateToQuery(t,u.stringify)}&${c}`;location.href=s}reBindCallback(t=!0,e){if(this.callbackName=this.callbackName||n,null==this.callbackName)return;if("function"!=typeof super[this.callbackName])return void console.error("sync-query: callback must be react component method name!!! Tips:  SyncQueryFactory and syncQueryHOC must be closest with Component Class");const r=Object.create(this);r.setState=(n,r)=>{this.setState(n,r,t,e)},this[this.callbackName]=super[this.callbackName].bind(r),this.callbackDeps=this.callbackDeps||u.callbackDeps}componentDidMount(){const t=super.componentDidMount();return this.reBindCallback(),t}componentDidUpdate(t,e){return!0===this.state.__SYNC_QUERY_DIFF_IGNORE__||!0===u.disableAutoSync||this.stateDiffEffect(this.state),super.componentDidUpdate&&super.componentDidUpdate(t,e)}stateDiffEffect(t){const n=this.prevStateCache;if(null==n&&null==t)return void console.error("sync-query: stateDiffEffect could not be null");const i=r.pick(n,e),o=r.pick(t,e),c=!s.deepEqual(i,o);if(c&&this.syncStateToURL(o),!0===this.state.__SYNC_QUERY_CALLBACK_IGNORE__)return void console.warn("Ingore: sync-query: auto trigger callback，only after ComponentDidMount");const u=this.callbackDeps;if(null==u)c&&this[this.callbackName]&&"function"==typeof this[this.callbackName]&&this[this.callbackName]();else{const e=r.pick(n,u),i=r.pick(t,u);!s.deepEqual(e,i)&&this[this.callbackName]&&"function"==typeof this[this.callbackName]&&this[this.callbackName]()}this.prevStateCache=t}setState(t,e,n,r){return"object"==typeof t?super.setState(Object.assign(Object.assign({},t),{__SYNC_QUERY_DIFF_IGNORE__:n,__SYNC_QUERY_CALLBACK_IGNORE__:r}),e):"function"==typeof t?super.setState((function(e,i){return Object.assign(Object.assign({},t(e,i)),{__SYNC_QUERY_DIFF_IGNORE__:n,__SYNC_QUERY_CALLBACK_IGNORE__:r})}),e):super.setState(t,e)}}}e.SyncQueryFactory=function(t,e,n){return function(r){return u(r,t,e,n)}},e.syncQueryHOC=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.debounce=e.map=e.filterExist=e.filter=e.pick=void 0;const r=n(0);function i(t,e){return r.isObject(t)?Object.keys(t).reduce((n,r)=>("function"!=typeof e&&(e=o),e(n,r,t)?Object.assign(Object.assign({},n),{[r]:t[r]}):n),{}):(console.error(`Param ${t} is not a object`),{})}function o(t,e,n){return null!=n[e]}function c(t,e,n){return null!=n[e]}e.pick=function(t,e){return i(t,(function(t,n,r){return-1!=e.indexOf(n)}))},e.filter=i,e.filterExist=function(t){return i(t,c)},e.map=function(t,e){return r.isObject(t)?Object.keys(t).reduce((n,r)=>(n[r]=e(t[r],r),n),{}):(console.error(`Param ${t} is not a object`),{})},e.debounce=function(t,e){let n;return function(...r){const i=this;clearTimeout(n),n=setTimeout((function(){t.apply(i,r)}),e)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.filterQuery=e.encodeQuery=e.parseQuery=e.formatQuery=e.formatUrl=void 0;const r=n(0);function i(t){return Object.keys(t).sort().map(e=>{const n=t[e];return null==n?"":Array.isArray(n)?n.slice().map(t=>[e,"=",t].join("")).join("&"):e+"="+n}).filter(Boolean).join("&")}e.formatUrl=function(t,e){let n;const r=t.indexOf("://");-1!==r?(n=t.substring(0,r),t=t.substring(r+3)):t.startsWith("//")&&(t=t.substring(2));let o,c=t.split("/"),s=(n?n+"://":"//")+c.shift(),u=c.filter(Boolean).join("/");return c=u.split("#"),2===c.length&&([u,o]=c),s+=u?"/"+u:"",e&&"{}"!==JSON.stringify(e)&&(s+=(2===t.split("?").length?"&":"?")+i(e)),s+=o?"#"+o:"",s},e.formatQuery=i,e.parseQuery=(t,e=decodeURIComponent)=>{const n={},r=t.split("&");for(let t=0;t<r.length;t++){const i=r[t].split("=");n[e(i[0])]=e(i[1]||"")}return n},e.encodeQuery=(t,e=encodeURIComponent)=>Object.entries(t).filter(([t,e])=>void 0!==e).map(([t,n])=>e(t)+(null!=n?"="+e(n):"")).join("&"),e.filterQuery=(t,e)=>r.isString(t)?0===t.length?"":t.split("&").reduce((t,n)=>{const[r,i]=n.split("=");return e(r,i)&&t.push(n),t},[]).join("&"):""},function(t,e,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(t,e,n,r){void 0===r&&(r=n),Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,r){void 0===r&&(r=n),t[r]=e[n]}),i=this&&this.__exportStar||function(t,e){for(var n in t)"default"===n||e.hasOwnProperty(n)||r(e,t,n)};Object.defineProperty(e,"__esModule",{value:!0}),e.SyncQueryFactory=e.syncQueryHOC=e.syncQueryCb=void 0;const o=n(1);Object.defineProperty(e,"syncQueryCb",{enumerable:!0,get:function(){return o.syncQueryCb}}),Object.defineProperty(e,"syncQueryHOC",{enumerable:!0,get:function(){return o.syncQueryHOC}}),Object.defineProperty(e,"SyncQueryFactory",{enumerable:!0,get:function(){return o.SyncQueryFactory}}),i(n(1),e)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.stateToQuery=e.queryToState=e.parseParam=void 0;const r=n(3),i=n(2),o=n(0);function c(t){let e;try{e=JSON.parse(t)}catch(e){console.error(`parseParam error: ${t} can't be JSON.parse. Error: ${e}. Type: ${typeof t}. `)}return e}function s(t){return JSON.stringify(t)}e.parseParam=c,e.queryToState=function(t,e,n){if(!o.isString(t)||0===t.length)return{};const i=r.parseQuery(t);return Object.keys(i).filter(t=>(null==e||e.indexOf(t))>-1).reduce((t,e)=>{const r=(o.isObject(n)&&o.isFunction(n[e])&&n[e]||c)(i[e]);return null!=r&&(t[e]=r),t},{})},e.stateToQuery=function(t,e){if(!o.isObject(t))return"";const n=i.filterExist(t);return r.encodeQuery(i.map(n,(t,n)=>(o.isObject(e)&&o.isFunction(e[n])&&e[n]||s)(t)))}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.deepEqual=void 0,e.deepEqual=function(...t){var e,n,r,i;function o(t,e){var n;if(isNaN(t)&&isNaN(e)&&"number"==typeof t&&"number"==typeof e)return!0;if(t===e)return!0;if("function"==typeof t&&"function"==typeof e||t instanceof Date&&e instanceof Date||t instanceof RegExp&&e instanceof RegExp||t instanceof String&&e instanceof String||t instanceof Number&&e instanceof Number)return t.toString()===e.toString();if(!(t instanceof Object&&e instanceof Object))return!1;if(t.isPrototypeOf(e)||e.isPrototypeOf(t))return!1;if(t.constructor!==e.constructor)return!1;if(t.prototype!==e.prototype)return!1;if(r.indexOf(t)>-1||i.indexOf(e)>-1)return!1;for(n in e){if(e.hasOwnProperty(n)!==t.hasOwnProperty(n))return!1;if(typeof e[n]!=typeof t[n])return!1}for(n in t){if(e.hasOwnProperty(n)!==t.hasOwnProperty(n))return!1;if(typeof e[n]!=typeof t[n])return!1;switch(typeof t[n]){case"object":case"function":if(r.push(t),i.push(e),!o(t[n],e[n]))return!1;r.pop(),i.pop();break;default:if(t[n]!==e[n])return!1}}return!0}if(t.length<1)return!0;for(e=1,n=t.length;e<n;e++)if(r=[],i=[],!o(t[0],t[e]))return!1;return!0}}])}));
//# sourceMappingURL=index.js.map