//use

(function ($) {
    $.pluginManager.extend('bindTemplate', {
        addCase:addCase,
		getCaseList:getCaseList
    });

	var caseList=[];

    function addCase(handleCase){
		var $container=$(this);
		
		caseList.push(handleCase);
		return this;
	}

	function getCaseList(){
		var $container=$(this);

		return caseList;
	}
} (jQuery));
