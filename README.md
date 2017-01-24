动画库主要封装了，根据元素不同的属性，进行位移，颜色，大小，透明度等的变化。   
使用：  
1、将js文件夹下的animate.js文件引入到页面中
2、直接给animate传递相应的参数执行即可    

```javascript
     /*
     @param {Object} ele 要操作的元素  
     @param {Object} target 属性的目标值   
     @param {Number} duration 执行的时间
     @param {Number} effect tween动画效果
     @param {Function} callback 动画执行完要执行的函数
     */
     animate(ele,target,duration,effect,callback)
```