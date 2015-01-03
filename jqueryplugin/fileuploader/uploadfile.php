<?php
	$fileName=$_FILES["file"]["name"];
	$originFilePath=$_FILES["file"]["tmp_name"];
	
	$targetFilePath=sprintf(
		"../../../content/uploadfiles/[%s]%s",    //change fileName to avoid conflict
		time(),$fileName
	);
	
	$result=move_uploaded_file($originFilePath,$targetFilePath);
	
	if(!$result){
		echo responseJson(false,"move_uploaded_file failed.");
		return;
	}
	
	echo responseJson(true,$targetFilePath);
	
	function responseJson($status,$content)
	{
		//get buttonId, fileUploader.fn.trigger used it to dispatch
		$buttonId=$_POST["buttonId"];
	
		$json->status=$status;
		$json->buttonId=$buttonId;
		$json->content=$content;
		
		return sprintf(
			"
				<script>
					parent.$().fileUploader('trigger',%s);
				</script>
			",
			json_encode($json)
		);
	}
?>