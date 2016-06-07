(function (global) {
	global.avoidReentry = avoidReentry;

	function avoidReentry(opt) {
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

			var releaseLock = function () {
				release.apply(context, args);
				isLocked = false;
			};
			
			// currying with 'bind', pass 'releaseLock' as the additional parameter.
			// only IE >= 9 supported.
			event.bind(context, releaseLock).apply(null, args);
		};
	}

} (window));

