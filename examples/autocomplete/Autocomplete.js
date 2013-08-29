(function ($) {
    function searchWikipedia (term) {
        return $.ajaxAsObservable({
            url: 'http://en.wikipedia.org/w/api.php',
            dataType: 'jsonp',
            data: {
                action: 'opensearch',
                format: 'json',
                search: encodeURI(term)
            }
        });
    }

    $(function () {
        var input = $('#textInput'),
            ul = $('#results');

        var keyup = input.keyupAsObservable()
            .map(function(ev) {
                return ev.target.value;
            })
            .filter(function(text) {
                return text.length > 2;
            })
            .throttle(500)
            .distinctUntilChanged()

        var searcher = keyup.map(function (text) {
                return searchWikipedia(text);
            }).switchLatest();

        var subscription = searcher.subscribe(
            function (value) {                    
                var results = value.data[1];

                ul.empty();
                $.each(results, function (_, result) {
                    $('<li>', { text: result, }).appendTo(ul);
                });
            }, 
            function (error) {
                ul.empty();
                $('<li>', { text: 'Error: ' + error.errorThrown }).appendTo(ul);
            }
        );

    });                
})(jQuery);