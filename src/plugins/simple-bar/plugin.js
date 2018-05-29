Selectize.define('simple-bar', function (options) {
    var self = this;

    self.setup = (function () {
        var original = self.setup;
        self.header_items = new Map();
        return function () {
            original.apply(self, arguments);

            if(SimpleBar) {
                new SimpleBar(self.$dropdown_content[0]);
                self.$dropdown_content_original = self.$dropdown_content;
                self.$dropdown_content = self.$dropdown_content.find('div.simplebar-content');

            }
        };
    })();
});