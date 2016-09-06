function Carousel(cantainer, conf){
	var defaultConf = {
		index: 0,
		width: 600,
		height: 400
	};

	this.$ref = $(cantainer);

	this.conf = conf || {};

	this.conf = $.extend(defaultConf, this.conf);

	this.currentIndex = this.conf.index;

	this.$container = this.$ref.find('.carousel-container');

	this.$containerItems = this.$container.find('>li');

	this.init();
}


Carousel.prototype = {
	
	init:function(){
		var $ref = this.$ref;
		var width = $ref.width();
		var height = $ref.height();
		var $container = $ref.find('.carousel-container');
		var containerItems = $container.find('>li');
		var $indicators = $ref.find('.indicators');
		var len = containerItems.length;
		//1.构造包裹层。当前指示器 DOM结构
		containerItems.each(function(index, ele){
			$indicators.append('<div data-index="' + index + '"class="indicator" >'+index+'</div>');
		})
		//2.自动设置包裹层宽高
		$container.css({
			width:width * len,
			height:height
		})
		var me = this;
		//3.绑定当前指示器的点击事件
		$indicators.on('click','.indicator',function(event){
			var indicatorIndex = $(this).attr('data-index');
			me.go(indicatorIndex);
		});

		//4.自动轮播

		//5.切换到默认item
	},

	autoTask:function(){
		
	},

	go:function(index){
		var currentIndex = this.currentIndex,
			conf = this.conf,
			width = conf.width,
			offset = (index - currentIndex) * width,
			ref = this.$ref.find('.carousel-container'),
			item = this.$containerItems;

		if(index > currentIndex){
			ref.animate({
				left: -offset + 'px'
			},function(){
				var i = currentIndex;
				while(i != index){
					var last = item.children().last();
					var first = item.first();
					item.append(first);
					i++;
				}
			});
			ref.css('left', 0);
		}else{

		}
	},

	prev:function(){

	},

	next:function(){

	}
};



