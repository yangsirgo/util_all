
//城市二级联动 使用
!function() {
	"use strict";
	var t = function(t, e) {
		var a = this;
		a.options = e,
			a.data = e.data,
			a.defaultCity = e.defaultcity,
			a.$elem = $(t),
			a.$selectcityvalue = a.$elem.find(".select-value"),
			a.$selectcitylist = a.$elem.find(".selectcity-list"),
			a.$selectcityheader = a.$elem.find(".selectcity-tab-header"),
			a.$provincetab = a.$elem.find(".selectcity-tab-province"),
			a.$citytab = a.$elem.find(".selectcity-tab-city"),
			a.$provincetabcontent = a.$elem.find(".selectcity-tab-content-province"),
			a.$citytabcontent = a.$elem.find(".selectcity-tab-content-city"),
			a.init()
	};
	t.prototype = {
		init: function() {
			var t = this;
			t.$selectcityvalue.click(function() {
				t.$selectcitylist.show(),
					t.$elem.css("zIndex", 11)
			}),
				$(document).click(function(e) {
					0 == $(e.target).closest(".selectcity-list").length && 0 == $(e.target).closest(".select-value").length && (t.$selectcitylist.hide(),
						t.$elem.css("zIndex", 10))
				}),
				t.$selectcityheader.find("a").click(function() {
					return t.$selectcityheader.find("li").removeClass("current"),
						$(this).parent().addClass("current"),
						t.$elem.find(".selectcity-tab-content-item").removeClass("current"),
						$($(this).data("target")).addClass("current"),
						!1
				}),
				t.$provincetabcontent.on("click", "a", function() {
					var e = $(this);
					return e.parent().hasClass("current") || (e.parent().siblings().removeClass("current"),
						e.parent().addClass("current"),
						t.initcitydata(t.getCityData(e.data("value"))),
						t.$provincetab.html(e.text() + "<i></i>"),
						t.$provincetab.data("value", e.data("value")),
						t.$citytab.html("请选择<i></i>"),
						t.$citytab.trigger("click")),
						!1
				}),
				t.$citytabcontent.on("click", "a", function() {
					var e = $(this);
					e.parent().siblings().removeClass("current"),
						e.parent().addClass("current"),
						t.$citytab.html(e.text() + "<i></i>");
					var a = e.text();
					return e.text() != t.$provincetab.text() && (a = e.text()),
						t.$selectcityvalue.find("span").text(a),
						t.$selectcityvalue.data("cityvalue", e.data("value")),
						t.$selectcityvalue.data("provincevalue", t.$provincetab.data("value")),
						t.$selectcitylist.hide(),
						t.$elem.css("zIndex", 10),
						t.$elem.trigger("changed", t.getValue()),
						!1
				}),
				t.initprovincedata(),
			t.defaultCity && (t.$provincetabcontent.find("a[data-value=" + t.defaultCity.provinceId + "]").click(),
				t.$citytabcontent.find("a[data-value=" + t.defaultCity.cityId + "]").click())
		},
		setValue: function(t) {
			var e = this;
			e.$provincetabcontent.find("a[data-value=" + t.provinceId + "]").click(),
				e.$citytabcontent.find("a[data-value=" + t.cityId + "]").click()
		},
		getValue: function() {
			var t = this,
				e = {};
			return e.provincevalue = t.$selectcityvalue.data("provincevalue"),
				e.cityvalue = t.$selectcityvalue.data("cityvalue"),
				e
		},
		initprovincedata: function(t) {
			var e = this;
			e.$provincetabcontent.find("ul").empty();
			for (var a = "", i = 0; i < e.data.length; i++)
				a += t && t == e.data[i].value ? '<li class="current"><a data-value="' + e.data[i].value + '" href="#">' + e.data[i].text + "</a></li>" : '<li><a data-value="' + e.data[i].value + '" href="#">' + e.data[i].text + "</a></li>";
			e.$provincetabcontent.find("ul").append(a)
		},
		initcitydata: function(t, e) {
			var a = this;
			a.$citytabcontent.find("ul").empty();
			for (var i = "", c = 0; c < t.length; c++)
				i += e && t[c].value == e ? '<li class="current"><a data-value="' + t[c].value + '" href="#">' + t[c].text + "</a></li>" : '<li><a data-value="' + t[c].value + '" href="#">' + t[c].text + "</a></li>";
			a.$citytabcontent.find("ul").append(i)
		},
		getCityData: function(t) {
			for (var e = this, a = 0; a < e.data.length; a++)
				if (e.data[a].value == t)
					return e.data[a].city;
			return []
		}
	},
		$.fn.selectcity = function(e) {
			return this.each(function() {
				var a = $(this)
					, i = a.data("selectcity");
				if (!i) {
					var c = $.extend({}, $.fn.selectcity.defaults, a.data(), "object" == typeof e && e);
					a.data("selectcity", new t(this,c))
				}
			})
		}
		,
		$.fn.selectcity.defaults = {}
}();

