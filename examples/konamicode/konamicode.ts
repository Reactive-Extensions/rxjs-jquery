/// <reference path="../../ts/rx.jquery.d.ts" />

jQuery(function ($: JQueryStatic) {

    function identity<T>(x: T): T { return x; }

    $(function () {
        var codes = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
            konami = Rx.Observable.fromArray(codes),
            result = $('#result');

        $(document).keyupAsObservable()
            .select(function (e: KeyboardEvent) { return e.keyCode; })
            .windowWithCount(10, 1)
            .selectMany(function (x) { return x.sequenceEqual(konami); })
            .where(identity)
            .subscribe(function () {
                result.html('KONAMI!').fadeOutAsObservable(2000).subscribe(function() {
                    result.html('').fadeIn(0);
                });
            });
    });
});
