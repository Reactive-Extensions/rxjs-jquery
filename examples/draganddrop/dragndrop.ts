/// <reference path="../../ts/rx.jquery.d.ts" />

jQuery(function ($: JQueryStatic) {
    var dragTarget = $('#dragTarget');

    // Get the three major events
    var mouseup = dragTarget.bindAsObservable('mouseup').publish().refCount();
    var mousemove = $(document).bindAsObservable('mousemove').publish().refCount();
    var mousedown = dragTarget.bindAsObservable('mousedown').publish().refCount().map(function (event: JQueryMouseEventObject) {
        // calculate offsets when mouse down
        event.preventDefault();
        return {
            left: event.clientX - dragTarget.offset().left,
            top: event.clientY - dragTarget.offset().top,
        };
    });

    // Combine mouse down with mouse move until mouse up
    var mousedrag = mousedown.selectMany(function(imageOffset) {
        return mousemove.map(function (pos: JQueryMouseEventObject) {
            // calculate offsets from mouse down to mouse moves
            return {
                left: pos.clientX - imageOffset.left, top: pos.clientY - imageOffset.top
            };
        }).takeUntil(mouseup);
    });

    var subscription = mousedrag.subscribe (function (pos) {
        // Update position
        $('#dragTarget').css({top: pos.top, left: pos.left});
    });
});
