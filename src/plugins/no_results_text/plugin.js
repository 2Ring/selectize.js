Selectize.define('no_results_text', function (options) {
    var self = this;

    options = $.extend({
        noResultsTextClass: 'selectize-no-results-text',
        noResultsText: self.settings.no_results_text,
        html: function (data) {
            return (
                '<div class="' + data.noResultsTextClass + '">' + data.noResultsText + '</div>'
            );
        }
    }, options);

    var showNoResultsText = function (value) {
        if (value === undefined) {
            value = self.$control_input.val();
        }

        var query = $.trim(value);
        var results = self.search(query);
        if (results.items.length || (self.$dropdown_header && self.$dropdown_header.children().length && query == '')) {
            self.$dropdown_no_results.css('display', 'none');
        } else {
            self.$dropdown_no_results.css('display', 'block');
        }
    }

    self.setup = (function () {
        var original = self.setup;
        return function () {
            original.apply(self, arguments);

            self.$dropdown_no_results = $(options.html(options));
            self.$dropdown.append(self.$dropdown_no_results);

            self.$dropdown_no_results.css('display', 'none');
        };

        self.on('item_remove', function () {
            showNoResultsText()
        });

        self.on('item_add', function () {
            showNoResultsText()
        });

        self.on('clear', function () {
            showNoResultsText()
        });
    })();

    var overridenOnSearchChange = (function () {
        var original = self.onSearchChange;
        return function (value) {
            original.apply(this, arguments);
            showNoResultsText(value);
        };
    })();

    var overridenOpen = (function () {
        var original = self.open;
        return function () {
            original.apply(this, arguments);
            showNoResultsText();
        };
    })();

    self.onSearchChange = overridenOnSearchChange;
    self.open = overridenOpen;
});
