(function (window, document) {
    'use strict';

    var SLASH_DOMAIN_RU = '/ru',
        SLASH_DOMAIN_SU = '/su',
        currentSlashDomain = SLASH_DOMAIN_RU,
        replacingSlashDomain = SLASH_DOMAIN_SU;

    //test.com/currentSlashDomain/other -> test.com/replacingSlashDomain/other
    function replacing(listLinks) {
        listLinks = Array.from(listLinks);

        listLinks.forEach(function (item) {
            var href = item.getAttribute('href');
            href = href.replace(currentSlashDomain, replacingSlashDomain);
            item.setAttribute('href', href);
        });
    }

    function isCurrentSlashDomainRu() {
        return window.location.href.indexOf(SLASH_DOMAIN_RU) !== -1;
    }

    function onLoadIframe() {
        replacing(this.contentDocument.links);
    }

    function ready() {
        if (isCurrentSlashDomainRu()) {
            replacingSlashDomain = SLASH_DOMAIN_RU;
        } else {
            replacingSlashDomain = SLASH_DOMAIN_SU;
        }

        //все ссылки на странице
        replacing(document.links);

        //список ссылок в iframe
        var listIframes = Array.from(document.getElementsByTagName('iframe'));
        listIframes.forEach(function (item) {
            item.onload = onLoadIframe;
        });
    }

    document.addEventListener('DOMContentLoaded', ready);

}(this, this.document));
