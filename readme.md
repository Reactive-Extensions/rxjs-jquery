jQuery Bindings for the Reactive Extensions for JavaScript
==========================================================
## OVERVIEW

This project provides Reactive Extensions for JavaScript (RxJS) bindings for jQuery to abstract over the event binding, Ajax and Deferreds.  The RxJS libraries are not included with this release and must be installed separately.

## GETTING STARTED

There are a number of ways to get started with L2O.js depending on your environment.  

### Download the Source

To download the source of the jQuery Bindings for the Reactive Extensions for JavaScript, type in the following:

    git clone https://github.com/Reactive-Extensions/rxjs-jquery.git
    cd ./rxjs-jquery

### Installing with NuGet

Coming soon!

### Getting Started with the jQuery Bindings

Let's walk through a simple yet powerful example of the Reactive Extensions for JavaScript Bindings for jQuery, autocomplete.  In this example, we will take user input from a textbox and trim and throttle the input so that we're not overloading the server with requests for suggestions.

We'll start out with a basic skeleton for our application with script references to jQuery, RxJS, RxJS Time-based methods, and the RxJS Bindings for jQuery, along with a textbox for input and a list for our results.

	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="rx.min.js"></script>
	<script type="text/javascript" src="rx.time.min.js"></script>
	<script type="text/javascript" src="rx-jquery.js"><script>
	<script type="text/javascript">
		$(function () {
			...
		})();
	</script>
	...
	<input id="textInput" type="text"></input>
	<ul id="results"></ul>
	...

The goal here is to take the input from our textbox and throttle it in a way that it doesn't overload the service with requests.  To do that, we'll get the reference to the textInput using jQuery, then bind to the 'keyup' event using the keyupAsObservable method which then takes the jQuery object and transforms it into an RxJS Observable. 
 
	var throttledInput = $('#textInput')
		.keyupAsObservable()