//定位一个元素浮动
!function () {
	"use strict";
	function e(e, t) {
		var o = this;
		o.$element = e,
			o.$window = $(window),
			o.$parent = e.parent(),
			o.parentTop = null,
			o.offset = t.offset,
			o.compareBottomOffset = t.compareBottomOffset,
			o.compareTopOffset = t.compareTopOffset,
			o.$bottomCompare = t.$bottomCompare,
			o.bottomCompare = null,
			o.elementHeight = null,
			o.bottomCompareHeight = null,
			o.timer = null,
			o.init()
	}

	e.prototype = {
		init: function () {
			var e = this;
			e.$window.on("scroll", function () {
				e.$element.is(":visible") && (e.getDataWhenVisible(),
					clearTimeout(e.timer),
					e.timer = setTimeout(function () {
						var t = e.$window.scrollTop();
						if (e.$bottomCompare && t > e.bottomCompare) {
							var o = e.bottomCompareHeight - e.elementHeight + e.compareBottomOffset;
							0 > o && (o = 0),
								e.$element.css({
									top: o
								}),
								e.$element.removeClass("fixed"),
								e.$element.trigger("reset")
						} else
							t > e.parentTop - e.offset ? (e.$element.addClass("fixed"),
								e.$element[0].style.cssText = "") : (e.$element.removeClass("fixed"),
								e.$element[0].style.cssText = "",
								e.$element.trigger("reset"))
					}, 20))
			}).trigger("scroll")
		},
		getDataWhenVisible: function () {
			var e = this;
			!e.parentTop && e.$element.is(":visible") && (e.parentTop = e.$parent.offset().top,
			e.$bottomCompare && (e.elementHeight = e.$element.outerHeight(),
				e.bottomCompareHeight = e.$bottomCompare.outerHeight(),
				e.bottomCompareTop = e.$bottomCompare.offset().top,
				e.bottomCompare = e.bottomCompareTop + e.bottomCompareHeight - e.compareTopOffset - e.elementHeight + e.compareBottomOffset))
		}
	},
		$.fn.floatbar = function (t) {
			return this.each(function () {
				var o = $(this)
					, m = o.data("floatbar")
					, a = $.extend({}, $.fn.floatbar.defaults, o.data(), "object" == typeof t && t);
				m || o.data("floatbar", m = new e($(this), a))
			})
		}
		,
		$.fn.floatbar.defaults = {
			offset: 0,
			compareTopOffset: 0,
			compareBottomOffset: 0
		}
}();

