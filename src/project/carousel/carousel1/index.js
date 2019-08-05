import './carousel.css'
import $ from 'jquery';

//构造模式
function Carousel($carousel) {
  let $imgCt = this.$imgCt = $carousel.find('.img-ct');
  this.$carousel = $carousel;
  this.$pre = $carousel.find('.pre');
  this.$next = $carousel.find('.next');
  this.imgWidth = $imgCt.find('li').width();
  this.imgSize = $imgCt.find('li').length;
  $imgCt.css('width', this.imgWidth * this.imgSize);
  this.bind();
}

Carousel.prototype = {
  bind: function () {
    let me = this;
    this.$pre.on('click', function (event) {
      event.preventDefault();
      me.showPre();
    })
    this.$next.on('click', function (event) {
      event.preventDefault();
      me.showNext();
    })
  },

  showPre: function () {
    this.$imgCt.prepend(this.$imgCt.children().last());
    this.$imgCt.css('left', 0 - this.imgWidth);
    this.$imgCt.animate({'left': 0});
  },

  showNext: function () {
    let $imgCt = this.$imgCt;
    this.$imgCt.animate({'left': 0 - this.imgWidth}, function () {
      $imgCt.append($imgCt.children().first());
      $imgCt.css('left', 0);
    })
  }
}

// new Carousel($('.carousel'));

$('.carousel').each(function () {
  new Carousel($(this));
})

