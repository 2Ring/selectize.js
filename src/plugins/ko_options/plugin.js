Selectize.define('ko_options', function (options) {
    var self = this;
    self.setup = (function () {
        var original = self.setup;
        return function () {
            original.apply(self, arguments);

            if (self.settings.ko_options) {
                if (!self.settings.ko_subscriptions) {
                    self.settings.ko_subscriptions = [];
                }
                self.settings.ko_options().forEach(function (item) {
                    self.registerOption(item);
                });

                self.settings.ko_subscriptions.push(self.settings.ko_options.subscribe(function (newValue) {
                    var mappedNewValue = {}

                    newValue.forEach( function (item) {
                        mappedNewValue[item.id] = item;
                        if(!self.options[item.id]) {
                            self.addOption(item);
                        }
                    })
                    
                    var itemForRemove = [];

                    for (var key in self.options) {
                        if (!mappedNewValue[key]) {
                            itemForRemove.push(key);
                        }
                    }

                    itemForRemove.forEach(function (item) {
                        self.removeOption(item, true);
                    })

                    self.addOption(newValue);
                }.bind(self), null, 'change'));
            }

            // build optgroup table
            if (self.settings.ko_optgroups) {
                if (!self.settings.ko_subscriptions) {
                    self.settings.ko_subscriptions = [];
                }
                self.settings.ko_subscriptions.push(self.settings.ko_optgroups().forEach(function (item) {
                    self.registerOptionGroup(item);
                }));

                self.settings.ko_optgroups.subscribe(function (newValue) {
                    newValue.forEach(function (item) {
                        self.registerOptionGroup(item);
                    });
                });

            }
        };
    })();
});