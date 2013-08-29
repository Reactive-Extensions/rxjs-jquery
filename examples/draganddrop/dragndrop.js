$(function () {

    var dragTarget = $('#dragTarget')

    // Get the three major events
    var mouseup = dragTarget.onAsObservable('mouseup');
    var mousemove = dragTarget.onAsObservable('mousemove');
    var mousedown = dragTarget.onAsObservable('mousedown').map(function (event) {
        // calculate offsets when mouse down
        event.preventDefault();
        return { left: event.clientX - dragTarget.offset().left, top: event.clientY - dragTarget.offset().top };
    });

    // Combine mouse down with mouse move until mouse up
    var mousedrag = mousedown.selectMany(function(imageOffset) {
        return mousemove.map(function (pos) {
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