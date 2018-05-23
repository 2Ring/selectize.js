Selectize.define('ko_options', function (options) {
    var self = this;
    self.setup = (function () {
        var original = self.setup;
        return function () {
            original.apply(self, arguments);

            if (self.settings.ko_options) {
                self.settings.ko_options().forEach(function (item) {
                    self.registerOption(item);
                });
            }

            // build optgroup table
            if (self.settings.ko_optgroups) {
                self.settings.ko_optgroups().forEach(function (item) {
                    self.registerOptionGroup(item);
                });
            }
        };
    })();
});