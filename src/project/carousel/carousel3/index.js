import './carousel.css'
import $ from 'jquery';

function Carousel(cantainer, conf) {
  let defaultConf = {
    index: 0,
    width: 600,
    height: 400,
    autoTask: false
  };

  this.$ref = $(cantainer);

  this.conf = conf || {};

  this.conf = $.extend(defaultConf, this.conf);

  this.timer = null;

  this.currentIndex = 0;

  this.$container = this.$ref.find('.carousel-container');

  this.$containerItems = this.$container.find('>li');

  this.init();
}


Carousel.prototype = {

  init: function() {
    let $ref = this.$ref,
      width = this.conf.width,
      height = this.conf.height,
      $container = $ref.find('.carousel-container'),
      containerItems = $container.find('>li'),
      $indicators = $ref.find('.indicators'),
      len = containerItems.length;
    //1.构造包裹层。当前指示器 DOM结构
    containerItems.each(function(index, ele) {
      $indicators.append('<div data-index="' + index + '"class="indicator" ></div>');
    })
    //2.自动设置包裹层宽高
    $container.css({
      width: width * len,
      height: height
    });
    $ref.css({
      width: width,
      height: height
    });
    containerItems.css({
      'width': width,
      'height': height,
      'line-height': height + 'px'
    });

    //3.绑定当前指示器的点击事件
    this.bind($indicators, this);

    //4.自动轮播
    this.autoTask(this.conf.autoTask);

    //5.切换到默认item
    this.go(this.conf.index);
  },

  autoTask: function(isAuto) {
    if (isAuto) {
      let me = this;
      this.timer = setTimeout(function() {
        me.next();
        me.timer = setTimeout(me.timer, 2000);
      }, 2000);
    }
  },

  go: function(index, isClick) {

    let currentIndex = this.currentIndex,
      conf = this.conf,
      width = conf.width,
      ref = this.$ref.find('.carousel-container'),
      item = this.$containerItems,
      refItemLen = ref.find('>li').length,
      timer = this.timer;


    if (index > refItemLen - 1) {
      index = 0;
    } else if (index < 0) {
      index = refItemLen - 1;
    }

    //删除 indicator-active 重新添加当前indicator-active类
    this.$ref.find(".indicator").removeClass('indicator-active');
    this.$ref.find(".indicator:eq(" + index + ")").addClass('indicator-active');

    let offset = (index - currentIndex) * width;
    if (index > currentIndex) {
      ref.animate({
        left: -offset + 'px'
      }, function() {
        let i = currentIndex;
        while (i != index) {
          ref.append(ref.children().first());
          i++;
        }
        ref.css('left', 0);
      });
    } else {
      let i = currentIndex;
      while (i != index) {
        ref.prepend(ref.children().last());
        i--;
      }
      ref.css({
        left: offset + 'px'
      });

      ref.animate({
        left: 0
      });

    }

    this.currentIndex = index;
    if (isClick) {
      if (timer) {
        clearTimeout(timer);
        this.timer = null;
        this.autoTask(true);
      }
    }
  },

  prev: function() {
    this.go(this.currentIndex - 1);
  },

  next: function() {
    this.go(this.currentIndex + 1);
  },

  bind: function($indicators, Carousel) {
    $indicators.on('click', '.indicator', function(event) {
      event.prventDefault;
      let indicatorIndex = parseInt($(this).attr('data-index'));
      let isClick = true;
      Carousel.go(indicatorIndex, isClick);
    });
  }
};
new Carousel(
  '.carousel',
  {index:2,width:600,height:400, autoTask:true}
  );