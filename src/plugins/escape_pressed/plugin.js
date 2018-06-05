Selectize.define('escape_pressed', function(options) {
	var self = this;

	this.onKeyDown = (function() {
		var original = self.onKeyDown;
		return function(e) {
			if (e.keyCode === KEY_ESC) {
				self.trigger('on_escape');
			}
			return original.apply(this, arguments);
		};
	})();
});
