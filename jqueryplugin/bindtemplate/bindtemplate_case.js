//use
//window.Deque

(function ($,global) {
    $.pluginManager.extend('bindTemplate', {
        addHeadCase:addHeadCase,
		addTailCase:addTailCase,
		enumerateCase:enumerateCase
    });

	//here deque is shared by each $().bindTemplate('addHeadCase')/$().bindTemplate('addTailCase')$().bindTemplate('getDeque')
	var deque=new global.Deque();

    function addHeadCase(handleCase){
		deque.addFirst(handleCase);
		return this;
	}

	function addTailCase(handleCase){
		deque.addLast(handleCase);
		return this;
	}

	function enumerateCase(fn){
		return deque.enumerate(fn);
	}
} (jQuery,window));
