/// <reference path="../../ts/rx.jquery.d.ts" />

function getOffset(event) {
    return {
        offsetX: event.offsetX === undefined ? event.layerX : event.offsetX,
        offsetY: event.offsetY === undefined ? event.layerY : event.offsetY
    };
}

$(function () {
    var canvas = document.getElementById('tutorial');
    if ((<any>canvas).getContext) {
        var _canvas: HTMLCanvasElement = <HTMLCanvasElement>canvas;
        var ctx = _canvas.getContext('2d');
        ctx.beginPath();

        var cv = $('#tutorial');

        // Calculate mouse deltas
        var mouseMoves = cv.onAsObservable('mousemove');
        var mouseDiffs = mouseMoves.bufferWithCount(2, 1).select(function (x) {
            return { first: getOffset(x[0]), second: getOffset(x[1]) };
        });

        // Merge mouse down and mouse up
        var mouseButton = cv.onAsObservable('mousedown').select(function (x) { return true; })
            .merge(cv.onAsObservable('mouseup').select(function (x) { return false; }))

        // Determine whether to paint or lift
        var paint = mouseButton.select(function (down) { return down ? mouseDiffs : mouseDiffs.take(0) }).switchLatest();

        // Paint the results
        var subscription = paint.subscribe(function (x) {
            ctx.moveTo(x.first.offsetX, x.first.offsetY);
            ctx.lineTo(x.second.offsetX, x.second.offsetY);
            ctx.stroke();
        });
    }
});
