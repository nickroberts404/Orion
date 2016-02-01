// buttons.js

var nextBtn = document.getElementById('next-btn');
var prevBtn = document.getElementById('prev-btn');

function handleButtons (next, prev, render){
	nextBtn.addEventListener('click', function() {
		render(next());
	})

	prevBtn.addEventListener('click', function() {
		render(prev());
	})
}

module.exports = {
	handleButtons: handleButtons
}