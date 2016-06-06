(function (global) {

	global.preventEvent = preventEvent;

	function preventEvent(opt) {
		var lock = opt.lock,
			release = opt.release,
			event = opt.event,

			isLocked = false;

		return function () {
			var context = this,
				args = arguments;

			if (isLocked) {
				return;
			}

			lock.apply(context, args);
			isLocked = true;

			var eventArgs = [].slice.call(args, 0);
			eventArgs.unshift(function () {
				release.apply(context, args);
				isLocked = false;
			});
			event.apply(context, eventArgs);
		};
	}

} (window));