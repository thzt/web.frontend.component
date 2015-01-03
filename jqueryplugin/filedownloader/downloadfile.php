<?php
	$filePath=$_GET["filePath"];
	
	$pattern="/^.*\/\[\d+\](.+?)$/";
	$matchCount=preg_match($pattern,$filePath,$matches);
	$fileName=$matches[1];
	
	downloadFile($filePath,$fileName);

	//$filePath是服务器的文件地址
	function downloadFile($filePath,$saveAsFileName){

		// 清空缓冲区并关闭输出缓冲
		ob_end_clean();    

		//r: 以只读方式打开，b: 强制使用二进制模式
		$fileHandle=fopen($filePath,"rb");    
		if($fileHandle===false){
			echo "Can not find file: $filePath\n";
			exit;
		}
		
		Header("Content-type: application/octet-stream");
		Header("Content-Transfer-Encoding: binary");
		Header("Accept-Ranges: bytes");
		Header("Content-Length: ".filesize($filePath));
		Header("Content-Disposition: attachment; filename=\"$saveAsFileName\"");
		
		while(!feof($fileHandle)) {
		
			//从文件指针 handle 读取最多 length 个字节
			echo fread($fileHandle, 32768);    
		}
		fclose($fileHandle);
	}

?>