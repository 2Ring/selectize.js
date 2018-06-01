Selectize.define('tags_overflow', function (options) {
    var self = this;
    self.setup = (function () {
        var original = self.setup;
        return function () {
            original.apply(this, arguments);

            var $control = self.$control;
            self.overflow_indicator = document.createElement('span');
            self.overflow_indicator.classList.add('overflow-indicator');
            self.overflow_indicator.style.display = 'none';
            self.overflow_indicator.innerText = '...';
            self.overflow_indicator.addEventListener("click", function (e) {
                this.open();
                var $next = this.getAdjacentOption(this.$activeOption, 0);
                if ($next.length) this.setActiveOption($next, true, true);
            }.bind(self));
            $control[0].appendChild(self.overflow_indicator);
        };
    })();

   var tagsUpdate = (function () {
        var original = self.onChange;
        return function (e) {
            var array = Array.prototype.slice.call(this.$control.children(':not(input):not(span)'));
            var controlInput = this.$control.children('input')[0];
            var controlInputWidth = controlInput ? controlInput.clientWidth : 0;
            var actualWidth = 0;
            var isOutOfLine = false;
            var showOverflowIndicator = false;
            array.forEach(function (item) {
                item.classList.remove("overflowed-item");
                item.style.display = 'inline-block';
                actualWidth += Math.abs(actualWidth - (item.offsetWidth + item.offsetLeft));
                isOutOfLine = item.offsetTop > 10;
                if (actualWidth + controlInputWidth + 21 >= item.parentElement.clientWidth || isOutOfLine) {
                    item.classList.add("overflowed-item");
                    item.style.display = 'none';
                    showOverflowIndicator = true;
                }
            });
            if (showOverflowIndicator || isOutOfLine) {
                this.overflow_indicator.style.display = 'inline-block';

            } else {
                this.overflow_indicator.style.display = 'none';
            }

            return original.apply(this, arguments);
        };
    })();

    this.onSearchChange = tagsUpdate;

    this.onChange = tagsUpdate;
});
