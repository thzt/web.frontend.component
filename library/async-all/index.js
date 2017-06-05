(function(){
	window.asyncAll=asyncAll;

	function asyncAll(taskList,success){
		var completedTaskCount=0,
			taskCount=taskList.length;

		taskList.forEach(function(task){
			task(function(){
				completedTaskCount++;
				if(completedTaskCount!==taskCount){
					return;
				}

				success();
			});
		});
	}
}());
