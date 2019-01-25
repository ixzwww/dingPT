
//深度克隆
function deepClone(origin, target) {
    var target = target || {};
    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {//防止克隆原型链上的
            if (typeof (origin[prop]) == 'object' && origin[prop] !== 'null') {
                target[porp] = Object.prototype.toString.call(origin[prop]) == "[object Array]" ? [] : {};
                arguments.callee(origin[prop], target[prop]);
            } else {
                target[prop] = origin[prop];
            }
        }
    }

    return target;
}

//圣杯模式继承
function inherit(target, origin) {
    function F() { };
    F.prototype = origin.prototype;
    target.prototype = new F();
    target.prototype.constuctor = target;
    target.prototype.uber = origin.prototype;
}

//typeof()改进
function myTypeof(input) {
    var output;

    if (typeof (input) != 'object') {
        output = typeof (input);
    } else {
        switch (Object.prototype.toString.call(input)) {
            case '[object Array]': output = 'array';
                break;
            case '[object Object]': output = 'object';
                break;
            case '[object Null]': output = 'null';
                break;
            case '[object Number]': output = 'number Object';
                break;
            case '[object String]': output = 'string Object';
                break;
            case '[object Boolean]': output = 'boolean Object';
                break;
        }
    }

    return output;
}

//hash数组去重
Array.prototype.uni = function () {
    var temp = {},
        arr = [],
        len = this.length;
    for (var i = 0; i < len; i++) {
        if (!temp[this[i]]) {
            temp[this[i]] = 'abc';
            arr.push(this[i]);
        }
    }
    return arr;
}


//字符串去重
function strUnique(input) {
    var strSplit = input.split('');
    var str = strSplit.unique();
    return str.join('');
}

//获取滚动条滚动长度
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

//获取可视窗口长宽
function getViewportOffset() {
    if(window.innerWidth) {
        return {
            w : window.innerWidth,
            h : window.innerHeight
        }
    }else{
        if(document.compatMode === "BackCompat") {
            return {
                w : document.body.clientWidth,
                h : document.body.clientHeight
            }
        }else{
            return {
                w : document.documentElement.clientWidth,
                h : document.documentElement.clientHeight
            }
        }
    }
}

//获取CSS样式
function getStyle(elem,prop) {
    if(window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    }else{
        return elem.currentStlyle[prop];
    }
}

//添加事件
function addEvent(elem, type, handle) {
    if(elem.addEventListener) {
        elem.addEventListener(type, handle, false);
    }else if(elem.attachEvent) {
        elem.attachEvent('on' + type, function() {
            handle.call(elem);
        })
    }else{
        elem['on' + type] = handle;
    }
}

//取消冒泡
function stopBubble(event) {
    if(event.stopPropagation) {
        event.stopPropagation();
    }else{
        event.cancelBubble = true;
    }
}

//取消默认事件
function cancelHandler(event){
    if(event.preventDefault) {
        event.preventDefault();
    }else{
        event.returnValue = false;
    }
}

//异步加载Js
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    if(script.readyState) {
        script.onreadystatechange = function(){
            if(script.readyState == "complete" || script.readyState == "loaded"){
                callback();
            }
        }
    }else{
        script.onload = function() {
            callback();
        }
    }
    script.src = url;
    document.head.appendChild(script);
}

//添加load事件
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {

            oldonload();
            func();
        }
    }
}

//在目标元素后添加元素
function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    } else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

//删除某个类
function removeClass(className) {
    var classList = document.getElementsByClassName(className);
    while (classList.length > 0) {
        classList[0].parentNode.removeChild(classList[0]);
    }
}

// 判断二维数组array中是否存在一维数组element
function arrayHasElement(array, element) {  
    for (var el of array) {
      if (el.length === element.length) {
        for (var index in el) {
          if (el[index] !== element[index]) {
            break;
          }
          if (index == (el.length - 1)) {    // 到最后一个元素都没有出现不相等，就说明这两个数组相等。
            return true;
          }
        }
      }
    }
    return false;
  }

  //生成lower到upper的随机整数，包含lower,upper
  function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}


//转换为json格式
function changejson(value) {
    var oStr = '';
    　　for (var key in value) {
        　　　　oStr += key + "=" + value[key] + "&";
    　　};
    　　return oStr;
}

//返回长度为length的随机字符串
function random(length) {
    var str = Math.random().toString(36).substr(2);
    if (str.length>=length) {
        return str.substr(0, length);
    }
    str += random(length-str.length);
    return str;
}