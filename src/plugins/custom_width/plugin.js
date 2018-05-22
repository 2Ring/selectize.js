Selectize.define('custom_width', function (options) {
    var self = this;
    self.setup = (function () {
        var original = self.setup;
        return function () {
            original.apply(this, arguments);

           if(self.settings.control_width) {
               self.$control[0].style.maxWidth = self.settings.control_width;
               self.$control[0].style.minWidth = self.settings.control_width;
           }
            if (self.settings.dropdown_width) {
               self.$dropdown[0].style.minWidth = self.settings.dropdown_width;
               self.$dropdown[0].style.maxWidth = self.settings.dropdown_width;
           }

        };
    })();
});
