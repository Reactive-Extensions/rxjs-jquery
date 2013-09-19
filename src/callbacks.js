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

                parent.add(handler);

                return function () {
                    parent.remove(handler);
                };
            });
        };
    }