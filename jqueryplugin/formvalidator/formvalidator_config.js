(function ($, document) {

    $.pluginManager.filter('formValidator', {
        check: filterCheck
    });

    function filterCheck() {
        var $selector = this,
            success = arguments[0].success;

        return [{
            validate: function () {
                var $item = this;
                if ($item.is(':disabled') || !$item.is(':visible')) {
                    return true;
                }

                switch (true) {
                    case $item.is(':text,textarea'):
                        return validateInput.call($item);

                    case $item.is('select'):
                        return validateSelect.call($item);

                    default:
                        return true;
                }
            },
            success: function () {
                window.clearTimeout(timer);
                $(document).find('.thzt_formvalidator').remove();
                success();
            },
            failed: function () {
                var $item = this,
                    message = $item.attr('data-warning');

                showWarning.call($item, message);
            }
        }];
    }

    //-- private fields --

    var timer;

    //-- private functions --

    function validateInput() {
        var $input = this,
            regexpAttr = $input.attr('data-regexp');

        if (regexpAttr == null) {
            return true;
        }

        var value = $input.val(),
            regexp = new RegExp(regexpAttr),

            match = regexp.exec(value);

        return match != null;
    }

    function validateSelect() {
        var $select = this,
            $cannotSelectOption = $select.find('option[data-cannotselect]');

        if ($cannotSelectOption.length === 0) {
            return true;
        }

        var selectedValue = $select.val(),
            haveNotSelectCannotSelectOption = $cannotSelectOption.filter(function () {
                var $option = $(this),
                    optionValue = $option.val();

                return optionValue === selectedValue;
            }).length === 0;

        return haveNotSelectCannotSelectOption;
    }

    function showWarning(message) {
        var $item = this;

        window.clearTimeout(timer);
        $(document).find('.thzt_formvalidator').remove();

        var warningDiv = $('\<div class="thzt_formvalidator">\
            <div>\
            </div>\
            <div>' + message + '</div>\
        </div>');

        warningDiv.css({
            marginLeft: +$item.css('width').slice(0, -2) / 5 + 'px'
        });
        warningDiv.find('>div:first-child').css({
            left: +$item.css('width').slice(0, -2) / 5 + 'px'
        });

        warningDiv.insertBefore($item);

        timer = setTimeout(function () {
            $item.prev('.thzt_formvalidator').remove();
        }, 3000);
    }

} (jQuery, document));
