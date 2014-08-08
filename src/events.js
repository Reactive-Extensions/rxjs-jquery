  if (!!proto.on) {
    /**
     * Attach an event handler function for one or more events to the selected elements as an Observable sequence.
     *
     * @param {String} events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
     * @param {String} [selector] A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
     * @param {Any} [data] Data to be passed to the handler in event.data when an event is triggered.
     * @returns {Observable} An Observable sequence which wraps the jQuery on method.
     */
    proto.onAsObservable = function () {
        var parent = this, oargs = slice.call(arguments, 0), args;
        return observableCreateRefCount(function(observer) {
          function handler(eventObject) {
            eventObject.additionalArguments = slice.call(arguments, 1);
            observer.onNext(eventObject);
          }

          args = oargs.slice();
          args.push(handler);

          parent.on.apply(parent, args);

          return function() {
            parent.off.apply(parent, args);
          };
        });         
    };
  }

  /** 
   * Attach a handler to an event for the elements as an Observable sequence.
   *
   * @param {String} eventType A string containing one or more DOM event types, such as "click" or "submit," or custom event names.
   * @param {Object} eventData An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery bind method.
   */
  proto.bindAsObservable = function(eventType, eventData) {
    var parent = this;
    return observableCreateRefCount(function(observer) {

      function handler(eventObject) {
        eventObject.additionalArguments = slice.call(arguments, 1);
        observer.onNext(eventObject);
      }

      parent.bind(eventType, eventData, handler);

      return function() {
        parent.unbind(eventType, eventData, handler);
      };
    });
  };

  /**
   * Attach a handler to one or more events for all elements that match the selector, now or in the future, based on a specific set of root elements as an Observable sequence
   *
   * @param {String} selector A selector to filter the elements that trigger the event.
   * @param {String} eventType A string containing one or more space-separated JavaScript event types, such as "click" or "keydown," or custom event names.
   * @param {Object} eventData An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery delegate method
   */
  proto.delegateAsObservable = function(selector, eventType, eventData) {
    var parent = this;
    return observableCreateRefCount(function(observer) {
      function handler(eventObject) {
        eventObject.additionalArguments = slice.call(arguments, 1);
        observer.onNext(eventObject);
      }

      parent.delegate(selector, eventType, eventData, handler);

      return function() {
        parent.undelegate(selector, eventType, handler);
      };
    });
  };

  // Removed as of 1.9
  if (!!proto.live) {
    /**
     * Attach an event handler for all elements which match the current selector, now and in the future as an Observable sequence
     *
     * @param {String} eventType A string containing a JavaScript event type, such as "click" or "keydown." As of jQuery 1.4 the string can contain multiple, space-separated event types or custom event names.
     * @param {Object} data An object containing data that will be passed to the event handler.
     * @returns {Observable} An Observable sequence which wraps the jQuery live method
     */
    proto.liveAsObservable = function(eventType, data) {
      var parent = this;
      return observableCreateRefCount(function(observer) {
        function handler(eventObject) {
          eventObject.additionalArguments = slice.call(arguments, 1);
          observer.onNext(eventObject);
        }

        parent.live(eventType, data, handler);
        
        return function() {
          parent.die(eventType, data, handler);
        };
      });
    };
  }

  /**
   * Bind an event handler to the “change” JavaScript event, or trigger that event on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “change” event.
   */
  proto.changeAsObservable = function (eventData) {
    return this.bindAsObservable('change', eventData);
  };

  /**
   * Bind an event handler to the “click” JavaScript event, or trigger that event on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “click” event.
   */
  proto.clickAsObservable = function (eventData) {
    return this.bindAsObservable('click', eventData);
  };

  /**
   * Bind an event handler to the “dblclick” JavaScript event, or trigger that event on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery "“dblclick”" event.
   */
  proto.dblclickAsObservable = function (eventData) {
    return this.bindAsObservable('dblclick', eventData);
  };    

  /**
   * Bind an event handler to the “focus” JavaScript event, or trigger that event on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery "“focus”" event.
   */
  proto.focusAsObservable = function(eventData) {
    return this.bindAsObservable('focus', eventData);
  };

  /**
   * Bind an event handler to the “focusin” event as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “focusin” event.
   */
  proto.focusinAsObservable = function(eventData) {
    return this.bindAsObservable('focusin', eventData);
  };

  /**
   * Bind an event handler to the “focusin” event as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “focusin” event.
   */
  proto.focusoutAsObservable = function(eventData) {
    return this.bindAsObservable('focusout', eventData);
  };

  /**
   * Bind an event handler to the "keypress" JavaScript event, or trigger that event on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “keypress” event.
   */
  proto.keypressAsObservable = function(eventData) {
    return this.bindAsObservable('keypress', eventData);
  };


  /**
   * Bind an event handler to the “keydown” JavaScript event, or trigger that event on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “keydown” event.
   */
  proto.keydownAsObservable = function(eventData) {
    return this.bindAsObservable('keydown', eventData);
  };

  /**
   * Bind an event handler to the “keyup” JavaScript event, or trigger that event on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “keyup” event.
   */
  proto.keyupAsObservable = function(eventData) {
    return this.bindAsObservable('keyup', eventData);
  };

  /**
   * Bind an event handler to the “load” JavaScript event as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “load” event.
   */
  proto.loadAsObservable = function(eventData) {
    return this.bindAsObservable('load', eventData);
  };

  /**
   * Bind an event handler to the “mousedown” JavaScript event, or trigger that event on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “mousedown” event.
   */
  proto.mousedownAsObservable = function(eventData) {
    return this.bindAsObservable('mousedown', eventData);
  };

  /**
   * Bind an event handler to be fired when the mouse enters an element, or trigger that handler on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “mouseenter” event.
   */
  proto.mouseenterAsObservable = function(eventData) {
    return this.bindAsObservable('mouseenter', eventData);
  };

  /**
   * Bind an event handler to be fired when the mouse leaves an element, or trigger that handler on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “mouseleave” event.
   */
  proto.mouseleaveAsObservable = function(eventData) {
    return this.bindAsObservable('mouseleave', eventData);
  };

  /**
   * Bind an event handler to the “mousemove” JavaScript event, or trigger that event on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “mousemove” event.
   */
  proto.mousemoveAsObservable = function(eventData) {
    return this.bindAsObservable('mousemove', eventData);
  };

  /**
   * Bind an event handler to the “mouseout” JavaScript event, or trigger that event on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “mouseout” event.
   */
  proto.mouseoutAsObservable = function(eventData) {
    return this.bindAsObservable('mouseout', eventData);  
  };

  /**
   * Bind an event handler to the “mouseover” JavaScript event, or trigger that event on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “mouseover” event.
   */
  proto.mouseoverAsObservable = function(eventData) {
    return this.bindAsObservable('mouseover', eventData);
  };

  /**
   * Bind an event handler to the “mouseup” JavaScript event, or trigger that event on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “mouseup” event.
   */
  proto.mouseupAsObservable = function(eventData) {
    return this.bindAsObservable('mouseup', eventData);
  };

  /**
   * Bind an event handler to the “resize” JavaScript event, or trigger that event on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “resize” event.
   */
  proto.resizeAsObservable = function(eventData) {
    return this.bindAsObservable('resize', eventData);
  };

  /**
   * Bind an event handler to the “scroll” JavaScript event, or trigger that event on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “scroll” event.
   */
  proto.scrollAsObservable = function(eventData) {
    return this.bindAsObservable('scroll', eventData);
  };

  /**
   * Bind an event handler to the “select” JavaScript event, or trigger that event on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “select” event.
   */
  proto.selectAsObservable = function(eventData) {
    return this.bindAsObservable('select', eventData);
  };

  /**
   * Bind an event handler to the “select” JavaScript event, or trigger that event on an element as an Observable sequence.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “select” event.
   */
  proto.submitAsObservable = function(eventData) {
    return this.bindAsObservable('submit', eventData);
  };

  /**
   * Bind an event handler to the “unload” JavaScript event as an Observable sequence.  This is deprecated as of jQuery 1.8.
   *
   * @param {Object} [eventData] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery “unload” event.
   */
  proto.unloadAsObservable = function(eventData) {
    return this.bindAsObservable('unload', eventData);
  };

  /**
   * Attach a handler to an event for the elements as an Observable sequence. The handler is executed at most once per element.
   *
   * @param {String} events A string containing one or more JavaScript event types, such as "click" or "submit," or custom event names.
   * @param {String} [selector] A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
   * @param {Object} [data] An object containing data that will be passed to the event handler.
   * @returns {Observable} An Observable sequence which wraps the jQuery one method.
   */
  proto.oneAsObservable = function(events) {
    var parent = this, oargs = slice.call(arguments, 0), args;
    return observableCreateRefCount(function(observer) {
      function handler (eventObject) {
        eventObject.additionalArguments = slice.call(arguments, 1);
        observer.onNext(eventObject);	
      }

      args = oargs.slice();
      args.push(handler);
      
      parent.one.apply(parent, args);
    });
  };

  /**
   * Specify a function to execute when the DOM is fully loaded as an Observable sequence.
   *
   * @returns {Observable} An Observable sequence which wraps the jQuery ready method.
   */
  proto.readyAsObservable = function() {
    var parent = this;
    return observableCreateRefCount(function(observer) {

      function handler(eventObject) {
        observer.onNext(eventObject);
      }

      parent.ready(handler);
    });
  };
