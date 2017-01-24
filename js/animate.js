window.animate = (function (){
    function animate(ele,target,duration,effect,callback){ //要操作的元素，目标值，间隔，效果，动画执行后要执行的函数
        window.clearInterval(ele.timer);
        var effectObj = {
            //匀速
            Linear: function (t, b, c, d) {
                return c * t / d + b;
            },
            //ָ指数衰减的反弹缓动
            Bounce: {
                easeIn: function (t, b, c, d) {
                    return c - effectObj.Bounce.easeOut(d - t, 0, c, d) + b;
                },
                easeOut: function (t, b, c, d) {
                    if ((t /= d) < (1 / 2.75)) {
                        return c * (7.5625 * t * t) + b;
                    } else if (t < (2 / 2.75)) {
                        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                    } else if (t < (2.5 / 2.75)) {
                        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                    } else {
                        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                    }
                },
                easeInOut: function (t, b, c, d) {
                    if (t < d / 2) {
                        return effectObj.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                    }
                    return effectObj.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
                }
            },
            //二次方的缓动
            Quad: {
                easeIn: function (t, b, c, d) {
                    return c * (t /= d) * t + b;
                },
                easeOut: function (t, b, c, d) {
                    return -c * (t /= d) * (t - 2) + b;
                },
                easeInOut: function (t, b, c, d) {
                    if ((t /= d / 2) < 1) {
                        return c / 2 * t * t + b;
                    }
                    return -c / 2 * ((--t) * (t - 2) - 1) + b;
                }
            },
            //三次方的缓动
            Cubic: {
                easeIn: function (t, b, c, d) {
                    return c * (t /= d) * t * t + b;
                },
                easeOut: function (t, b, c, d) {
                    return c * ((t = t / d - 1) * t * t + 1) + b;
                },
                easeInOut: function (t, b, c, d) {
                    if ((t /= d / 2) < 1) {
                        return c / 2 * t * t * t + b;
                    }
                    return c / 2 * ((t -= 2) * t * t + 2) + b;
                }
            },
            //四次方的缓动
            Quart: {
                easeIn: function (t, b, c, d) {
                    return c * (t /= d) * t * t * t + b;
                },
                easeOut: function (t, b, c, d) {
                    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
                },
                easeInOut: function (t, b, c, d) {
                    if ((t /= d / 2) < 1) {
                        return c / 2 * t * t * t * t + b;
                    }
                    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
                }
            },
            //五次方的缓动
            Quint: {
                easeIn: function (t, b, c, d) {
                    return c * (t /= d) * t * t * t * t + b;
                },
                easeOut: function (t, b, c, d) {
                    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
                },
                easeInOut: function (t, b, c, d) {
                    if ((t /= d / 2) < 1) {
                        return c / 2 * t * t * t * t * t + b;
                    }
                    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
                }
            },
            //正弦曲线的缓动
            Sine: {
                easeIn: function (t, b, c, d) {
                    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
                },
                easeOut: function (t, b, c, d) {
                    return c * Math.sin(t / d * (Math.PI / 2)) + b;
                },
                easeInOut: function (t, b, c, d) {
                    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
                }
            },
            //ָ指数曲线的缓动
            Expo: {
                easeIn: function (t, b, c, d) {
                    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
                },
                easeOut: function (t, b, c, d) {
                    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
                },
                easeInOut: function (t, b, c, d) {
                    if (t == 0) return b;
                    if (t == d) return b + c;
                    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
                }
            },
            //圆形曲线的缓动
            Circ: {
                easeIn: function (t, b, c, d) {
                    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
                },
                easeOut: function (t, b, c, d) {
                    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
                },
                easeInOut: function (t, b, c, d) {
                    if ((t /= d / 2) < 1) {
                        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                    }
                    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
                }
            },
            //超过范围的三次方缓动
            Back: {
                easeIn: function (t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    return c * (t /= d) * t * ((s + 1) * t - s) + b;
                },
                easeOut: function (t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
                },
                easeInOut: function (t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    if ((t /= d / 2) < 1) {
                        return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                    }
                    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
                }
            },
            //ָ指数衰减的正弦曲线缓动
            Elastic: {
                easeIn: function (t, b, c, d, a, p) {
                    if (t == 0) return b;
                    if ((t /= d) == 1) return b + c;
                    if (!p) p = d * .3;
                    var s;
                    !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                },
                easeOut: function (t, b, c, d, a, p) {
                    if (t == 0) return b;
                    if ((t /= d) == 1) return b + c;
                    if (!p) p = d * .3;
                    var s;
                    !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                    return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
                },
                easeInOut: function (t, b, c, d, a, p) {
                    if (t == 0) return b;
                    if ((t /= d / 2) == 2) return b + c;
                    if (!p) p = d * (.3 * 1.5);
                    var s;
                    !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
                }
            }
        };
        var tempEffect = effectObj.Linear;
        if(typeof effect == "number"){
            switch (effect){
                case 0:
                    tempEffect = effectObj.Linear;
                    break;
                case 1:
                    tempEffect = effectObj.Bounce.easeIn;
                    break;
                case 2:
                    tempEffect = effectObj.Bounce.easeOut;
                    break;
                case 3:
                    tempEffect = effectObj.Bounce.easeInOut;
                    break;
                case 4:
                    tempEffect = effectObj.Quad.easeIn;
                    break;
                case 5:
                    tempEffect = effectObj.Quad.easeOut;
                    break;
                case 6:
                    tempEffect = effectObj.Quad.easeInOut;
                    break;
                case 7:
                    tempEffect = effectObj.Cubic.easeIn;
                    break;
                case 8:
                    tempEffect = effectObj.Cubic.easeOut;
                    break;
                case 9:
                    tempEffect = effectObj.Cubic.easeInOut;
                    break;
                case 10:
                    tempEffect = effectObj.Quart.easeIn;
                    break;
                case 11:
                    tempEffect = effectObj.Quart.easeOut;
                    break;
                case 12:
                    tempEffect = effectObj.Quart.easeInOut;
                    break;
                case 13:
                    tempEffect = effectObj.Quint.easeIn;
                    break;
                case 14:
                    tempEffect = effectObj.Quint.easeOut;
                    break;
                case 15:
                    tempEffect = effectObj.Quint.easeInOut;
                    break;
                case 16:
                    tempEffect = effectObj.Sine.easeIn;
                    break;
                case 17:
                    tempEffect = effectObj.Sine.easeOut;
                    break;
                case 18:
                    tempEffect = effectObj.Sine.easeInOut;
                    break;
                case 19:
                    tempEffect = effectObj.Expo.easeIn;
                    break;
                case 20:
                    tempEffect = effectObj.Expo.easeOut;
                    break;
                case 21:
                    tempEffect = effectObj.Expo.easeInOut;
                    break;
                case 22:
                    tempEffect = effectObj.Circ.easeIn;
                    break;
                case 23:
                    tempEffect = effectObj.Circ.easeOut;
                    break;
                case 24:
                    tempEffect = effectObj.Circ.easeInOut;
                    break;
                case 25:
                    tempEffect = effectObj.Back.easeIn;
                    break;
                case 26:
                    tempEffect = effectObj.Back.easeOut;
                    break;
                case 27:
                    tempEffect = effectObj.Back.easeInOut;
                    break;
                case 28:
                    tempEffect = effectObj.Elastic.easeIn;
                    break;
                case 29:
                    tempEffect = effectObj.Elastic.easeOut;
                    break;
                case 30:
                    tempEffect = effectObj.Elastic.easeInOut;
                    break;
            }
        }else if(effect instanceof Array){ //['Expo','easeIn']
            effect = effectObj[effect[0]][effect[1]];
        }else if(typeof effect == 'function'){ 
            callback = effect;
        }

        var time = 0;//运动时间
        var begin = {};//开始位置
        var change = {};//改变多少
        var interval = 10;//一次变化多少
        for(var key in target){//target必须要传一个对象数据
            begin[key] = getCss(ele,key);
            change[key] = target[key] - begin[key];
        }
        ele.timer = window.setInterval(function (){
            time += interval;
            if(time >= duration){ //到达终点
                window.clearInterval(ele.timer);
                for(var key in target){
                    setCss(ele,key,target[key]);
                }
                if(typeof callback == 'function'){
                    callback.call(ele); //到达终点后执行的回调函数
                }
                return;
            }
            for(var key in change){
                if(change[key]){ 
                    var curWeidu = tempEffect(time,begin[key],change[key],duration);
                    setCss(ele,key,curWeidu);
                }
            }
        },interval);

        function getCss(ele,attr){
            var val =  null;
            if("getComputedStyle" in window){
                val = window.getComputedStyle(ele,null)[attr];
            }else{
                if(attr == 'opacity'){
                    val = ele.currentStyle.filter;
                    var fitlerReg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
                    val = fitlerReg.test(val) ? fitlerReg.exec(val)[1]/100 : 1;
                }else{
                    val = ele.currentStyle[attr];
                }
            }
            var reg = /^-?\d+(\.\d+)?(pt|px|em|rem|deg)?$/;
            if(reg.test(val)){
                val = parseFloat(val);
            }
            return val;
        }
        function setCss(ele,attr,val){
            if(attr == 'opacity'){
                ele.style.opacity = val;
                ele.style.filter = 'alpha(opacity='+val*100+")";
                return;
            }
            if(attr == 'float'){
                ele.style.cssFloat = val;
                ele.style.styleFloat = val;
                return;
            }
            var reg = /width|height|left|top|right|bottom|(margin|padding)(Left|Right|Top|Bottom)?/;
            if(reg.test(attr)){
                if(!isNaN(val)){
                    val += "px";
                }
            }
            ele.style[attr] = val;
        }
    }
    return  animate; 
})();
