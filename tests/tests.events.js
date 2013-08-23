
var TestScheduler = Rx.TestScheduler,
    $ = jQuery;

test('On_With_Data', function () {
    var element = $('<div>');

    var d = element.onAsObservable('someEvent', 42)
        .subscribe(function (event) {
            equal(event.data, 42);
        });

    element.trigger('someEvent');

    d.dispose();
});

