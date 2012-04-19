# Sprint 50-td Code Review Summaries

#### 1. White space in form

###### editEmail.html:
	
```html
	<h3>{i18n:email.edit.tracking}</h3>
    <hr>
    <h4>{i18n:email.edit.tracking.description}</h4>
```    	

##### editHtml after rendered

```html
	<h3>{i18n:email.edit.tracking}</h3>
	<div style="height: 15px"/>
    <hr>
    <div style="height: 15px"/>
    <h4>{i18n:email.edit.tracking.description}</h4>
    <div style="height: 15px"/>
```

##### solution: add a parent div

```html
    <div>
		<h3>{i18n:email.edit.tracking}</h3>
	    <hr>
	    <h4>{i18n:email.edit.tracking.description}</h4>
    </div>
```

##### Root cause: Form will automatically add a space in each first level child
```javascript
Form.render = function(context) {
    var $html = context.get$Html();
    var $error = $("<div id='errorNotification' data-render='active.fnd.aui.components.ErrorNotification' style='display: none;'></div>");
    context.render($error);
    $html.prepend($error);
    $html.children().after("<div style='height: 15px;'></div>");
};
```


### 2. Scroll top when there is some validation error

##### code:

```javascript
$('body').scrollTop(0);
```
* [JQuery scollTop API](http://api.jquery.com/scrollTop/)
* [top, scrollTop, offsetTop, clientTop](http://www.jb51.net/article/502.htm)
* [Demo: JQuery scollTop API](http://jsfiddle.net/ianjiang/WzHPR/1/)

### Inhencement TODO: Automatically scoll to the first field with error

### 3 How to get form component
```javascript
form = new Form($html.find("#editEmailForm"));
```
or

```javascript
form = Renderer.getCompoent($html.find("#editEmailForm"));
```

### 4. null vs undefined
### 5. == vs ===
### 6. CSS basic concept
[CSS 1](http://fridayu.sinaapp.com/)
