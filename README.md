web.frontend.component
======================

Here are some common used web-frontend component.

In [/library](https://github.com/thzt/web.frontend.component/tree/master/library) directory, there are some pure javascript lib.

In [/jqueryplugin](https://github.com/thzt/web.frontend.component/tree/master/jqueryplugin) directory, there are some plugins based on jquery.

<br/>

About "underscore", it is a library provided some functional-style method,

some operation on set would be simplified by using it.

About "/bootstrap" "/bootstrap-datetimepicker" "/jquerymobile" "/webuploader", 

only a few libs depend on them, I write xxx-wrapper to capsulate them.

such as [modalwrapper](https://github.com/thzt/web.frontend.component/tree/master/jqueryplugin/modalwrapper) capsulated bootstrap modaldialog,

[datepickerwrapper](https://github.com/thzt/web.frontend.component/tree/master/jqueryplugin/datepickerwrapper) capsulated datetimepicker.

Why do I create these wrappers, you can see chinese blog: [设计的连续性](http://thzt.github.io/design/2015/03/20/design/)

<br/>

Dealing with each lib, I put all its utilities in one folder.

Most of libs, I create test-xxx.html to show the use-case of them separately.

<br/>

As you see, there would be so many jqueryplugins in real world project.

So I create a library to manage them. 

[/library/pluginmanager/pluginmanager.js](https://github.com/thzt/web.frontend.component/tree/master/library/pluginmanager)

**Therefore I can write plugins in an uniform way.**

For more details, you can see [testpluginmanager.html](https://github.com/thzt/web.frontend.component/blob/master/library/pluginmanager/testpluginmanager.html) in its own folder,

or chinese blogs: [jQuery插件的把玩方式](http://thzt.github.io/design/2015/03/24/jquery-plugin/)





