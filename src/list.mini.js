var MAX_ELEMENTS=500,HASH_MULTIPLIER=37,List=function(){this.h_list=[];this.h_list.length=MAX_ELEMENTS}; List.prototype={Entry:function(c,a){this.key=c;this.val=a;this.next=void 0},get:function(c){var a;a=this.mash(c);if(this.h_list[a]!==void 0)for(a=this.h_list[a];a!==void 0;){if(a.key===c)return a.val;a=a.next}},add:function(c,a){var b,d;d=new this.Entry(c,a);b=this.mash(c);if(this.h_list[b]===void 0)this.h_list[b]=d;else{for(b=this.h_list[b];b.next!==void 0;)b=b.next;b.next=d}},remove:function(c){var a,b,d;a=this.mash(c);if(this.h_list[a]!==void 0)for(d=this.h_list[a];d!==void 0;){if(d.key===c&&b=== void 0){this.h_list[a]=d.next;return}else if(d.key===c)b.next=d.next;b=d;d=d.next}return!1},mash:function(c){var a,b;for(a=b=0;a<c.length;a+=1)b=HASH_MULTIPLIER*b+c.charCodeAt();return b%MAX_ELEMENTS}};