//页面中大tabs切换
!function () {
	"use strict";
	function t(t, e) {
		var a = this;
		a.delay = e.delay,
			a.trigger = e.trigger,
			a.$element = $(t),
			a.$tabItem = $(e.tabitem, a.$element);
		var n = $(a.$tabItem.data("target"));
		a.$tabContentItem = n.add(n.siblings()),
			a.showTimer = null,
			a.hideTimer = null,
			a.init()
	}

	t.prototype = {
		init: function () {
			var t = this
				, e = function (e) {
				var a = $(e.data("target"));
				t.$tabItem.removeClass("current"),
					e.addClass("current"),
					t.$tabContentItem.removeClass("current"),
					a.addClass("current"),
					t.$element.trigger("changed", {
						text: e.text(),
						value: e.data("value")
					})
			};
			"hover" == t.trigger ? t.$tabItem.on("mouseenter", function () {
				var a = $(this);
				t.showTimer = setTimeout(function () {
					e(a)
				}, t.delay)
			}).on("mouseleave", function () {
				clearTimeout(t.showTimer)
			}) : t.$tabItem.on("click", function () {
				return e($(this)),
					!1
			})
		},
		show: function () {
			this.$target.show(),
				this.$arrow.addClass("active")
		},
		hide: function () {
			this.$target.hide(),
				this.$arrow.removeClass("active")
		}
	},
		$.fn.tab = function (e) {
			return this.each(function () {
				var a = $(this)
					, n = a.data("tab")
					, i = $.extend({}, $.fn.tab.defaults, a.data(), "object" == typeof e && e);
				n || a.data("tab", n = new t(this, i))
			})
		}
		,
		$.fn.tab.defaults = {
			trigger: "hover",
			delay: 100,
			tabitem: ".tab-item"
		}
}();
!function () {
	var e = function (e, t) {
		var l = this;
		l.options = t,
			l.$elem = e,
			l.$select = $(".select-value", e),
			l.$selectSpan = $("span", l.$select),
			l.$list = $(".select-list", e),
			l.$ul = l.$list.find("ul"),
			l.init()
	};
	e.prototype = {
		constructor: e,
		init: function () {
			var e = this;
			e.$select.on("click", $.proxy(e.show, e)),
				e.$list.on("click", "a", $.proxy(function (t) {
					var l = $(t.target);
					return e.setValue(l.data("value")),
						this.hide(),
						!1
				}, e)),
				$(document).on("click.select.body", function (t) {
					var l = $(t.target).closest(e.$elem);
					0 == l.length && e.hide()
				}),
			e.options.data && e.setData(e.options.data)
		},
		setData: function (e) {
			var t = e.data
				, l = e.placeholder
				, a = e.value
				, s = this;
			s.$ul.empty();
			for (var n = "", i = 0; i < t.length; i++)
				n += '<li><a href="#" data-value="' + t[i].value + '">' + t[i].text + "</a></li>";
			s.$ul.html(n),
				null != a ? s.setValue(a) : s.setPlaceholder(l)
		},
		setValue: function (e) {
			var t = this
				, l = this.getValue()
				, a = this.$ul.find("li a[data-value='" + e + "']")
				, s = a.text();
			e != l.value && (this.options.onChanging ? this.options.onChanging({
				text: s,
				value: e,
				change: function () {
					t.$selectSpan.text(s),
						t.$select.removeClass("default"),
						t.$selectSpan.data("value", e),
						t.$elem.trigger("changed", {
							text: s,
							value: e
						}),
						t.$ul.find("li").removeClass("current"),
						a.parent().addClass("current")
				}
			}) : (t.$selectSpan.text(s),
				t.$select.removeClass("default"),
				t.$selectSpan.data("value", e),
				t.$elem.trigger("changed", {
					text: s,
					value: e
				}),
				t.$ul.find("li").removeClass("current"),
				a.parent().addClass("current")))
		},
		setPlaceholder: function (e) {
			this.$selectSpan.text(e),
				this.$select.addClass("default"),
				this.$selectSpan.data("value", null),
				this.$ul.find("li").removeClass("current")
		},
		getElement: function () {
			return this.$elem[0]
		},
		getValue: function () {
			return {
				text: this.$selectSpan.text(),
				value: this.$selectSpan.data("value")
			}
		},
		show: function () {
			var e = this;
			e.$elem.hasClass("select-disabled") || (e.$elem.css("zIndex", 11),
				e.$elem.addClass("active").trigger("show", e),
				e.$list.show(),
			0 == e.$elem.find(".select-list li:visible").length && e.$list.hide())
		},
		hide: function () {
			this.$elem.css("zIndex", 10),
				this.$list.hide(),
				this.$elem.removeClass("active").trigger("hide", this)
		},
		disabled: function () {
			that.$elem.hasClass("select-disabled") ? that.$elem.removeClass("select-disabled") : that.$elem.addClass("select-disabled")
		}
	},
		$.fn.select = function (t) {
			return this.each(function () {
				var l = $(this)
					, a = l.data("select")
					, s = $.extend({}, $.fn.select.defaults, l.data(), t);
				a || l.data("select", a = new e(l, s)),
				"string" == typeof t && a[t]()
			})
		}
		,
		$.fn.select.defaults = {
			onChanging: null
		}
}();
function Pager(i, t, e, s, a) {
	this.id = i,
		this.pindex = t,
		this.psize = e,
		this.tsize = s,
		this.tpage = parseInt(this.tsize / this.psize),
	this.tsize % this.psize != 0 && (this.tpage += 1),
		this.getNums = function () {
			var i = {};
			i.left = [],
				i.middle = [],
				i.right = [],
				i.not = this.tpage > 7 ? !0 : !1;
			for (var t = [], e = 1; e <= this.tpage; e++)
				t[t.legnth] = e;
			if (this.tpage <= 7)
				for (var e = 1; e <= this.tpage; e++)
					i.left[i.left.length] = e;
			else if (this.pindex >= 1 && this.pindex <= 4) {
				for (var e = 1; 5 >= e; e++)
					i.left[i.left.length] = e;
				for (var e = this.tpage - 1; e <= this.tpage; e++)
					i.right[i.right.length] = e
			} else if (this.pindex > this.tpage - 4 && this.pindex <= this.tpage) {
				for (var e = 1; 2 >= e; e++)
					i.left[i.left.length] = e;
				for (var e = this.tpage - 4; e <= this.tpage; e++)
					i.right[i.right.length] = e
			} else {
				for (var e = 1; 2 >= e; e++)
					i.left[i.left.length] = e;
				i.middle[i.middle.length] = this.pindex - 1,
					i.middle[i.middle.length] = this.pindex,
					i.middle[i.middle.length] = this.pindex + 1;
				for (var e = this.tpage - 1; e <= this.tpage; e++)
					i.right[i.right.length] = e
			}
			return i
		}
		,
		this.go = function () {
			a && a(this)
		}
		,
		this.build = function () {
			if (this.tsize > 0) {
				var i = this.getNums()
					, t = ""
					, e = 1
					, s = this.tpage;
				this.pindex > 2 && (e = this.pindex - 1),
				this.pindex < this.tpage && (s = this.pindex + 1);
				if (t += '<div class="pager">',
						t += ' 	<a href="javascript:void(0)" class="pager-last" ',
						t += ' onClick="' + a + "(" + e + "," + this.psize + ",this"+');return false;"><i></i></a>',
						t += '		<span class="pager-pageindex">',
					i.left.length > 0)
					for (var h = 0; h < i.left.length; h++) {
						var r = "";
						i.left[h] == this.pindex && (r = 'class="current"'),
							t += '		<a href="javascript:void(0)" ' + r + '  onClick="' + a + "(" + i.left[h] + "," + this.psize + ",this"+ ');return false;">' + i.left[h] + "</a>"
					}
				if (i.middle.length > 0) {
					t += '		<span class="pager-dot">...</span>';
					for (var h = 0; h < i.middle.length; h++) {
						var r = "";
						i.middle[h] == this.pindex && (r = 'class="current"'),
							t += '		<a href="javascript:void(0)" ' + r + ' onClick="' + a + "(" + i.middle[h] + "," + this.psize + ",this"+');return false;" >' + i.middle[h] + "</a>"
					}
				}
				if (i.right.length > 0) {
					t += '		<span class="pager-dot">...</span>';
					for (var h = 0; h < i.right.length; h++) {
						var r = "";
						i.right[h] == this.pindex && (r = 'class="current"'),
							t += '		<a href="javascript:void(0)" ' + r + ' onClick="' + a + "(" + i.right[h] + "," + this.psize + ",this"+');return false;" >' + i.right[h] + "</a>"
					}
				}
				t += "		</span>",
					t += '		<a href="javascript:void(0)" class="pager-next" onClick="' + a + "(" + s + "," + this.psize + ",this"+');return false;"><i></i></a>',
					t += "</div>",
					$("#" + this.id).html(t),
					1 == this.pindex ? $("#" + this.id).find("a.pager-last").addClass("disabled") : $("#" + this.id).find("a.pager-last").removeClass("disabled"),
					this.pindex == this.tpage ? $("#" + this.id).find("a.pager-next").addClass("disabled") : $("#" + this.id).find("a.pager-next").removeClass("disabled")
			}
		}
}


/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
$.cookie = function (name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options = $.extend({}, options); // clone object since it's unexpected behavior if the expired property were changed
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		// NOTE Needed to parenthesize options.path and options.domain
		// in the following expressions, otherwise they evaluate to undefined
		// in the packed version for some reason...
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};