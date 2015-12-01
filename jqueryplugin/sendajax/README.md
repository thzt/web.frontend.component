## **Background**

Ajax is now a common way to interact with the server.

It is a public region of the front/back end development.

Therefore, it is useful to take over the control of it with the spirit of AOP.

## **The use case**

At first, I'm used to think of the use case before focusing on the design.

```javascript
$.sendAjax({
	url:'/Home/Index',
    data:{
		a:1
	},
	success:function(r){
		console.log(r);
	}
});
```

I wrappered the underlaying implementation of the XMLHttpRequest by jQuery.

So I create a static class-like method to $ instead of window.sendAjax.

Besides, The POST request is most commonly used.

So **$.sendAjax** would send POST request by default.

## **Configurability**

The core feature of **$.sendAjax** is sufficient,

but there are also many case it can't cover.

I need some configurable parameters.

```javascript
$.sendAjax({
	type:'get',
	url:'/Home/Index',
	data:{
		a:1,
		b:{
			c:1,
			d:{}
		}
	},
	success:function(r){
		console.log(r);
	},
	complete:function(){
	
	},
	serialize:function(data){
		return $.param(data).replace(/(%5B)(.*?)(%5D)/g,'.$2');
	}
});
```

## **Flexibility and extensibility **

I can not assume how a library would be used in the future.

and I also can't assume it would always be a AJAX request underlaying.

So I need a higher-level abstraction.

```javascript
$.interaction({
	parameter:{},
	handler:{},
	method:function(){}
});
```

Finally, **$.sendAjaxByExtension** is only an instance(concretion) of the abstraction.

```javascript
$.sendAjaxByExtension({
	url:'/Home/Index',
	data:{
		a:1
	},
	success:function(r){
		console.log(r);
	}
});
```
