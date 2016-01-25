## View Model Tool

#### MVVM

MVVM is a new architecture pattern which is first introduced in WPF.

It is an effective way to separate UI from business code.

During the development of WPF, people use XMAL to describe the changeful UI.

The data(View Model) will bind to the UI(View) automatically in the bidirectional way.

It is so convenient that the business code only need to deal with the data(ViewModel).

#### using MVVM in the web front end development

There are many library/framework using MVVM in the web front end.

Such as, Knockout, AngularJS, Avalon, Vue.js, etc.

They are both bind the ViewModel and UI **automatically**.

Consequently, it is quite easy to destroy this binding relationship by the modification of the the View directly.

Therefore, in MVVM world, it is a bad practice to modify the DOM directly,

you must first modify the ViewModel and then affect the View indirectly.

Under some certain circumstances, if there are alrealy some pages building in non-MVVM way,

it will be very difficult to delete all the code used to modify the DOM.

**Should we have to use MVVM globally ?**

#### Lightweight two-way binding

If we give up the idea that we need the two-way **automatical** binding,

we will find the answer.

We can put the data(ViewModel) to the UI(View) manually, and collect data(ViewModel) from the UI(View) manually.

If so, the world would be quiet.

#### ViewModelTool library

In fact, all we should do is find value from property path, and collect data from property-value mappings.

For example: 

```javascript
var users=[{
    name:'Jhon',
    parents:['Tom','Jerry']
}];
```

How can we get the value from the property path "[0].parents[1]", which is "Jerry" ? (users[0].parents[1]==='Jerry')

Let's show the use case:

```javascript
var value=viewModelTool.focus.call(users,'[0].parents[1]');
```

The "viewModelTool.focus" will complete this task.

How can we get the object from the property-value mappings as follow ?

```javascript
var data=viewModelTool.collect([
    {
        prop:'[0].name',
        value:'Jhon'
    },{
        prop:'[0].parents[0]',
        value:'Tom'
    },{
	    prop:'[0].parents[1]',
	    value:'Jerry'
    }
]);
```

```javascript
data===[{
    name:'Jhon',
    parents:['Tom','Jerry']
}]
```

The "viewModelTool.collect" will collect an object from the mappings.

As to whether use this bool to handle DOM or in the MVVM way, as you want.
