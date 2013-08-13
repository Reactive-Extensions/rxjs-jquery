
    /**
     * Converts the jQuery Deferred to an Observable sequence
     * @returns {Observable} An Observable sequence created from a jQuery Deferred object.
     */    
    $.Deferred.prototype.toObservable = function () {
        var subject = new AsyncSubject();
        this.done(function () {
            subject.onNext(slice.call(arguments));
            subject.onCompleted();
        }).fail(function () {
            subject.onError(slice.call(arguments));
        });
        return subject;
    };

    /**
     * Converts an existing Observable sequence to a jQuery Deferred object.
     * @returns {Deferred} A jQuery Deferred object wrapping the Observable sequence.
     */
    observableProto.toDeferred = function () {
        var deferred = $.Deferred();
        this.subscribe(function (value) {
            deferred.resolve(value);
        }, function (e) { 
            deferred.reject(e);
        });
        return deferred;  
    };

    //in order to support jQuery 1.6.*
    if ($.Callbacks) {

        /**
         * Converts an existing Callbacks object to an Observable sequence
         * @returns {Observable} An Observable sequence created from a jQuery Callbacks object.
         */
        $.Callbacks.prototype.toObservable = function () {
                var parent = this;
                return observableCreate(function (observer) {

                    function handler(values) {
                        observer.onNext(values);
                    }

                    parent.add(handler.bind(parent));
                    return function () {
                        parent.remove(handler);
                    };
                });
            };
    }

    /**
     * Attach an event handler function for one or more events to the selected elements as an Observable sequence.
     *
     * @param {String} events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
     * @param {String} [selector] A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
     * @param {Any} [data] Data to be passed to the handler in event.data when an event is triggered.
     * @returns {Observable} An Observable sequence which wraps the jQuery on method.
     */
    proto.onAsObservable = function () {
        var parent = this, args = slice.call(arguments, 0);
        return observableCreate(function(observer) {

            function handler(eventObject) {
                eventObject.additionalArguments = slice.call(arguments, 1);
                observer.onNext(eventObject);
            }

            args.push(handler.bind(parent));

            parent.on.apply(parent, args);

            return function() {
                parent.off.apply(parent, args);
            };
        });          
    };

    /** 
     * Attach a handler to an event for the elements as an Observable sequence.
     *
     * @param {String} eventType A string containing one or more DOM event types, such as "click" or "submit," or custom event names.
     * @param {Object} eventData An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery bind method.
     */
    proto.bindAsObservable = function(eventType, eventData) {
        var parent = this;
        return observableCreate(function(observer) {

            function handler(eventObject) {
                eventObject.additionalArguments = slice.call(arguments, 1);
                observer.onNext(eventObject);
            }

            parent.bind(eventType, eventData, handler.bind(parent));

            return function() {
                parent.unbind(eventType, handler);
            };
        });
    };

    proto.delegateAsObservable = function(selector, eventType, eventData) {
        var parent = this;
        return observableCreate(function(observer) {

            function handler(eventObject) {
                eventObject.additionalArguments = slice.call(arguments, 1);
                observer.onNext(eventObject);
            }

            parent.delegate(selector, eventType, eventData, handler.bind(parent));

            return function() {
                parent.undelegate(selector, eventType, handler);
            };
        });
    };

    proto.liveAsObservable = function(eventType, eventData) {
        var parent = this;
        return observableCreate(function(observer) {

            function handler(eventObject) {
                eventObject.additionalArguments = slice.call(arguments, 1);
                observer.onNext(eventObject);
            }

            parent.live(eventType, eventData, handler.bind(parent));
            
            return function() {
                parent.die(eventType, handler);
            };
        });
    };

    proto.changeAsObservable = function (eventData) {
        return this.bindAsObservable('change', eventData);
    };

    proto.clickAsObservable = function (eventData) {
        return this.bindAsObservable('click', eventData);
    };

    proto.dblclickAsObservable = function (eventData) {
        return this.bindAsObservable('dblclick', eventData);
    };    

    proto.focusAsObservable = function(eventData) {
        return this.bindAsObservable('focus', eventData);
    };

    proto.focusinAsObservable = function(eventData) {
        return this.bindAsObservable('focusin', eventData);
    };

    proto.focusoutAsObservable = function(eventData) {
        return this.bindAsObservable('focusout', eventData);
    };

    proto.keydownAsObservable = function(eventData) {
        return this.bindAsObservable('keydown', eventData);
    };

    proto.keyupAsObservable = function(eventData) {
        return this.bindAsObservable('keyup', eventData);
    };

    proto.loadAsObservable = function(eventData) {
        return this.bindAsObservable('load', eventData);
    };

    proto.mousedownAsObservable = function(eventData) {
        return this.bindAsObservable('mousedown', eventData);
    };

    proto.mouseenterAsObservable = function(eventData) {
        return this.bindAsObservable('mouseenter', eventData);
    };

    proto.mouseleaveAsObservable = function(eventData) {
        return this.bindAsObservable('mouseleave', eventData);
    };

    proto.mousemoveAsObservable = function(eventData) {
        return this.bindAsObservable('mousemove', eventData);
    };

    proto.mouseoutAsObservable = function(eventData) {
        return this.bindAsObservable('mouseout', eventData);  
    };

    proto.mouseoverAsObservable = function(eventData) {
        return this.bindAsObservable('mouseover', eventData);
    };

    proto.mouseupAsObservable = function(eventData) {
        return this.bindAsObservable('mouseup', eventData);
    };

    proto.resizeAsObservable = function(eventData) {
        return this.bindAsObservable('resize', eventData);
    };

    proto.scrollAsObservable = function(eventData) {
        return this.bindAsObservable('scroll', eventData);
    };

    proto.selectAsObservable = function(eventData) {
        return this.bindAsObservable('select', eventData);
    };

    proto.submitAsObservable = function(eventData) {
        return this.bindAsObservable('submit', eventData);
    };

    proto.unloadAsObservable = function(eventData) {
        return this.bindAsObservable('unload', eventData);
    };

    proto.oneAsObservable = function(types, selector, data) {
        var parent = this;
        return observableCreateWithDisposable(function(observer) {

            function handler (eventObject) {
                eventObject.additionalArguments = slice.call(arguments, 1);
                parent.off(types, selector, data, handler);
                observer.onNext(eventObject);
                observer.onCompleted();			
            }

            parent.on(types, selector, data, handler.bind(parent));
            
            return disposableEmpty;
        });
    };

    proto.readyAsObservable = function() {
        var parent = this;
        return observableCreateWithDisposable(function(observer) {

            function handler(eventObject) {
                observer.onNext(eventObject);
            }

            parent.ready(handler.bind(parent));

            return disposableEmpty;
        });
    };

    proto.hideAsObservable = function (options) {
        if (typeof options === 'number') {
            options = { duration: options };
        } else if (!options) {
            options = {};
        }

        var subject = new AsyncSubject();

        options.complete = function() {
            subject.onNext(this);
            subject.onCompleted();
        };

        this.hide(options);

        return subject;
    };

    proto.showAsObservable = function(options) {
        if (typeof options === 'number') {
            options = { duration: options };
        } else if (!options) {
            options = {};
        }

        var subject = new AsyncSubject();

        options.complete = function() {
            subject.onNext(this);
            subject.onCompleted();
        };

        this.show(options);

        return subject;
    };

    proto.animateAsObservable = function(properties, duration, easing) {
        var subject = new AsyncSubject();

        this.animate(properties, duration, easing, function() {
            subject.onNext(this);
            subject.onCompleted();
        });

        return subject;
    };

    proto.fadeInAsObservable = function(duration, easing) {
        var subject = new AsyncSubject();

        this.fadeIn(duration, easing, function() {
            subject.onNext(this);
            subject.onCompleted();
        });

        return subject;
    };

    proto.fadeToAsObservable = function(duration, opacity, easing) {
        var subject = new AsyncSubject();

        this.fadeTo(duration, opacity, easing, function() {
            subject.onNext(this);
            subject.onCompleted();
        });

        return subject;
    };

    proto.fadeOutAsObservable = function(duration, easing) {
        var subject = new AsyncSubject();

        this.fadeOut(duration, easing, function() {
            subject.onNext(this);
            subject.onCompleted();
        });

        return subject;
    };

    proto.fadeToggleAsObservable = function(duration, easing) {
        var subject = new AsyncSubject();

        this.fadeToggle(duration, easing, function() {
            subject.onNext(this);
            subject.onCompleted();
        });

        return subject;
    };

    proto.slideDownAsObservable = function(duration) {
        var subject = new AsyncSubject();

        this.slideDown(duration, function() {
            subject.onNext(this);
            subject.onCompleted();
        });

        return subject;
    };

    proto.slideUpAsObservable = function(duration) {
        var subject = new AsyncSubject();

        this.slideUp(duration, function() {
            subject.onNext(this);
            subject.onCompleted();
        });

        return subject;
    };

    proto.slideToggleAsObservable = function(duration) {
        var subject = new AsyncSubject();

        this.slideToggle(duration, function() {
            subject.onNext(this);
            subject.onCompleted();
        });

        return subject;
    };

    proto.toggleAsObservable = function(duration, easing) {
        var subject = new AsyncSubject();

        this.toggle(duration, easing, function() {
            subject.onNext(this);
            subject.onCompleted();
        });

        return subject;
    };

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

    $.getAsObservable = function(url, data, dataType) {
        return ajaxAsObservable({ url: url, dataType: dataType, data: data });
    };

    $.getJSONAsObservable = function(url, data) {
        return ajaxAsObservable({ url: url, dataType: 'json', data: data });
    };

    $.getScriptAsObservable = function(url) {
        return ajaxAsObservable({ url: url, dataType: 'script'});
    };

    $.postAsObservable = function(url, data, dataType) {
        return ajaxAsObservable({ url: url, dataType: dataType, data: data, type: 'POST'});	
    };
