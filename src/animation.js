    function handeAnimation(jQueryProto, method, args) {
        var options = args[0];

        // Check for duration
        if (typeof options === 'number' || typeof options === 'string') {
            options = { duration: options };
        } else if (!options) {
            options = {};
        }

        // Check for easing
        if (args.length === 2) {
            options.easing = args[1];
        }    

        var subject = new AsyncSubject();

        options.complete = function() {
            subject.onNext(this);
            subject.onCompleted();
        };

        jQueryProto[method](options);

        return subject.asObservable();
    }

    /**
     * Hide the matched elements as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.        
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery hide method.     
     */
    proto.hideAsObservable = function (options) {
        return handeAnimation(this, 'hide', arguments);
    };

    /**
     * Display the matched elements as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery show method.     
     */
    proto.showAsObservable = function(options) {
        return handeAnimation(this, 'show', arguments);
    };

    /**
     * Display the matched elements as an Observable sequence.
     *
     * @param {Object} properties An object of CSS properties and values that the animation will move toward.
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery show method.     
     */
    proto.animateAsObservable = function(properties, options) {
        // Check for duration
        if (typeof options === 'number' || typeof options === 'string') {
            options = { duration: options };
        } else if (!options) {
            options = {};
        }

        // Check for easing
        if (arguments.length === 3) {
            options.easing = arguments[2];
        }  

        var subject = new AsyncSubject();

        options.complete = function() {
            subject.onNext(this);
            subject.onCompleted();
        };        

        this.animate(properties, options);

        return subject.asObservable();
    };

    /**
     * Display the matched elements as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery fadeIn method.     
     */
    proto.fadeInAsObservable = function(options) {
        return handeAnimation(this, 'fadeIn', arguments);
    };

    /**
     * Adjust the opacity of the matched elements as an Observable sequence
     *
     * @param {String|Number} duration A string or number determining how long the animation will run.
     * @param {Number} opacity A number between 0 and 1 denoting the target opacity.
     * @param {String} [easing] A string indicating which easing function to use for the transition.
     * @returns {Observable} An Observable sequence which wraps the jQuery fadeTo method.   
     */
    proto.fadeToAsObservable = function(duration, opacity, easing) {
        var subject = new AsyncSubject();

        this.fadeTo(duration, opacity, easing, function() {
            subject.onNext(this);
            subject.onCompleted();
        });

        return subject.asObservable();
    };

    /**
     * Hide the matched elements by fading them to transparent as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery fadeOut method.     
     */
    proto.fadeOutAsObservable = function(options) {
        return handeAnimation(this, 'fadeOut', arguments);
    };

    /**
     * Display or hide the matched elements by animating their opacity as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery fadeToggle method.     
     */
    proto.fadeToggleAsObservable = function(options) {
        return handeAnimation(this, 'fadeToggle', arguments);
    };

    /**
     * Display the matched elements with a sliding motion as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery slideDown method.     
     */
    proto.slideDownAsObservable = function(options) {
        return handeAnimation(this, 'slideDown', arguments);
    };

    /**
     * Hide the matched elements with a sliding motion as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery slideUp method.     
     */
    proto.slideUpAsObservable = function(options) {
        return handeAnimation(this, 'slideUp', arguments);
    };

    /**
     * Hide the matched elements with a sliding motion as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery slideToggle method.     
     */
    proto.slideToggleAsObservable = function(options) {
        return handeAnimation(this, 'slideToggle', arguments);
    };

    /**
     * Display or hide the matched elements as an Observable sequence.
     *
     * @param {String|Number} [duration] A string or number determining how long the animation will run.  If not specified, defaults to 400.
     * @param {String} [easing] A string indicating which easing function to use for the transition.     
     * @param {Object} [options] A map of additional options to pass to the method.
     * @param {String|Number} [options.duration] A string or number determining how long the animation will run.
     * @param {String} [options.easing] A string indicating which easing function to use for the transition.
     * @param {String|Boolean} [options.queue] A Boolean indicating whether to place the animation in the effects queue. If false, the animation will begin immediately. As of jQuery 1.7, the queue option can also accept a string, in which case the animation is added to the queue represented by that string. When a custom queue name is used the animation does not automatically start; you must call .dequeue("queuename") to start it.
     * @param {Object} [options.specialEasing] A map of one or more of the CSS properties defined by the properties argument and their corresponding easing functions.
     * @param {Number} [options.step] A function to be called for each animated property of each animated element. This function provides an opportunity to modify the Tween object to change the value of the property before it is set.
     * @returns {Observable} An Observable sequence which wraps the jQuery slideToggle method.     
     */
    proto.toggleAsObservable = function(duration, easing) {
        return handeAnimation(this, 'toggle', arguments);
    };