Usually, when I want to write a jquery plugin, 

First I imagine its use case.

I think it should be :

**html:**

	<div id="container"></div>

**js:**

	$('#container').pluginName('a','b','c');

<br/>

Then I can implement this interface.

	(function($){
		$.fn.extend({
			pluginName:pluginName
		});
		
		function pluginName(){
			var 
				//===$('#container')
				$selectedElements=this,  
				
				//==={'0':'a','1':'b','2':'c','length':'3'}
				args=arguments;
				
			//business logic
			
			//for chaining operation, $('#container').pluginName1(...).pluginName2(...)
			return this;
		}
	}(jQuery));

<br/>

However, all business logic must be write in one file,

because each time we call $.fn.extend({pluginName:...}) would override the older one.

<br/>

On the other hand, the operations on the plugins, we must deal with it manually.

For example, if we want to support 'init' opertaion, as below,

	$('#container').pluginName('init',value);

we must write the plugin library as this,

	function pluginName(){
		var $selectedElements=this,  
			args=arguments;
			
		switch(args[0]){
		    case 'init':
				return handleInitMethod.apply(this,arguments);
				
			//...
		}
	}

	function handleInitMethod(){
		var $selectedElements=this,  
		
			//==={'0':'init','1':value,,'length':'2'}
			args=arguments;
	}

It is hard to maintain, 

and even handleInitMethod include 'init' as its first argument,

I hope 'value' to be the first argument.

function handleInitMethod(value){}

<br/>

Because of these, I write a library called pluginmanager, 

used to write plugins.

<br/>

Let's recreate the use case.

	$('#container').pluginName('init',value);

<br/>

The implementation,

	(function($){
		$.pluginManager.extend('pluginManager',{
			init:init
		});
		
		function init(){
			var $selectedElements=this,
			
				//==={'0':value,'length':'1'}
				args=arguments; 
			
				//business logic
				
			return this;
		}
	}(jQuery));

It works!

<br/>

Let's look at the extensibility of the plugin.

If one day we want to use the plugin as this,

	$('#container').pluginName('getValue');

How to do this.

<br/>

It is simpler than the original jquery way.

I need only to create a new file.

	(function($){
		$.pluginManager.extend('pluginManager',{
			getValue:getValue
		});
		
		function getValue(){
			var $selectedElements=this,
			
				//==={'length':'0'}
				args=arguments; 
			
				//business logic
		}
	}(jQuery));

Cool! isn't it?
