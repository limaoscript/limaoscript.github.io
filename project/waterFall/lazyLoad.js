var lazyLoad = (function() {

	function init($selector, callback) {
		if (!lazyLoad._isBind) {
			lazyLoad._bind();
		}
		lazyLoad._add($selector, callback);
		setTimeout(function(){
			lazyLoad._do();
		},1000)
	}

	function showImg($img) {
		$img.attr('src', $img.attr('data-src'));
	}

	var lazyLoad = {

		_queue: [],

		_isBind: false,


		_add: function($selector, callback) {
			var me = this;

			$selector.each(function() {
				var $item = $(this);
				me._queue.push({
					$ele: $item,
					cab: callback
				})
			})
		},

		_bind: function() {
			var timer = null,
				me = this,
				interval = 40;

			timer && clearTimeout(timer);
			$(window).on('scroll', function(e) {
				e.preventDefault();
				timer = setTimeout(function() {
					me._do();
				}, interval);
			});
			this._isBind = true;
		},

		_do: function() {
			var queueList = this._queue,
				len = queueList.length,
				i = 0,
				arr = [];

			for (; i < len; i++) {
				var item = queueList[i];
				if (this._isShow(item.$ele)) {
					console.log(item.$ele.offset().top)
					item.cab.call(item.$ele[0]);
				} else {
					arr.push(item);
				}
				this._queue = arr;
			}
		},

		_isShow: function($ele) {
			var scrollHeight = $(document).scrollTop();

			var winHeight = $(window).height();

			var top = $ele.offset().top;

			return (top < (scrollHeight + winHeight)) ? true : false;
		}
	};

	return {
		init: init,
		showImg: showImg
	}
})();
$(function(){
	lazyLoad.init($('.box img'), function() {
		lazyLoad.showImg($(this));
	})
})