Selectize.define('header_items', function (options) {
    var self = this;
    
    options = $.extend({
        headerClass: 'selectize-dropdown-header',
        html: function (data) {
            return (
                '<div class="' + data.headerClass + '"></div>'
            );
        }
    }, options);

    this.onChange = (function () {
        var original = self.onChange;
        return function (e) {

            if (this.items.length === 0) {
                this.$dropdown_header[0].style.display = 'none';
                this.$dropdown_header[0].classList.add('no-items');
            } else {
                this.$dropdown_header[0].style.display = 'block';
                this.$dropdown_header[0].classList.remove('no-items');
            }

            if (this.items.length >= this.settings.max_item_limit || this.items.length >= Object.keys(this.options).length) {
                this.$control_input[0].setAttribute('disabled', '');
                this.$dropdown.find('.selectize-dropdown-content')[0].style.display = 'none';
                this.$dropdown.find('.selectize-dropdown-content')[0].classList.add('no-items');
            } else {
                this.$control_input[0].removeAttribute('disabled');
                this.$dropdown.find('.selectize-dropdown-content')[0].style.display = 'block';
                this.$dropdown.find('.selectize-dropdown-content')[0].classList.remove('no-items');
            }

            return original.apply(this, arguments);
        };
    })();

    self.setup = (function () {
        var original = self.setup;
        self.header_items = new Map();
        return function () {
            original.apply(self, arguments);
           
            self.$dropdown_header = $(options.html(options));
            self.$dropdown.prepend(self.$dropdown_header);

            if (self.items.length === 0) {
                self.$dropdown_header[0].style.display = 'none';
                self.$dropdown_header[0].classList.add('no-items');
            }

            if (self.items.length >= this.settings.max_item_limit) {
                self.$control_input[0].setAttribute('disabled', '');
                self.$dropdown.find('.selectize-dropdown-content')[0].style.display = 'none';
                self.$dropdown.find('.selectize-dropdown-content')[0].classList.add('no-items');
            }

            self.on('item_remove', function (value) {
               if(this.header_items.has(value)) {
                   this.$dropdown_header[0].removeChild(this.header_items.get(value));
                   this.header_items.delete(value);
                   this.ignoreHover = true;
                   this.refreshItems();
                   this.refreshOptions(false);
               }
            });

            self.on('item_add', function (value, item) {
                var headerItem = document.createElement('div');
                var removeButton = document.createElement('a');
                var actualItem = this.options[value];

                removeButton.classList.add('remove');
                removeButton.setAttribute('data-value', value);
                removeButton.innerText = '×';
                removeButton.addEventListener("click", function (e) {
                    this.removeItem(e.currentTarget.attributes.getNamedItem('data-value').value, false);
                }.bind(this));
                if (actualItem) {
                    headerItem.innerText = actualItem.name ? actualItem.name : value;
                } else {
                    headerItem.innerText = value;
                }
                headerItem.appendChild(removeButton);
                headerItem.classList.add('item');
                headerItem.classList.add('selected-item');
                headerItem.setAttribute('data-selectable','');
                if(self.settings.item_max_width) {
                    headerItem.style.maxWidth = self.settings.item_max_width;
                }


                this.$dropdown_header[0].appendChild(headerItem);
                this.header_items.set(value, headerItem);
            });

            self.on('clear', function () {
                this.header_items.clear();
                while (this.$dropdown_header[0].firstChild) {
                    this.$dropdown_header[0].removeChild(this.$dropdown_header[0].firstChild);
                }
                this.refreshItems();
                this.refreshOptions(false);
            });
        };
    })();
});