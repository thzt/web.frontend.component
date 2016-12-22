(function(global){
	global.htmlConvertor={
		encode:function(html){
			return html.length===0
				?''
				:html.replace(/&/g, '&amp;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
					.replace(/ /g,'&nbsp;')
					.replace(/\'/g, '&#39;')
					.replace(/\"/g, '&quot;')
					.replace(/\n/g, '<br/>');
		},
		decode:function(str){
			return str.length===0
				?''
				:str.replace(/&amp;/g, '&')
					.replace(/&lt;/g, '<')
					.replace(/&gt;/g, '>')
					.replace(/&nbsp;/g,' ')
					.replace(/&#39;/g, '\'')
					.replace(/&quot;/g, '\"')
					.replace(/<br\/>/g, '\n');
		},
		addSlashes:function(html){
			return html.length===0
				?''
				:html.replace(/\'/g, '\\\'')
					.replace(/\"/g, '\\\"');
		},
		deleteSlashes:function(html){
			return html.length===0
				?''
				:html.replace(/\\\'/g, '\'')
					.replace(/\\\"/g, '\"');
		}
	};
}(this));