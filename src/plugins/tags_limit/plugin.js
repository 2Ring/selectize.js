Selectize.define('tags_limit', function (options) {
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

    this.onChange = (function () {
        var original = self.onChange;
        return function (e) {
            var array = Array.prototype.slice.call(this.$control[0].children);
            var actualWidth = 0;
            array.forEach(function(item) {
                item.classList.remove("overflowed-item");
                item.style.display = 'inline';
                if (item.className === 'item' || item.className === 'item active') {
                    actualWidth += item.offsetWidth;
                }
                if (actualWidth > item.parentElement.offsetWidth - 35) {
                    length += 1;
                    item.classList.add("overflowed-item");
                    item.style.display = 'none';
                }
            });
            if (actualWidth > this.$control[0].offsetWidth - 35) {
                this.overflow_indicator.style.display = 'inline';

            } else {
                this.overflow_indicator.style.display = 'none';
            }
            return original.apply(this, arguments);
        };
    })();

});