Since we're only interested in the text, we'll use the [select](http://msdn.microsoft.com/en-us/library/hh244311(v=VS.103).aspx) method to take the event object and return the target's value.  

		.select( function (ev) {
			return $(ev.target).val();
		})

We're also not interested in query terms less than two letters, so we'll trim that user input by using the [where](http://msdn.microsoft.com/en-us/library/hh229267(v=VS.103).aspx) method returning whether the string length is appropriate.

		.where( function (text) {
			return text.length > 2;
		})

We also want to slow down the user input a little bit so that the external service won't be flooded with requests.  To do that, we'll use the [throttle](http://msdn.microsoft.com/en-us/library/hh229298(v=VS.103).aspx) method with a timeout of 500 milliseconds, which will ignore your fast typing and only return a value after you have paused for that time span.  

		.throttle(500)

Lastly, we only want distinct values in our input stream, so we can ignore requests that are not unique, for example if I copy and paste the same value twice, the request will be ignored.

		.distinctUntilChanged();

Putting it all together, our throttledInput looks like the following:

	var throttledInput = $('#textInput')
		.keyupAsObservable()
		.select( function (ev) {
			return $(ev.target).val();
		})
		.where( function (text) {
			return text.length > 2;
		})
		.throttle(500)
		.distinctUntilChanged();

Now that we have the throttled input from the textbox, we need to query our service, in this case, the Wikipedia API, for suggestions based upon our input.  To do this, we'll create a function called searchWikipedia which calls the jQuery.ajaxAsObservable method which wraps the existing jQuery Ajax request in an RxJS [AsyncSubject](http://msdn.microsoft.com/en-us/library/hh229363(v=VS.103).aspx).

	function searchWikipedia(term) {
		return $.ajaxAsObservable({
			url: 'http://en.wikipedia.org/w/api.php',
			data: { action: 'opensearch',
					search: term,
					format: 'json' }
			dataType: 'jsonp'
		});
	}

Now that the Wikipedia Search has been wrapped, we can tie together throttled input and our service call.  In this case, we will call select on the throttledInput to then take the text from our textInput and then use it to query Wikipedia, filtering out empty records.  Finally, to deal with concurrency issues, we'll need to ensure we're getting only the latest value.  Issues can arise with asynchronous programming where an earlier value, if not cancelled properly, can be returned before the latest value is returned, thus causing bugs.  To ensure that this doesn't happen, we have the [switchLatest](http://msdn.microsoft.com/en-us/library/hh229197(v=VS.103).aspx) method which returns only the latest value.

	var suggestions = throttledInput.select( function (text) {
 		return searchWikipedia(text);
	})
	.where( function (data) {
		return data.length == 2 && data[1].length > 0;
	})
	.switchLatest();

Finally, we'll subscribe to our observable by calling subscribe which will receive the results and put them into an unordered list.  We'll also handle errors, for example if the server is unavailable by passing in a second function which handles the errors.

	suggestions.subscribe( function (data) {
		var selector = $('#results');
		selector.clear();
		$.each(data[1], function (_, text) {
			$('<li>' + text + '</li>').appendTo(selector);
		});
	}, function (e) {
		selector.clear();
		$('<li>Error: ' + e + '</li>').appendTo('#results');
	});

We've only scratched the surface of this library in this simple example.
		
### Implemented Bindings

* jQuery Events
 * [bind](http://api.jquery.com/bind/) - bindAsObservable
 * [delegate](http://api.jquery.com/delegate/) - delegateAsObservable
 * [live](http://api.jquery.com/live/) - liveAsObservable
 * [on](http://api.jquery.com/on/) - onAsObservable
 * [one](http://api.jquery.com/one/) - oneAsObservable

* jQuery Event Shortcuts
 * [change](http://api.jquery.com/change/) - changeAsObservable
 * [click](http://api.jquery.com/click/) - clickAsObservable
 * [dblclick](http://api.jquery.com/dblclick/) - dblclickAsObservable
 * [focus](http://api.jquery.com/focus/) - focusAsObservable
 * [focusin](http://api.jquery.com/focusin/) - focusinAsObservable
 * [focusout](http://api.jquery.com/focusout/) - focusoutAsObservable
 * [hover](http://api.jquery.com/hover/) - hoverAsObservable
 * [keydown](http://api.jquery.com/keydown/) - keydownAsObservable
 * [keypress](http://api.jquery.com/keypress/) - keypressAsObservable
 * [keyup](http://api.jquery.com/keyup/) - keyupAsObservable
 * [load](http://api.jquery.com/load/) - loadAsObservable
 * [mousedown](http://api.jquery.com/mousedown/) - mousedownAsObservable
 * [mouseenter](http://api.jquery.com/mouseenter/) - mouseenterAsObservable
 * [mouseleave](http://api.jquery.com/mouseleave/) - mouseleaveAsObservable
 * [mousemove](http://api.jquery.com/mousemove/) - mousemoveAsObservable
 * [mouseover](http://api.jquery.com/mouseover/) - mouseoverAsObservable
 * [mouseup](http://api.jquery.com/mouseup/) - mouseupAsObservable
 * [ready](http://api.jquery.com/ready/) - readyAsObservable
 * [resize](http://api.jquery.com/resize/) - resizeAsObservable
 * [scroll](http://api.jquery.com/scroll/) - scrollAsObservable
 * [select](http://api.jquery.com/select/) - selectAsObservable
 * [submit](http://api.jquery.com/submit/) - submitAsObservable
 * [unload](http://api.jquery.com/unload/) - unloadAsObservable
 
* jQuery Effects
 * [animate](http://api.jquery.com/animate/) - animateAsObservable
 * [fadeIn](http://api.jquery.com/fadeIn/) - fadeInAsObservable
 * [fadeOut](http://api.jquery.com/fadeOut/) - fadeOutAsObservable
 * [fadeTo](http://api.jquery.com/fadeTo/) - fadeToAsObservable
 * [fadeToggle](http://api.jquery.com/fadeToggle/) - fadeToggleAsObservable
 * [hide](http://api.jquery.com/hide/) - hideAsObservable
 * [show](http://api.jquery.com/show/) - showAsObservable
 * [slideDown](http://api.jquery.com/slideDown/) - slideDownAsObservable
 * [slideToggle](http://api.jquery.com/slideToggle/) - slideToggleAsObservable
 * [slideUp](http://api.jquery.com/slideUp/) - slideUpAsObservable

* Ajax Methods
 * [ajax](http://api.jquery.com/jQuery.ajax/) - ajaxAsObservable
 * [get](http://api.jquery.com/jQuery.get/) - getAsObservable
 * [getJSON](http://api.jquery.com/jQuery.getJSON/) - getJSONAsObservable
 * [getScript](http://api.jquery.com/jQuery.getScript/) - getScriptAsObservable
 * [post](http://api.jquery.com/jQuery.post/) - postAsObservable

* Deferreds
 * Deferred.toObservable
 * Rx.Observable.toDeferred

* Callbacks
 * Callbacks.toObservable

## LICENSE

Copyright 2011 Microsoft Corporation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.