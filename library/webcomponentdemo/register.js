(function(){
	var proto=Object.create(HTMLElement.prototype);
	
	proto.createdCallback=function(){
		var element=this;
		
		var shadowRoot=element.createShadowRoot();
		var externalDoc=document.querySelector('#import1').import;
		var tmpl=externalDoc.querySelector('template').content;

		shadowRoot.appendChild(tmpl.cloneNode(true));

		setInterval(function(){
			shadowRoot.querySelector('.clock').innerHTML=new Date();
		},1000);
	};

	document.registerElement('my-clock',{
		prototype:proto
	});
}());

