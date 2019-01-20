/*!
 * jQuery Validation Plugin v1.14.0
 * http://jqueryvalidation.org/
 * 页面引用jQuery Validation的初始化配置
 */

//使用jquery ui tooltips的初始化配置
$.validator.setDefaults({
	showErrors: function(map, list) {				
		//获得焦点元素
		var focussed = document.activeElement;
		if (focussed && $(focussed).is("input, textarea")) {
			$(this.currentForm).tooltip("close", {
				currentTarget: focussed
			}, true);
		}
		//移除高亮显示
		this.currentElements.removeAttr("title").removeClass("ui-state-highlight");
		$.each(list, function(index, error) {
			$(error.element).attr("title", error.message).addClass("ui-state-highlight");
			//初始点击按钮时，tips默认显示页面上第一个未通过验证的元素
			if($("button").is(":focus")){
				$(".ui-state-highlight")[0].focus();
			}
			$(this.currentForm).tooltip("open", {
				target: focussed
			});
		});
		if (focussed && $(focussed).is("input, textarea")) {
			$(this.currentForm).tooltip("open", {
				target: focussed
			});
		}
	}
});