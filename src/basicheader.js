    // Headers
    var observable = Rx.Observable,
        observableProto = observable.prototype,
        AsyncSubject = Rx.AsyncSubject,
        observableCreate = observable.create,
        observableCreateWithDisposable = observable.createWithDisposable,
        disposableEmpty = Rx.Disposable.empty,
        slice = Array.prototype.slice,
        proto = $.fn;

    function observableCreateRefCount(subscribe) {
    	return observableCreate(subscribe).publish().refCount();
    }
    