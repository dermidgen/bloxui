/*! bloxui 2014-12-19 */
!function(a,b,c,d){var e="ontouchstart"in c.documentElement,f="touchstart mousedown",g="touchmove mousemove",h="touchend mouseup";e&&a.each("touchstart touchmove touchend".split(" "),function(b,c){a.event.fixHooks[c]=a.event.mouseHooks}),a(c).ready(function(){function b(a){for(var b={},c=a.match(/([^;:]+)/g)||[];c.length;)b[c.shift()]=c.shift().trim();return b}a("table").each(function(){"dnd"==a(this).data("table")&&a(this).tableDnD({onDragStyle:a(this).data("ondragstyle")&&b(a(this).data("ondragstyle"))||null,onDropStyle:a(this).data("ondropstyle")&&b(a(this).data("ondropstyle"))||null,onDragClass:a(this).data("ondragclass")==d&&"tDnD_whileDrag"||a(this).data("ondragclass"),onDrop:a(this).data("ondrop")&&new Function("table","row",a(this).data("ondrop")),onDragStart:a(this).data("ondragstart")&&new Function("table","row",a(this).data("ondragstart")),scrollAmount:a(this).data("scrollamount")||5,sensitivity:a(this).data("sensitivity")||10,hierarchyLevel:a(this).data("hierarchylevel")||0,indentArtifact:a(this).data("indentartifact")||'<div class="indent">&nbsp;</div>',autoWidthAdjust:a(this).data("autowidthadjust")||!0,autoCleanRelations:a(this).data("autocleanrelations")||!0,jsonPretifySeparator:a(this).data("jsonpretifyseparator")||"	",serializeRegexp:a(this).data("serializeregexp")&&new RegExp(a(this).data("serializeregexp"))||/[^\-]*$/,serializeParamName:a(this).data("serializeparamname")||!1,dragHandle:a(this).data("draghandle")||null})})}),jQuery.tableDnD={currentTable:null,dragObject:null,mouseOffset:null,oldX:0,oldY:0,build:function(b){return this.each(function(){this.tableDnDConfig=a.extend({onDragStyle:null,onDropStyle:null,onDragClass:"tDnD_whileDrag",onDrop:null,onDragStart:null,scrollAmount:5,sensitivity:10,hierarchyLevel:0,indentArtifact:'<div class="indent">&nbsp;</div>',autoWidthAdjust:!0,autoCleanRelations:!0,jsonPretifySeparator:"	",serializeRegexp:/[^\-]*$/,serializeParamName:!1,dragHandle:null},b||{}),a.tableDnD.makeDraggable(this),this.tableDnDConfig.hierarchyLevel&&a.tableDnD.makeIndented(this)}),this},makeIndented:function(b){var c,d,e=b.tableDnDConfig,f=b.rows,g=a(f).first().find("td:first")[0],h=0,i=0;if(a(b).hasClass("indtd"))return null;d=a(b).addClass("indtd").attr("style"),a(b).css({whiteSpace:"nowrap"});for(var j=0;j<f.length;j++)i<a(f[j]).find("td:first").text().length&&(i=a(f[j]).find("td:first").text().length,c=j);for(a(g).css({width:"auto"}),j=0;j<e.hierarchyLevel;j++)a(f[c]).find("td:first").prepend(e.indentArtifact);for(g&&a(g).css({width:g.offsetWidth}),d&&a(b).css(d),j=0;j<e.hierarchyLevel;j++)a(f[c]).find("td:first").children(":first").remove();return e.hierarchyLevel&&a(f).each(function(){h=a(this).data("level")||0,h<=e.hierarchyLevel&&a(this).data("level",h)||a(this).data("level",0);for(var b=0;b<a(this).data("level");b++)a(this).find("td:first").prepend(e.indentArtifact)}),this},makeDraggable:function(b){var c=b.tableDnDConfig;c.dragHandle&&a(c.dragHandle,b).each(function(){a(this).bind(f,function(d){return a.tableDnD.initialiseDrag(a(this).parents("tr")[0],b,this,d,c),!1})})||a(b.rows).each(function(){a(this).hasClass("nodrag")||a(this).bind(f,function(d){return"TD"==d.target.tagName?(a.tableDnD.initialiseDrag(this,b,this,d,c),!1):void 0}).css("cursor","move")})},currentOrder:function(){var b=this.currentTable.rows;return a.map(b,function(b){return(a(b).data("level")+b.id).replace(/\s/g,"")}).join("")},initialiseDrag:function(b,d,e,f,i){this.dragObject=b,this.currentTable=d,this.mouseOffset=this.getMouseOffset(e,f),this.originalOrder=this.currentOrder(),a(c).bind(g,this.mousemove).bind(h,this.mouseup),i.onDragStart&&i.onDragStart(d,e)},updateTables:function(){this.each(function(){this.tableDnDConfig&&a.tableDnD.makeDraggable(this)})},mouseCoords:function(a){return event.changedTouches?{x:event.changedTouches[0].clientX,y:event.changedTouches[0].clientY}:a.pageX||a.pageY?{x:a.pageX,y:a.pageY}:{x:a.clientX+c.body.scrollLeft-c.body.clientLeft,y:a.clientY+c.body.scrollTop-c.body.clientTop}},getMouseOffset:function(a,c){var d,e;return c=c||b.event,e=this.getPosition(a),d=this.mouseCoords(c),{x:d.x-e.x,y:d.y-e.y}},getPosition:function(a){var b=0,c=0;for(0==a.offsetHeight&&(a=a.firstChild);a.offsetParent;)b+=a.offsetLeft,c+=a.offsetTop,a=a.offsetParent;return b+=a.offsetLeft,c+=a.offsetTop,{x:b,y:c}},autoScroll:function(a){var d=this.currentTable.tableDnDConfig,e=b.pageYOffset,f=b.innerHeight?b.innerHeight:c.documentElement.clientHeight?c.documentElement.clientHeight:c.body.clientHeight;c.all&&("undefined"!=typeof c.compatMode&&"BackCompat"!=c.compatMode?e=c.documentElement.scrollTop:"undefined"!=typeof c.body&&(e=c.body.scrollTop)),a.y-e<d.scrollAmount&&b.scrollBy(0,-d.scrollAmount)||f-(a.y-e)<d.scrollAmount&&b.scrollBy(0,d.scrollAmount)},moveVerticle:function(a,b){0!=a.vertical&&b&&this.dragObject!=b&&this.dragObject.parentNode==b.parentNode&&(0>a.vertical&&this.dragObject.parentNode.insertBefore(this.dragObject,b.nextSibling)||0<a.vertical&&this.dragObject.parentNode.insertBefore(this.dragObject,b))},moveHorizontal:function(b,c){var d,e=this.currentTable.tableDnDConfig;return e.hierarchyLevel&&0!=b.horizontal&&c&&this.dragObject==c?(d=a(c).data("level"),0<b.horizontal&&d>0&&a(c).find("td:first").children(":first").remove()&&a(c).data("level",--d),void(0>b.horizontal&&d<e.hierarchyLevel&&a(c).prev().data("level")>=d&&a(c).children(":first").prepend(e.indentArtifact)&&a(c).data("level",++d))):null},mousemove:function(b){var c,d,e,f,g,h=a(a.tableDnD.dragObject),i=a.tableDnD.currentTable.tableDnDConfig;return b&&b.preventDefault(),a.tableDnD.dragObject?("touchmove"==b.type&&event.preventDefault(),i.onDragClass&&h.addClass(i.onDragClass)||h.css(i.onDragStyle),d=a.tableDnD.mouseCoords(b),f=d.x-a.tableDnD.mouseOffset.x,g=d.y-a.tableDnD.mouseOffset.y,a.tableDnD.autoScroll(d),c=a.tableDnD.findDropTargetRow(h,g),e=a.tableDnD.findDragDirection(f,g),a.tableDnD.moveVerticle(e,c),a.tableDnD.moveHorizontal(e,c),!1):!1},findDragDirection:function(a,b){var c=this.currentTable.tableDnDConfig.sensitivity,d=this.oldX,e=this.oldY,f=d-c,g=d+c,h=e-c,i=e+c,j={horizontal:a>=f&&g>=a?0:a>d?-1:1,vertical:b>=h&&i>=b?0:b>e?-1:1};return 0!=j.horizontal&&(this.oldX=a),0!=j.vertical&&(this.oldY=b),j},findDropTargetRow:function(b,c){for(var d=0,e=this.currentTable.rows,f=this.currentTable.tableDnDConfig,g=0,h=null,i=0;i<e.length;i++)if(h=e[i],g=this.getPosition(h).y,d=parseInt(h.offsetHeight)/2,0==h.offsetHeight&&(g=this.getPosition(h.firstChild).y,d=parseInt(h.firstChild.offsetHeight)/2),c>g-d&&g+d>c)return b.is(h)||f.onAllowDrop&&!f.onAllowDrop(b,h)||a(h).hasClass("nodrop")?null:h;return null},processMouseup:function(){var b=this.currentTable.tableDnDConfig,d=this.dragObject,e=0,f=0;return this.currentTable&&d?(a(c).unbind(g,this.mousemove).unbind(h,this.mouseup),b.hierarchyLevel&&b.autoCleanRelations&&a(this.currentTable.rows).first().find("td:first").children().each(function(){f=a(this).parents("tr:first").data("level"),f&&a(this).parents("tr:first").data("level",--f)&&a(this).remove()})&&b.hierarchyLevel>1&&a(this.currentTable.rows).each(function(){if(f=a(this).data("level"),f>1)for(e=a(this).prev().data("level");f>e+1;)a(this).find("td:first").children(":first").remove(),a(this).data("level",--f)}),b.onDragClass&&a(d).removeClass(b.onDragClass)||a(d).css(b.onDropStyle),this.dragObject=null,b.onDrop&&this.originalOrder!=this.currentOrder()&&a(d).hide().fadeIn("fast")&&b.onDrop(this.currentTable,d),void(this.currentTable=null)):null},mouseup:function(b){return b&&b.preventDefault(),a.tableDnD.processMouseup(),!1},jsonize:function(a){var b=this.currentTable;return a?JSON.stringify(this.tableData(b),null,b.tableDnDConfig.jsonPretifySeparator):JSON.stringify(this.tableData(b))},serialize:function(){return a.param(this.tableData(this.currentTable))},serializeTable:function(a){for(var b="",c=a.tableDnDConfig.serializeParamName||a.id,d=a.rows,e=0;e<d.length;e++){b.length>0&&(b+="&");var f=d[e].id;f&&a.tableDnDConfig&&a.tableDnDConfig.serializeRegexp&&(f=f.match(a.tableDnDConfig.serializeRegexp)[0],b+=c+"[]="+f)}return b},serializeTables:function(){var b=[];return a("table").each(function(){this.id&&b.push(a.param(this.tableData(this)))}),b.join("&")},tableData:function(b){var c,d,e,f,g=b.tableDnDConfig,h=[],i=0,j=0,k=null,l={};if(b||(b=this.currentTable),!(b&&b.id&&b.rows&&b.rows.length))return{error:{code:500,message:"Not a valid table, no serializable unique id provided."}};f=g.autoCleanRelations&&b.rows||a.makeArray(b.rows),d=g.serializeParamName||b.id,e=d,c=function(a){return a&&g&&g.serializeRegexp?a.match(g.serializeRegexp)[0]:a},l[e]=[],!g.autoCleanRelations&&a(f[0]).data("level")&&f.unshift({id:"undefined"});for(var m=0;m<f.length;m++)if(g.hierarchyLevel){if(j=a(f[m]).data("level")||0,0==j)e=d,h=[];else if(j>i)h.push([e,i]),e=c(f[m-1].id);else if(i>j)for(var n=0;n<h.length;n++)h[n][1]==j&&(e=h[n][0]),h[n][1]>=i&&(h[n][1]=0);i=j,a.isArray(l[e])||(l[e]=[]),k=c(f[m].id),k&&l[e].push(k)}else k=c(f[m].id),k&&l[e].push(k);return l}},jQuery.fn.extend({tableDnD:a.tableDnD.build,tableDnDUpdate:a.tableDnD.updateTables,tableDnDSerialize:a.proxy(a.tableDnD.serialize,a.tableDnD),tableDnDSerializeAll:a.tableDnD.serializeTables,tableDnDData:a.proxy(a.tableDnD.tableData,a.tableDnD)})}(jQuery,window,window.document),function(){var a,b,c,d,e,f,g;a="table[data-sortable]",d=/^-?[£$¤]?[\d,.]+%?$/,g=/^\s+|\s+$/g,f="ontouchstart"in document.documentElement,c=f?"touchstart":"click",b=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)},e={init:function(b){var c,d,f,g,h;for(null==b&&(b={}),null==b.selector&&(b.selector=a),d=document.querySelectorAll(b.selector),h=[],f=0,g=d.length;g>f;f++)c=d[f],h.push(e.initTable(c));return h},initTable:function(a){var b,c,d,f,g,h;if(1===(null!=(h=a.tHead)?h.rows.length:void 0)&&"true"!==a.getAttribute("data-sortable-initialized")){for(a.setAttribute("data-sortable-initialized","true"),d=a.querySelectorAll("th"),b=f=0,g=d.length;g>f;b=++f)c=d[b],"false"!==c.getAttribute("data-sortable")&&e.setupClickableTH(a,c,b);return a}},setupClickableTH:function(a,d,f){var g;return g=e.getColumnType(a,f),b(d,c,function(){var b,c,h,i,j,k,l,m,n,o,p,q,r,s,t,u;for(j="true"===this.getAttribute("data-sorted"),k=this.getAttribute("data-sorted-direction"),b=j?"ascending"===k?"descending":"ascending":g.defaultSortDirection,m=this.parentNode.querySelectorAll("th"),n=0,q=m.length;q>n;n++)d=m[n],d.setAttribute("data-sorted","false"),d.removeAttribute("data-sorted-direction");for(this.setAttribute("data-sorted","true"),this.setAttribute("data-sorted-direction",b),l=a.tBodies[0],h=[],t=l.rows,o=0,r=t.length;r>o;o++)c=t[o],h.push([e.getNodeValue(c.cells[f]),c]);for(j?h.reverse():h.sort(g.compare),u=[],p=0,s=h.length;s>p;p++)i=h[p],u.push(l.appendChild(i[1]));return u})},getColumnType:function(a,b){var c,f,g,h,i;for(i=a.tBodies[0].rows,g=0,h=i.length;h>g;g++)if(c=i[g],f=e.getNodeValue(c.cells[b]),""!==f){if(f.match(d))return e.types.numeric;if(!isNaN(Date.parse(f)))return e.types.date}return e.types.alpha},getNodeValue:function(a){return a?null!==a.getAttribute("data-value")?a.getAttribute("data-value"):"undefined"!=typeof a.innerText?a.innerText.replace(g,""):a.textContent.replace(g,""):""},types:{numeric:{defaultSortDirection:"descending",compare:function(a,b){var c,d;return c=parseFloat(a[0].replace(/[^0-9.-]/g,""),10),d=parseFloat(b[0].replace(/[^0-9.-]/g,""),10),isNaN(c)&&(c=0),isNaN(d)&&(d=0),d-c}},alpha:{defaultSortDirection:"ascending",compare:function(a,b){return a[0].localeCompare(b[0])}},date:{defaultSortDirection:"ascending",compare:function(a,b){var c,d;return c=Date.parse(a[0]),d=Date.parse(b[0]),isNaN(c)&&(c=0),isNaN(d)&&(d=0),c-d}}}},setTimeout(e.init,0),window.Sortable=e}.call(this),+function(a){var b=[],c=function(b){var c=a(b),d=c.attr("am-Tools").split(" "),e=function(b){var e=a(b.target).parent(),f=""==e.attr("am-Selected")?"false":e.attr("am-Selected");e.attr("am-Selected","true"===f?"false":"true"),e.find("td:first-child input[type=checkbox]").prop("checked","true"===f?!1:!0),d.indexOf("select-all")>-1&&"true"===f&&c.find("thead tr th:first-child input[type=checkbox]").prop("checked",!1)},f=function(b){var d=a(b.target);c.find("tbody tr").attr("am-Selected",d.prop("checked").toString()).find("td:first-child input[type=checkbox]").prop("checked",d.prop("checked"))};this.selected=function(){return c.find("tbody tr[am-Selected=true]")},d.indexOf("select-all")>-1&&(c.on("click","tbody tr td",e),c.find("thead tr th:first-child input[type=checkbox]").click(f))};a(document).ready(function(){a("[am-DataTable]").each(function(a,d){b.push(new c(d))})})}(jQuery);