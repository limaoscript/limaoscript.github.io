// import imgText from './1.jpg'
import $ from 'jquery';
let wrap = $('.wrap'),
	i = 0,
	height,
	src,
	dataSrc;
for (; i < 100; i++) {
	height = getRandomInt(180, 320);
	src = 'http://kejian.jirengu.com/data/fe/%E8%AF%BE%E4%BB%B6/32-%E6%87%92%E5%8A%A0%E8%BD%BD/code/blank.jpg';
	dataSrc = 'http://cdn.jirengu.com/book.jirengu.com/img/2.jpg';
	wrap.append(
		'<div class="box">' +
			'<img src="' + src + '" data-src="' + dataSrc + '" style="height:' + height + 'px">' +
		'</div>')
}

function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}