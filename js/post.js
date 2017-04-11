$(function () {
    $('pre').addClass('prettyprint linenums'); //添加Google code Hight需要的class
    $('.entry a').each(function (index, element) {
        var href = $(this).attr('href');
        if (href) {
            if (href.indexOf('#') == 0) {} else if (href.indexOf('/') == 0 || href.toLowerCase().indexOf('mengw.io') > -1) {} else if ($(element).has('img').length) {} else {
                $(this).attr('target', '_blank');
                $(this).addClass('external');
            }
        }
    });

    $.getScript('/js/prettify/prettify.js', function () {
        prettyPrint();
    });
})