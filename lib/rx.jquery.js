// Copyright (c) Microsoft Corporation.  All rights reserved.
// This code is licensed by Microsoft Corporation under the terms
// of the MICROSOFT REACTIVE EXTENSIONS FOR JAVASCRIPT AND .NET LIBRARIES License.
// See http://go.microsoft.com/fwlink/?LinkId=186234.

(function()
{
	var _jQuery, proto, global, root, observable, asyncSubject, observableCreate, disposableEmpty, slice;
    _jQuery = jQuery;
    proto = _jQuery.fn;
    global = this;
	slice = [].slice;
    if (typeof ProvideCustomRxRootObject == "undefined") {
        root = global.Rx;
    } else {
        root = ProvideCustomRxRootObject();
    }
    observable = root.Observable;
    asyncSubject = root.AsyncSubject;
    observableCreate = observable.Create;
    disposableEmpty = root.Disposable.Empty;

    proto.bindAsObservable = function(eventType, eventData) {
		var parent;
        parent = this;
        return observableCreate(function(observer) {
			var handler;
            handler = function(eventObject) {
                observer.OnNext(eventObject);
            };
            parent.bind(eventType, eventData, handler);
            return function() {
                parent.unbind(eventType, handler);
            };
        });
    };
    proto.delegateAsObservable = function(selector, eventType) {
		var parent, args;
        parent = this;
		args = slice.call(arguments);
        return observableCreate(function(observer) {
			var handler;
            handler = function(eventObject) {
                observer.OnNext(eventObject);
            };
			args.push(handler);
            parent.delegate.apply(this, args);
            return function() {
                parent.undelegate(selector, eventType, handler);
            };
        });
    };	
    proto.liveAsObservable = function(eventType, eventData) {
		var parent;
        parent = this;
        return observableCreate(function(observer) {
			var handler;
            handler = function(eventObject) {
                observer.OnNext(eventObject);
            };
            parent.live(eventType, eventData, handler);
            return function() {
                parent.die(eventType, handler);
            };
        });
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
		return this.bindAsObservable('select', eventData);
	};	
	proto.submitAsObservable = function(eventData) {
		return this.bindAsObservable('submit', eventData);
	};
	proto.unloadAsObservable = function(eventData) {
		return this.bindAsObservable('unload', eventData);
	};	
    proto.oneAsObservable = function(eventType, eventData) {
		var parent;
        parent = this;
        return observableCreate(function(observer) {
			var handler;
            handler = function(eventObject) {
				parent.unbind(eventType, handler);
                observer.OnNext(eventObject);
				observer.OnCompleted();			
            };
            parent.bind(eventType, eventData, handler);
            return function() { };
        });
    };
    proto.readyAsObservable = function() {
		var parent;
        parent = this;
        return observableCreate(function(observer) {
			var handler;
            handler = function(eventObject) {
                observer.OnNext(eventObject);
            };
            parent.ready(handler);
            return function() {};
        });
    };	
    proto.hideAsObservable = function(duration) {
		var subject;
        subject = new asyncSubject();
        this.hide(duration, function() {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    };
    proto.showAsObservable = function(duration) {
		var subject;
        subject = new asyncSubject();
        this.show(duration, function() {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    };
    proto.animateAsObservable = function(properties, duration, easing) {
		var subject;
        subject = new asyncSubject();
        this.animate(properties, duration, easing, function() {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    };
    proto.fadeInAsObservable = function(duration) {
		var subject;
        subject = new asyncSubject();
        this.fadeIn(duration, function() {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    };
    proto.fadeToAsObservable = function(duration, opacity) {
		var subject;
        subject = new asyncSubject();
        this.fadeTo(duration, opacity, function() {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    };
    proto.fadeOutAsObservable = function(duration) {
		var subject;
        subject = new asyncSubject();
        this.fadeOut(duration, function() {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    };
    proto.slideDownAsObservable = function(duration) {
		var subject;
        subject = new asyncSubject();
        this.slideDown(duration, function() {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    };
    proto.slideUpAsObservable = function(duration) {
		var subject;
        subject = new asyncSubject();
        this.slideUp(duration, function() {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    };
    proto.slideToggleAsObservable = function(duration) {
		var subject;
        subject = new asyncSubject();
        this.slideToggle(duration, function()
        {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    };
    var ajaxAsObservable = _jQuery.ajaxAsObservable = function(settings) {
        var subject, internalSettings, k;
		internalSettings = {};
        for (k in settings) {
            internalSettings[k] = settings[k];
        }
        subject = new asyncSubject();
        internalSettings.success = function(data, textStatus, jqXHR) {
            subject.OnNext({ data: data, textStatus: textStatus, jqXHR: jqXHR });
            subject.OnCompleted();
        };
        internalSettings.error = function(jqXHR, textStatus, errorThrown) {
            subject.OnError({ jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown });
        };
        _jQuery.ajax(internalSettings);
        return subject;
    };
    _jQuery.getAsObservable = function(url, data, dataType) {
        return ajaxAsObservable({ url: url, dataType: dataType, data: data });
    };	
    _jQuery.getJSONAsObservable = function(url, data) {
        return ajaxAsObservable({ url: url, dataType: 'json', data: data });
    };
    _jQuery.getScriptAsObservable = function(url) {
        return ajaxAsObservable({ url: url, dataType: 'script'});
    };	
	_jQuery.postAsObservable = function(url, data, dataType) {
        return ajaxAsObservable({ url: url, dataType: dataType, data: data, type: 'POST'});	
	};
})();