/**
* Copyright 2011 Microsoft Corporation
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

(function(global, $) {
	var root = global.Rx,
        observable = root.Observable,
        observableProto = observable.prototype,
        asyncSubject = root.AsyncSubject,
        observableCreate = observable.create,
        observableCreateWithDisposable = observable.createWithDisposable,
        disposableEmpty = root.Disposable.empty,
        slice = Array.prototype.slice,
        proto = $.fn;

    $.Deferred.prototype.toObservable = function () {
		/// <summary>Converts a jQuery Deferred object to an Observable sequence.</summary>
		/// <returns>An Observable sequenced defined from the jQuery Deferred object.</returns>		
        var subject = new asyncSubject();
        this.done(function () {
            subject.onNext(slice.call(arguments));
            subject.onCompleted();
        }).fail(function () {
            subject.onError(slice.call(arguments));
        });
        return subject;
    };

    observableProto.toDeferred = function () {
		/// <summary>Converts an existing Observable sequence to a jQuery Deferred object.</summary>
		/// <returns>A jQuery Deferred object</returns>
        var deferred = $.Deferred();
        this.subscribe(function (value) {
            deferred.resolve(value);
        }, function (e) { 
            deferred.reject(e);
        });
        return deferred;  
    };

    $.Callbacks.prototype.toObservable = function () {
        var parent = this;
        return observableCreate(function (observer) {
            var handler = function(values) {
                observer.onNext(values);  
            };
            parent.add(handler);
            return function () {
                parent.remove(handler);  
            };
        });
    };

    proto.onAsObservable = function (events, selector, data) {
        var parent = this;
        return observableCreate(function(observer) {
            var handler = function(eventObject) {
                observer.onNext(eventObject);
            };
            parent.on(events, selector, data, handler);
            return function() {
                parent.off(events, selector, handler);
            };
        });          
    };

    proto.bindAsObservable = function(eventType, eventData) {
		var parent = this;
        return observableCreate(function(observer) {
			var handler = function(eventObject) {
                observer.onNext(eventObject);
            };
            parent.bind(eventType, eventData, handler);
            return function() {
                parent.unbind(eventType, handler);
            };
        });
    };
    proto.delegateAsObservable = function(selector, eventType, eventData) {
		var parent = this;
        return observableCreate(function(observer) {
			var handler = function(eventObject) {
                observer.onNext(eventObject);
            };
            parent.delegate(selector, eventType, eventData, handler);
            return function() {
                parent.undelegate(selector, eventType, handler);
            };
        });
    };	
    proto.liveAsObservable = function(eventType, eventData) {
		var parent = this;
        return observableCreate(function(observer) {
			var handler = function(eventObject) {
                observer.onNext(eventObject);
            };
            parent.live(eventType, eventData, handler);
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
		/// <summary>
		///     Bind an event handler to the "select" JavaScript event, or trigger that event on an element as an Observable sequence.
		///     &#10;1 - selectAsObservable() 
		///     &#10;2 - selectAsObservable(eventData) 
		/// </summary>
		/// <param name="data" type="Object">
		///     A map of data that will be passed to the event handler.
		/// </param>
		/// <returns>An Observable sequence</returns>
		return this.bindAsObservable('select', eventData);
	};	
	proto.submitAsObservable = function(eventData) {
		/// <summary>
		///     Bind an event handler to the "submit" JavaScript event, or trigger that event on an element as an Observable sequence.
		///     &#10;1 - submitAsObservable() 
		///     &#10;2 - submitAsObservable(eventData) 
		/// </summary>
		/// <param name="data" type="Object">
		///     A map of data that will be passed to the event handler.
		/// </param>
		/// <returns>An Observable sequence</returns>
		return this.bindAsObservable('submit', eventData);
	};
	proto.unloadAsObservable = function(eventData) {
		/// <summary>
		///     Bind an event handler to the "unload" JavaScript event as an Observable sequence.
		///     &#10;1 - unloadAsObservable() 
		///     &#10;2 - unloadAsObservable(eventData)
		/// </summary>
		/// <param name="data" type="Object">
		///     A map of data that will be passed to the event handler.
		/// </param>
		/// <returns>An Observable sequence</returns>
		return this.bindAsObservable('unload', eventData);
	};	
    proto.oneAsObservable = function(types, selector, data) {
		/// <summary>
		///     Attach a handler to an event for the elements as an Observable sequence.. The Observer onNext handler is executed at most once per element.
		///     &#10;1 - oneAsObservable(events, data) 
		///     &#10;2 - oneAsObservable(events, selector, data) 
		/// </summary>
		/// <param name="types" type="String">
		///     One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
		/// </param>
		/// <param name="selector" type="String">
		///     A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
		/// </param>
		/// <param name="data" type="Anything">
		///     Data to be passed to the handler in event.data when an event is triggered.
		/// </param>
		/// <returns>An Observable sequence</returns>
		var parent = this;
        return observableCreateWithDisposable(function(observer) {
			var handler = function(eventObject) {
				parent.off(types, selector, data, handler);
                observer.onNext(eventObject);
				observer.onCompleted();			
            };
            parent.on(types, selector, data, handler);
            return dispoableEmpty;
        });
    };
    proto.readyAsObservable = function() {
		/// <summary>
		///     Specify a function to execute when the DOM is fully loaded as an Observable sequence.
		/// </summary>
		/// <returns>An Observable sequence</returns>
		var parent = this;
        return observableCreateWithDisposable(function(observer) {
			var handler = function(eventObject) {
                observer.onNext(eventObject);
            };
            parent.ready(handler);
            return dispoableEmpty;
        });
    };	
    proto.hideAsObservable = function(duration, easing) {
		/// <summary>
		///     Hide the matched elements as an Observable sequence.
		///     &#10;1 - hideAsObservable() 
		///     &#10;2 - hideAsObservable(duration) 
		///     &#10;3 - hideAsObservable(duration, easing)
		/// </summary>
		/// <param name="speed" type="Number">
		///     A string or number determining how long the animation will run.
		/// </param>
		/// <param name="easing" type="String">
		///     A string indicating which easing function to use for the transition.
		/// </param>
		/// <returns>An Observable sequence</returns>
		var subject = new asyncSubject();
        this.hide(duration, easing, function() {
            subject.onNext(this);
            subject.onCompleted();
        });
        return subject;
    };
    proto.showAsObservable = function(duration, easing) {
		/// <summary>
		///     Display the matched elements as an Observable sequence.
		///     &#10;1 - showAsObservable() 
		///     &#10;2 - showAsObservable(duration) 
		///     &#10;3 - showAsObservable(duration, easing)
		/// </summary>
		/// <param name="speed" type="Number">
		///     A string or number determining how long the animation will run.
		/// </param>
		/// <param name="easing" type="String">
		///     A string indicating which easing function to use for the transition.
		/// </param>
		/// <returns>An Observable sequence</returns>
		var subject = new asyncSubject();
        this.show(duration, function() {
            subject.onNext(this);
            subject.onCompleted();
        });
        return subject;
    };
    proto.animateAsObservable = function(properties, duration, easing) {
		/// <summary>
		///     Perform a custom animation of a set of CSS properties as an Observable sequence.
		///     &#10;1 - animate(properties, duration, easing) 
		/// </summary>
		/// <param name="prop" type="Object">
		///     A map of CSS properties that the animation will move toward.
		/// </param>
		/// <param name="speed" type="Number">
		///     A string or number determining how long the animation will run.
		/// </param>
		/// <param name="easing" type="String">
		///     A string indicating which easing function to use for the transition.
		/// </param>
		/// <returns>An Observable sequence</returns>
		var subject = new asyncSubject();
        this.animate(properties, duration, easing, function() {
            subject.onNext(this);
            subject.onCompleted();
        });
        return subject;
    };
    proto.fadeInAsObservable = function(duration, easing) {
		/// <summary>
		///     Display the matched elements by fading them to opaque as an Observable sequence.
		///     &#10;1 - fadeInAsObservable(duration) 
		///     &#10;2 - fadeInAsObservable(duration, easing)
		/// </summary>
		/// <param name="speed" type="Number">
		///     A string or number determining how long the animation will run.
		/// </param>
		/// <param name="easing" type="String">
		///     A string indicating which easing function to use for the transition.
		/// </param>
		/// <returns>An Observable sequence</returns>
		var subject = new asyncSubject();
        this.fadeIn(duration, easing, function() {
            subject.onNext(this);
            subject.onCompleted();
        });
        return subject;
    };
    proto.fadeToAsObservable = function(duration, opacity, easing) {
		/// <summary>
		///     Adjust the opacity of the matched elements as an Observable sequence.
		///     &#10;1 - fadeToAsObservable(duration, opacity) 
		///     &#10;2 - fadeToAsObservable(duration, opacity, easing)
		/// </summary>
		/// <param name="speed" type="Number">
		///     A string or number determining how long the animation will run.
		/// </param>
		/// <param name="to" type="Number">
		///     A number between 0 and 1 denoting the target opacity.
		/// </param>
		/// <param name="easing" type="String">
		///     A string indicating which easing function to use for the transition.
		/// </param>
		/// <returns>An Observable sequence</returns>
		var subject = new asyncSubject();
        this.fadeTo(duration, opacity, easing, function() {
            subject.onNext(this);
            subject.onCompleted();
        });
        return subject;
    };
    proto.fadeOutAsObservable = function(duration, easing) {
		/// <summary>
		///     Hide the matched elements by fading them to transparent.
		///     &#10;1 - fadeOutAsObservable(duration) 
		///     &#10;2 - fadeOutAsObservable(duration, easing)
		/// </summary>
		/// <param name="speed" type="Number">
		///     A string or number determining how long the animation will run.
		/// </param>
		/// <param name="easing" type="String">
		///     A string indicating which easing function to use for the transition.
		/// </param>
		/// <returns>An Observable sequence</returns>
		var subject = new asyncSubject();
        this.fadeOut(duration, easing, function() {
            subject.onNext(this);
            subject.onCompleted();
        });
        return subject;
    };
    proto.fadeToggleAsObservable = function(duration, easing) {
		/// <summary>
		///     Display or hide the matched elements by animating their opacity as an Observable sequence.
		/// </summary>
		/// <param name="speed" type="Number">
		///     A string or number determining how long the animation will run.
		/// </param>
		/// <param name="easing" type="String">
		///     A string indicating which easing function to use for the transition.
		/// </param>
		/// <returns>An Observable sequence</returns>
        var subject = new asyncSubject();
        this.fadeToggle(duration, easing, function() {
            subject.onNext(this);
            subject.onCompleted();
        });
        return subject;
    };    
    proto.slideDownAsObservable = function(duration) {
		var subject = new asyncSubject();
        this.slideDown(duration, function() {
            subject.onNext(this);
            subject.onCompleted();
        });
        return subject;
    };
    proto.slideUpAsObservable = function(duration) {
		var subject = new asyncSubject();
        this.slideUp(duration, function() {
            subject.onNext(this);
            subject.onCompleted();
        });
        return subject;
    };
    proto.slideToggleAsObservable = function(duration) {
		var subject = new asyncSubject();
        this.slideToggle(duration, function() {
            subject.onNext(this);
            subject.onCompleted();
        });
        return subject;
    };
    proto.toggleAsObservable = function(duration, easing) {
        var subject = new asyncSubject();
        this.toggle(duration, easing, function() {
            subject.onNext(this);
            subject.onCompleted();
        });
        return subject;
    };    
    var ajaxAsObservable = $.ajaxAsObservable = function(settings) {
        /// <summary>
        ///     Perform an asynchronous HTTP (Ajax) request wrapping the jQuery ajax method in an Rx.AsyncSubject.
        ///     &#10;2 - jQuery.ajaxAsObservable(settings)
        /// </summary>
        /// <param name="options" type="Object">
        ///     A set of key/value pairs that configure the Ajax request. All settings are optional. A default can be set for any option with $.ajaxSetup(). See jQuery.ajax( settings ) below for a complete list of all settings.
        /// </param>        
        var subject = new asyncSubject(), internalSettings = {};
        internalSettings.success = function(data, textStatus, jqXHR) {
            subject.onNext({ data: data, textStatus: textStatus, jqXHR: jqXHR });
            subject.onCompleted();
        };
        internalSettings.error = function(jqXHR, textStatus, errorThrown) {
            subject.onError({ jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown });
        };
        $.extend(true, internalSettings, settings);
        $.ajax(internalSettings);
        return subject;
    };
    $.getAsObservable = function(url, data, dataType) {
        return ajaxAsObservable({ url: url, dataType: dataType, data: data });
    };	
    $.getJSONAsObservable = function(url, data) {
        /// <summary>
        ///     Load JSON-encoded data from the server using a GET HTTP request.
        /// </summary>
        /// <param name="url" type="String">
        ///     A string containing the URL to which the request is sent.
        /// </param>
        /// <param name="data" type="Object">
        ///     A map or string that is sent to the server with the request.
        /// </param>       
        return ajaxAsObservable({ url: url, dataType: 'json', data: data });
    };
    $.getScriptAsObservable = function(url) {
        /// <summary>
        ///     Load a JavaScript file from the server using a GET HTTP request, then execute it. This wraps the existing jQuery.getScript method in an Rx.AsyncSubject.
        /// </summary>
        /// <param name="url" type="String">
        ///     A string containing the URL to which the request is sent.
        /// </param>     
        return ajaxAsObservable({ url: url, dataType: 'script'});
    };	
	$.postAsObservable = function(url, data, dataType) {
        /// <summary>
        ///     Load data from the server using a HTTP POST request, wrapping the jQuery.post request in an Rx.AsyncSubject.
        /// </summary>
        /// <param name="url" type="String">
        ///     A string containing the URL to which the request is sent.
        /// </param>
        /// <param name="data" type="String">
        ///     A map or string that is sent to the server with the request.
        /// </param>
        /// <param name="dataType" type="String">
        ///     The type of data expected from the server. Default: Intelligent Guess (xml, json, script, or html).
        /// </param>       
        return ajaxAsObservable({ url: url, dataType: dataType, data: data, type: 'POST'});	
	};
})(this, jQuery);