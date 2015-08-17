## **Background and server side template**

The page showing in the browser only consists of html tags.

These tags are created by the server, usually by a server side template engine.

For example, Razor in ASP.NET MVC or JSTL in Java.

We use special defined tags as placeholders, and then render data to inplace them.

<br/>

However, the client side is not so simple as server side.

the client has to parse the html tree, and grab data from the tree.

## **DOM**

The DOM is the parsed object of the html, providing only a few method to get the position of tags.

```javascript
document.getElementById
document.getElementsByTagName
document.getElementsByClassName
```

jQuery is a pioneer which create a way to get tag object from CSS selector.

It is very convenient for us to get data from page.

<br/>

As time goes on, people find some weakness of jQuery,

jQuery can't set/get structural data.

Such as, if we have data as json format:

```javascript
var json={
	name: 'Jhon',
	parents: ['Tom','Jerry']
}
```

We can't set the data to the following html directly.

```html
<div id="informationPanel">
	<div>
		<span>Name:</span>
		<span><!-- here write the name --></span>
	</div>
	<div>
		<span>Parents:</span>
		<span><!-- here write parent name --></span>
		<span><!-- here write parent name --></span>
	</div>
</div>
```

```javascript
$('#informationPanel>div:nth-child(1)>span:nth-child(2)').html(json.name);
$('#informationPanel>div:nth-child(2)>span:nth-child(2)').html(json.parents[0]);
$('#informationPanel>div:nth-child(2)>span:nth-child(3)').html(json.parents[1]);
```

It's verbose.

## **lightweight two-way binding library**

At the same time, many good library begin to provide MVVM pattern,

they can bind data to html fragment, such as "Knockout", "AngularJS" and so on.

It's very good, but I can't get rid of the restriction of giving framework,

I have to depend strongly on them, that's not I wish to.

<br/>

Writing a lightweight two-way binding library is necessary,

So I create one.

<br/>

As well as other library, first I would design the use case,

I select the way AngularJS does.

```html
<div id="informationPanel">
	<div>
		<span>Name:</span>
		<span data-model="name"><!-- here write the name --></span>
	</div>
	<div>
		<span>Parents:</span>
		<span data-model="parents[0]"><!-- here write parent name --></span>
		<span data-model="parents[1]"><!-- here write parent name --></span>
	</div>
</div>
```

```javascript
$('#informationPanel').bindTemplate('setData',{
	data:json
})
```

That' all. Isn't it simple ? 

We only need to set a new attribute to the span.

## **Specify the binding way**

You may ask, why do I have to use an attribute called 'data-model' ?

or why do I set the data as elements' innerHTML ?

or can I set attribute as data-model="parents", then I can get an array ['Tom','Jerry'] ?

<br/>

Of course!

```javascript
$('#informationPanel').bindTemplate('setData',{
	data:json,
	attr:'data-bind',
	set:function(val){
		var $field=this,
			childrenIndex=$field.index();
		
		if(data.length!=null){
			$field.attr('data-value',val[childrenIndex-1]);
			return;
		}
		
		$field.attr('data-value',val);
	}
})
```

```html
<div id="informationPanel">
	<div>
		<span>Name:</span>
		<span data-bind="name" data-value="Jhon"></span>
	</div>
	<div>
		<span>Parents:</span>
		<span data-bind="parents" data-value="Tom"></span>
		<span data-bind="parents" data-value="Jerry"></span>
	</div>
</div>
```

## **Default setting**

It tastes good.

But I don't want to write attr/set each time.

No problem, you can write a config file.

```javascript
(function($){

	$.pluginManager.filter('bindTemplate',{
		setData:filterSetData
	});
	
	function setData(){
		var data=arguments[0].data,
			attr=arguments[0].attr,
			set=arguments[0].set;
			
		return [{
			data:data,
			attr:attr||'data-bind',
			set:set||defaultSetMethod
		}];
	}
	
	function defaultSetMethod(val){
		var $field=this,
			childrenIndex=$field.index();
		
		if(data.length!=null){
			$field.attr('data-value',val[childrenIndex-1]);
			return;
		}
		
		$field.attr('data-value',val);
	}

}(jQuery));
```

```javascript
$('#informationPanel').bindTemplate('setData',{
	data:json
})
```

The only remaining problem is, 

I once consider to write many default setting for each container.

so every html fragment can have an individual binding style.

At last, I drop this idea, because it will make the plain issue complicated.

## **Symmetry**

By the way, here only introduce the 'setData',

this repository holds a two-way binding library.

we of course can get data directly to a json object.

```javascript
$('#informationPanel').bindTemplate('getData')
=== {
	name: 'Jhon',
	parents: ['Tom','Jerry']
}
```

Beautiful!





 
