    // Check for deferred as of jQuery 1.5
    if ($.Deferred) {
        /**
         * Converts the jQuery Deferred to an Observable sequence
         * @returns {Observable} An Observable sequence created from a jQuery Deferred object.
         */    
        $.Deferred.toObservable = function (deferred) {
            var subject = new AsyncSubject();
            deferred.done(function () {
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
    }
    