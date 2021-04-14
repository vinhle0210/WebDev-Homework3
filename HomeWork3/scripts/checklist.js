(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }
    CheckList.prototype.addClickHandler = function (fn) {
        this.$element.on('click', 'input', function (event) {
            var email = event.target.value;
        //After the user check the box, it will call the addModal and post a thankyou for user
            this.addModal(email);
            this.removeRow(email);
            fn(email);
        }.bind(this));
    };
    CheckList.prototype.addModal = function(email){
        var myModal = document.getElementById("modalDemo");
        var thankyou_modal = document.getElementById('Thankyou-modal');
        thankyou_modal.innerHTML = ("Thankyou for your order, " + email);
        var exitBtn = document.getElementsByClassName("exit")[0];
        myModal.style.display = "block";
        // Allows the user to close the modal box, when user will click on (x) button
        exitBtn.onclick = function() {
            myModal.style.display = "none";
        };
        // Allows the user to close the modal box, even when the user clicks anywhere outside of the modal box
        window.onclick = function(event) {
            if (event.target == myModal) {
                myModal.style.display = "none";
            }   
        };
    };
    CheckList.prototype.addRow = function (coffeeOrder) {
        // Remove any existing rows that match the email address
        this.removeRow(coffeeOrder.emailAddress);
        // Create a new instance of a row, using the coffee order info
        var rowElement = new Row(coffeeOrder);
        // Add the new row instance's $element property to the checklist
        this.$element.append(rowElement.$element);
    };

    CheckList.prototype.removeRow = function (email) {
        this.$element
        .find('[value="' + email + '"]')
        .closest('[data-coffee-order="checkbox"]')
        .remove();
    };

    function Row(coffeeOrder) {
        var $div = $('<div></div>', {
            'data-coffee-order': 'checkbox',
            'class': 'checkbox'
        });

        var $label = $('<label></label>');
        var $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: coffeeOrder.emailAddress
        });

        var description = coffeeOrder.size + ' ';
        if (coffeeOrder.flavor) {
            description += coffeeOrder.flavor + ' ';
        }
        description += coffeeOrder.coffee + ', ';
        description += ' (' + coffeeOrder.emailAddress + ')';
        description += ' [' + coffeeOrder.strength + 'x]';

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;
    }
    App.CheckList = CheckList;
    window.App = App;
})(window);