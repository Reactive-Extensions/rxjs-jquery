(function ($) {

    function identity (x) { return x; }

    $(function () {
        var codes = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
            konami = Rx.Observable.fromArray(codes),
            result = $('#result');

        $(document).keyupAsObservable()
            .select(function (e) { return e.keyCode; })
            .windowWithCount(10)
            .selectMany(function (x) { return x.sequenceEqual(konami); })
            .where(identity)
            .subscribe(function () {
                result.html('KONAMI!').fadeOut(2000);
            });
    });
})(jQuery);