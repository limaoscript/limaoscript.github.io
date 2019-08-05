import $ from 'jquery';
let lazyLoad = (function() {

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

	let lazyLoad = {

		_queue: [],

		_isBind: false,


		_add: function($selector, callback) {
			let me = this;

			$selector.each(function() {
				let $item = $(this);
				me._queue.push({
					$ele: $item,
					cab: callback
				})
			})
		},

		_bind: function() {
			let timer = null,
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
			let queueList = this._queue,
				len = queueList.length,
				i = 0,
				arr = [];

			for (; i < len; i++) {
				let item = queueList[i];
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
			let scrollHeight = $(document).scrollTop();

			let winHeight = $(window).height();

			let top = $ele.offset().top;

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