
    var ajaxAsObservable = $.ajaxAsObservable = function(settings) {      
        var subject = new AsyncSubject();

        var internalSettings = {
            success: function(data, textStatus, jqXHR) {
                subject.onNext({ data: data, textStatus: textStatus, jqXHR: jqXHR });
                subject.onCompleted();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                subject.onError({ jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown });
            }
        };
        
        $.extend(true, internalSettings, settings);

        $.ajax(internalSettings);

        return subject;
    };

    /**
     * Load data from the server using a HTTP GET request as an Observable sequence.
     *
     * @param {String} url A string containing the URL to which the request is sent.
     * @param {Object} [data] A plain object or string that is sent to the server with the request.
     * @param {String} [dataType] The type of data expected from the server. Default: Intelligent Guess (xml, json, script, or html).
     * @returns {Observable} An Observable sequence which wraps the jQuery get method.       
     */
    $.getAsObservable = function(url, data, dataType) {
        return ajaxAsObservable({ url: url, dataType: dataType, data: data });
    };

    /**
     * Load JSON-encoded data from the server using a GET HTTP request as an Observable sequence.
     *
     * @param {String} url A string containing the URL to which the request is sent.
     * @param {Object} [data] A plain object or string that is sent to the server with the request.
     * @returns {Observable} An Observable sequence which wraps the jQuery getJSON method.       
     */
    $.getJSONAsObservable = function(url, data) {
        return ajaxAsObservable({ url: url, dataType: 'json', data: data });
    };

    /**
     * Load a JavaScript file from the server using a GET HTTP request, then execute it as an Observable sequence.
     *
     * @param {String} url A string containing the URL to which the request is sent.
     * @returns {Observable} An Observable sequence which wraps the jQuery getJSON method.       
     */
    $.getScriptAsObservable = function(url) {
        return ajaxAsObservable({ url: url, dataType: 'script'});
    };

    /**
     * Load data from the server using a HTTP POST request as an Observable sequence.
     *
     * @param {String} url A string containing the URL to which the request is sent.
     * @param {Object} [data] A plain object or string that is sent to the server with the request.
     * @param {String} [dataType] The type of data expected from the server. Default: Intelligent Guess (xml, json, script, or html).
     * @returns {Observable} An Observable sequence which wraps the jQuery get method.       
     */
    $.postAsObservable = function(url, data, dataType) {
        return ajaxAsObservable({ url: url, dataType: dataType, data: data, type: 'POST'});	
    };
