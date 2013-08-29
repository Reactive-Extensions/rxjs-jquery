(function ($) {

    $(function () {
        var text = 'time flies like an arrow',
            container = $('#textContainer'),
            doc = $(document),
            mouseMove = doc.bindAsObservable('mousemove'),

            mouseMoveOffset = mouseMove.select(function(value) {
                var offset = container.offset();
                return {
                   offsetX : value.clientX - offset.left,
                   offsetY : value.clientY - offset.top
               };
            });

        for (var i = 0, len = text.length; i < len; i++) {
            (function(i) {
                var s = $('<span/>', { 
                    text: text[i],
                    css: {
                        position: 'absolute'
                    }
                }).appendTo(container);                       

                mouseMoveOffset.delay(i * 100).subscribe(function(mouseEvent) {
                    s.css({
                        top: mouseEvent.offsetY + 'px',
                        left: mouseEvent.offsetX + i * 10 + 15 + 'px'
                    });
                });
            })(i);
        }
    });
})(jQuery);