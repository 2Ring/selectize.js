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

            if (this.items.length >= this.settings.max_item_limit) {
                this.$control_input[0].setAttribute('disabled', '');
                this.$dropdown_content[0].style.display = 'none';
                this.$dropdown_content[0].classList.add('no-items');
            } else {
                this.$control_input[0].removeAttribute('disabled');
                this.$dropdown_content[0].style.display = 'block';
                this.$dropdown_content[0].classList.remove('no-items');
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

            self.on('item_remove', function (value) {
               if(this.header_items.has(value)) {
                   this.$dropdown_header[0].removeChild(this.header_items.get(value));
                   this.header_items.delete(value);
                   this.ignoreHover = true;
                   this.refreshItems();
                   this.refreshOptions();
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


                this.$dropdown_header[0].appendChild(headerItem);
                this.header_items.set(value, headerItem);
            });
        };
    })();
});