//use

(function ($) {
    $.pluginManager.extend('bindTemplate', {
        addHeadCase:addHeadCase,
		addTailCase:addTailCase,
		getCaseList:getCaseList
    });

	var caseList=[];

    function addHeadCase(handleCase){
		var $container=$(this);
		
		caseList.unshift(handleCase);
		return this;
	}

	function addTailCase(handleCase){
		var $container=$(this);

		caseList.push(handleCase);
		return this;
	}

	function getCaseList(){
		var $container=$(this);

		return caseList;
	}
} (jQuery));
