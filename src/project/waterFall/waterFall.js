import $ from 'jquery';
(function($) {
	$.fn.waterFall = function(options) {
		let defaultConf = {
			imgWidth: 200,
			marginBottom: 15
		};

		let conf = $.extend({}, defaultConf, options || {});

		let $container = this,
			$wrap = this.find('.wrap');

		$wrap.addClass('wrap-' + conf.imgWidth);

		let base = [],
			cols,
			marginRight,
			boxs = $wrap.find('.box');

		conf.imgWidth += 22;

		function init() {
			cols = Math.floor($container.width() / conf.imgWidth);

			marginRight = ($container.width() - conf.imgWidth * cols) / (cols - 1);

			$wrap.css('margin-right', -1 * marginRight);

			for (let i = 0; i < cols; i++) {
				base[i] = 0;
			}

			boxs.each(function() {
				let box = $(this);
				let index = getMinIndex();
				box.css({
					left: index * (conf.imgWidth + marginRight),
					top: base[index]
				});

				base[index] += box.height() + 22 + conf.marginBottom;
			})

			function getMinIndex() {
				let len = cols;
				let index = len - 1;
				for (let i = len - 2; i >= 0; i--) {
					if (base[i] <= base[index]) {
						index = i;
					}
				}
				return index;
			}
		}

		$(window).on('load', init);
		$(window).resize(init);
		return this;
	}
})($)

