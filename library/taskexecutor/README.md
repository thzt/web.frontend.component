## **Introduction**

This library creates a task executor,

it can help me poll data from the server.

<br/>

Other than introduce the implementation,

I would like to introduce the idea I have got.

## **Past practice**

Once upon a time, I sent ajax like this,

```javascript
$.sendAjax({
	url:'xxx',
	data:data,
	success:function(){
	}
});
```

But, how can I poll data from the server every 5s.

The simplese way, we can use setInterval.

```javascript
window.setInterval(function(){
	$.sendAjax({
		url:'xxx',
		data:data,
		success:function(){
		}
	});
},5000);
```

Unfortunately, it is not correct,

because setInterval only add task to the javascript event queue,

whether or not the task is finished, the next task would be executed after 5s.

## **Common practice**

So, I have to send ajax when success event happen.

```javascript
$.sendAjax({
	url:'xxx',
	data:data,
	success:function(){
		
		setTimeout(function(){
			$.sendAjax({
				url:'xxx',
				data:data,
				success:function(){
				}
			});
		},5000);
	}
});
```

It is a bit ugly,

and it can only send ajax twice,

how about three times?

```javascript
$.sendAjax({
	url:'xxx',
	data:data,
	success:function(){
		
		setTimeout(function(){
			$.sendAjax({
				url:'xxx',
				data:data,
				success:function(){
					
					setTimeout(function(){
						$.sendAjax({
							url:'xxx',
							data:data,
							success:function(){
								
							}
						});
					},5000);
				}
			});
		},5000);
	}
});
```

I could not say any more, the callback hell.

## **More advanced**

why not create a tool function?

It is a good idea.

```javascript
function sendAjaxRecusively(){
	$.sendAjax({
		url:'xxx',
		data:data,
		success:function(){
			setTimeout(function(){
				sendAjaxRecusively();
			},5000);
		}
	});
}

sendAjaxRecusively();
```

<br/>

But, It is not an elegant design.

My lib depends on $.sendAjax, why the user of the lib must send ajax.

They would execute any async task.

## **Elegant way**

So, Let's reexamine the problem,

what's the use case ?

```javascript
var executor = window.taskExecutor.create({
    interval: 5000
});

executor.begin(0, function (value, next) {
	//business logic
	 
	//next task
	next(nextValue);
});
```

above, I want to create an executor, given the interval the executor takes.

and then it can begin to execute task, with initial value 0,

then the task would be executed, "next" is a function, represent the the task itself.

<br/>

After finish the business logic, the user call the next() function,

passing a new value.

<br/>

About the ajax case, I can use this,

```javascript
executor.begin(data, function (value, next) {
	$.sendAjax({
		url:'xxx',
		data:data,
		success:function(r){
			next(data);
		}
	});
});
```

Perfect!

By the way, I also implement three other interface.

```javascript
executor.pause();
executor.resume();
executor.stop();
```

You can have a try.

## **Amazing**

what? the "next" is a function? 

Yes, it is.

It is the graceful part of functional programming.

Enjoy it.
