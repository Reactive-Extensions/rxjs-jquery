/// <reference path="../jquery/jquery.d.ts" />
/// <reference path="../rx.js/rx.all.ts" />

interface JQueryStatic {
    ajaxAsObservable<T>(settings: JQueryAjaxSettings): Rx.Observable<T>;
    getAsObservable<T>(url: string, dataType?: string): Rx.Observable<T>;
    getAsObservable<T>(url: string, data: string, dataType?: string): Rx.Observable<T>;
    getAsObservable<T>(url: string, data: Object, dataType?: string): Rx.Observable<T>;
    getJSONAsObservable<T>(url: string, data: Object): Rx.Observable<T>;
    getScriptAsObservable<T>(url: string): Rx.Observable<T>;
    postAsObservable<T>(url: string, dataType?: string): Rx.Observable<T>;
    postAsObservable<T>(url: string, data: Object, dataType?: string): Rx.Observable<T>;
}

interface JQuery {
    onAsObservable<T>(eventType: string, selector?: string): Rx.Observable<T>;
    onAsObservable<T>(eventType: string, selector: string, eventData?: any): Rx.Observable<T>;
    bindAsObservable<T>(eventType: string, eventData?: any): Rx.Observable<T>;
    delegateAsObservable<T>(selector: string, eventType: string, eventData?: any): Rx.Observable<T>;
    delegateAsObservable<T>(element: Element, eventType: string, eventData?: any): Rx.Observable<T>;
    liveAsObservable<T>(eventType: string, data: any): Rx.Observable<T>;
    focusAsObservable<T>(eventData?: any): Rx.Observable<T>;
    focusinAsObservable<T>(eventData?: any): Rx.Observable<T>;
    focusoutAsObservable<T>(eventData?: any): Rx.Observable<T>;
    keydownAsObservable<T>(eventData?: any): Rx.Observable<T>;
    keyupAsObservable<T>(eventData?: any): Rx.Observable<T>;
    loadAsObservable<T>(eventData?: any): Rx.Observable<T>;
    mousedownAsObservable<T>(eventData?: any): Rx.Observable<T>;
    mouseenterAsObservable<T>(eventData?: any): Rx.Observable<T>;
    mouseleaveAsObservable<T>(eventData?: any): Rx.Observable<T>;
    mousemoveAsObservable<T>(eventData?: any): Rx.Observable<T>;
    mouseoutAsObservable<T>(eventData?: any): Rx.Observable<T>;
    mouseoverAsObservable<T>(eventData?: any): Rx.Observable<T>;
    mouseupAsObservable<T>(eventData?: any): Rx.Observable<T>;
    resizeAsObservable<T>(eventData?: any): Rx.Observable<T>;
    scrollAsObservable<T>(eventData?: any): Rx.Observable<T>;
    selectAsObservable<T>(eventData?: any): Rx.Observable<T>;
    submitAsObservable<T>(eventData?: any): Rx.Observable<T>;
    unloadAsObservable<T>(eventData?: any): Rx.Observable<T>;
    oneAsObservable<T>(events: string): Rx.Observable<T>;
    showAsObservable<T>(options: JQueryAnimationOptions): Rx.Observable<T>;
    animateAsObservable<T>(properties: Object, options: JQueryAnimationOptions): Rx.Observable<T>;
    fadeInAsObservable<T>(options: JQueryAnimationOptions): Rx.Observable<T>;
    fadeToAsObservable<T>(duration: string, opacity: number, easing?: string): Rx.Observable<T>;
    fadeToAsObservable<T>(duration: number, opacity: number, easing?: string): Rx.Observable<T>;
    fadeOutAsObservable<T>(options: JQueryAnimationOptions): Rx.Observable<T>;
    fadeToggleAsObservable<T>(options: JQueryAnimationOptions): Rx.Observable<T>;
    slideDownAsObservable<T>(options: JQueryAnimationOptions): Rx.Observable<T>;
    slideUpAsObservable<T>(options: JQueryAnimationOptions): Rx.Observable<T>;
    slideToggleAsObservable<T>(options: JQueryAnimationOptions): Rx.Observable<T>;
    toggleAsObservable<T>(duration: string, easing: string): Rx.Observable<T>;
    toggleAsObservable<T>(duration: number, easing: string): Rx.Observable<T>;
}
