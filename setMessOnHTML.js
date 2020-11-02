SetMessOnHTML = (function($) {

    return {

        /**
         * html:
         * <div data-msg="reg"></div>
         * <div><div data-msg="auth"></div></div>
         *
         * js:
         * var data = {reg: 'Registration', auth: 'Authorization'}
         * SetMessOnHTML.parse(data);
         *
         * -> html on browser
         * <div data-msg="reg">Registration</div>
         * <div><div data-msg="reg">Authorization</div></div>
         *
         *
         * @param data
         */
        parse: function(data) {
            var list = $.makeArray($("[data-msg]"));
            list.forEach(function(item) {
                $(item).html(data[$(item).data('msg')]);
            });
        }
    }

}(jQuery));
