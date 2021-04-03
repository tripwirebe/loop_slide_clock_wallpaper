/* Looped slide clock
 * original author: GrimStorm 
 * modifier : ZZZZzzzzac, tripwirebe
  */

var size = 86;
var columns = Array.from(document.getElementsByClassName('column'));
var d = void 0,
	c = void 0;
var classList = ['visible', 'close', 'far', 'far', 'distant', 'distant'];
var use24HourClock = true;
var counter = [0, 0, 0, 0, 0, 0];
// set default animation delay to 300
var animationDelay = 300;

//load the variables using the listener
window.wallpaperPropertyListener = {
	applyUserProperties: function (properties) {
		if (properties.animationDelay) {
			animationDelay = properties.animationDelay.value;
		}
	}
};


function padClock(p, n) {
	return p + ('0' + n).slice(-2);
}

function getClock() {
	d = new Date();
	return [use24HourClock ? d.getHours() : d.getHours() % 12 || 12, d.getMinutes(), d.getSeconds()].reduce(padClock, '');
}

function getClass(render, i2) {
	var dist = Math.abs(i2 - render);
	var deco = void 0;
	if (dist > 5) { deco = ''; }
	else { deco = classList[dist] }
	return deco;
}

function roll_scoll(ele, offset, render, delay) {
	ele.style.webkitTransitionDuration = delay + "ms";
	ele.style.TransitionDuration = delay + "ms";
	ele.style.transform = 'translateY(calc(50vh + ' + offset + 'px - ' + size / 2 + 'px))';
	Array.from(ele.children).forEach(function (ele2, i2) {
		ele2.style.webkitTransitionDuration = delay + "ms";
		ele2.style.TransitionDuration = delay + "ms";
		ele2.className = 'num ' + getClass(render, i2);
	});
}

function reset(ele, c, i) {
	var target;
	var offset = -c[i] * size - 86 * 7;
	switch (i) {
		case 0:
			target = 2; break;
		case 1:
			target = 9; break;
		case 2:
			target = 5; break;
		case 3:
			target = 9; break;
		case 4:
			target = 5; break;
		case 5:
			target = 9; break;
	}
	if (c[i] == target) {
		counter[i]++;
		if (counter[i] > 1) {
			roll_scoll(ele, - 86 * 6, 6, 0);
		} else {
			roll_scoll(ele, offset, parseInt(c[i]) + 7, animationDelay);
		}
	} else {
		roll_scoll(ele, offset, parseInt(c[i]) + 7, animationDelay);
		counter[i] = 0;
	}
}

var loop = setInterval(function () {
	c = getClock();
	columns.forEach(function (ele, i) { reset(ele, c, i); });
}, 500);