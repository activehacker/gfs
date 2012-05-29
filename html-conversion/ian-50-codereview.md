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

In practice, the second solution works.

### 4. null vs undefined
1. JavaScript contains a small set of data types. It has the three primitive types boolean, number, and string and the special values null and undefined. Everything else is variations on the object type.

2.  JavaScript treats false, null, undefined, "" (the empty string), and the number 0 as false. All other values are treated as true.

3. The && operator is commonly called logical and. It can also be called guard. If the first operand is false, null, undefined, "" (the empty string), or the number 0 then it returns the first operand. Otherwise, it returns the second operand. This provides a convenient way to write a null-check:

```javascript
var value = p && p.name; /* The name value will only be retrieved from p if p has a value, avoiding an error. */
```

```javascript
alert(typeof null)​; //Object
alert(typeof undefined)​;​ //undefined
```

```javascript
alert(Boolean(""));//false
alert(Boolean(234));//true
```

### 5. == vs ===
[Why is comparing with just "!=" not good enough?](http://bytes.com/topic/javascript/answers/600166-why-comparing-just-not-good-enough)

* exmaple 1:

```javascript
var x = undefined;
alert( x == null ) // shows true
alert( x === null ) // shows false
```
It depends on whether you want x to be equivalent to null or *exactly*
null. It's called the strict equality operator for a reason! :-)

* exmaple 2:

```javascript
var x = undefined;
var x = getNumberOrNull();
if (x != null) {

}
```
In this example, getNumberOrNull() could return zero. Zero and null
both evaluate to false

### 6. CSS basic concept
[CSS 1](http://fridayu.sinaapp.com/)

## Sprint 52

### 1. Initialize JQuery objects and Arch components in different location

* Initialize JQuery objects after locale parse, before render complete

```javascript
html = active.localize.parse(html);
var $html = $(html);

var $paymentAccountSettingsContent = $html.find('#paymentAccountSettingsContent'); 
var $editPrimaryAccountContentHeader = $html.find('#editPrimaryAccountContentHeader');
var $addAccountContentHeader = $html.find('#addAccountContentHeader');
```
* Initialize Arch components after render complete

```javascript
active.render($html, function(){
	form = active.getComponent($html.find('#paymentAccountForm'));
	accountNameInput = active.getComponent($html.find('#accountNameInput'));
});
```
### 2. Semicolon Insertion

```javascript
var bankCountriesArray = bankCountries.split(",")
```
It is highly recommended that you provide the necessary semicolons yourself. 
This is because there are cases where the interpreter may make mistakes when inserting the semicolons. An example is...
```javascript

return
	true;
```	
After Semicolon insertion, that will become...
```javascript

return;
	true;
```	
[JavaScript Semicolon Insertion](http://www.openjs.com/articles/semicolon_insertion.php)

### 3. Strictly equlity
```javascript
if (routingNumberDigitsSum == 0) {
	return false;
}

if (bankCountry == "US" && !isUnitedStatesRoutingNumber(routingNumber)) { ...
```

```javascript
0            ==   ""            // true
0            ==   "0"           // true
false        ==   "0"           // true
false        ==   null          // false
null         ==   undefined     // true
```
* The use of == is widely regarded as bad practice. 
* It introduces hard-to-track-down bugs due to its complicated conversion rules.
 

```javascript
0            ===   ""            // false
0            ===   "0"           // false
false        ===   "0"           // false
false        ===   null          // false
null         ===   undefined     // false
```
* The above results are a lot clearer and allow for early breakage of code. 
* This hardens code to a certain degree and also gives performance improvements in case the operands are of different types.
[JavaScript Equality and Comparisons](http://bonsaiden.github.com/JavaScript-Garden/#types.equality)

### 4. Use Constants

```javascript
function validate (value) {
	if (!value) {
		alert("Invalid value");
		location.href = "/errors/invalid.php";
	}
}

var Constants = {
	INVALID_MSG : "Invalid value",
	INVALID_URL: "/errors/invliad.php"
};

function validate (value) {
	if (!value) {
		alert(Constans.INVALID_MSG);
		location.href = Constants.INVALID_URL;
	}
}
```

