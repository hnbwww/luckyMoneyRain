function luckyMoney(option) {
    this.el = option.el;//容器对象
    this.luckyMoneyArr = [];
    this.speed = option.speed;
    this.density = option.density;
    this.total = option.total;
    this.maxMoney = option.maxMoney;
    this.callback = option.callback;
};

luckyMoney.prototype.create = function (id, amount) {
    var _this = this,
        el = _this.el,
        fragment = document.createDocumentFragment(),
        //当需要添加多个dom元素时，如果先将这些元素添加到DocumentFragment中，再统一将DocumentFragment添加到页面，会减少页面渲染dom的次数，效率会明显提升。
        flag = true,
        aLuckyMoney = document.createElement("span");

    //aluckyMoney添加自定义属性
    aLuckyMoney.setAttribute("data-id", id);
    aLuckyMoney.setAttribute("data-amount", amount);
    aLuckyMoney.className = "luckyMoney";
    aLuckyMoney.style.left = Math.random() * (el.clientWidth - 54) + "px";//红包在盒子里面的生成位置随机
    aLuckyMoney.style.top = -el.clientHeight / 10 + "px";

    fragment.appendChild(aLuckyMoney);
    el.appendChild(fragment);
    this.luckyMoneyArr.push(aLuckyMoney);//数组存储
    this.move(aLuckyMoney);//进行移动

    //事件函数
    var handler = function (e) {
        if (flag === true) {//防止重复点击
            e.target.className = "luckyMoney luckyMoneyOpen";//目标对象的类变化
            _this.callback(e);
            flag = false;
        } else {
            return false;
        }
    };
    document.addEventListener("touchstart", function (e) {//为什么不把事件绑在自身？事件绑定在aLuckyMoney会出现卡顿情况
        e.preventDefault();
        if (e.target.className === "luckyMoney") {
            handler(e);//使用该事件则去处理一些事件      //为什么不把处理方法直接写入以及先判断红包是否为空？
        } else if (e.target.getAttribute("data-amount") == 0) {
            e.target.className = "luckyMoneyNone";
        } else {//文档其他内容被点击时
            return false;
        }
    });
};

luckyMoney.prototype.start = function () {
    var that = this,
        i = 0;
    that.timer = setInterval(function () {
        if (i < that.total - 1) {
            var id = i,
                amount = Math.floor(Math.random() * 10) % 2 > 0 ? (Math.random() * that.maxMoney).toFixed(2) : 0;//随机金钱
            that.create(id, amount);
            i++;
        }
    }, that.density);
};

luckyMoney.prototype.move = function (obj) {
    var that = this,
        el = that.el;
    var diffY = Math.random() + 2,//y轴的方向
        diffX = Math.random() * 2;
    obj.timer = setInterval(function () {
        if (diffY > 2.5) {
            obj.style.left = parseInt(obj.style.left) + parseInt(diffX * obj.clientHeight / 30) + "px";
        } else {
            obj.style.left = parseInt(obj.style.left) - parseInt(diffX * obj.clientHeight / 30) + "px";
        }
        obj.style.top = parseInt(obj.style.top) + parseInt(diffY * obj.clientHeight / 30) + "px";

        //垂直方向超出区域
        if (el.clientHeight < parseInt(obj.style.top)) {
            clearInterval(obj.timer);
            el.removeChild(obj);
        }
        //碰撞
        if (parseInt(obj.style.left) <= 0 || parseInt(obj.style.left) + parseInt(obj.clientWidth) >= el.clientWidth) {
            diffX = -diffX;
        }

    }, that.speed);

};

luckyMoney.prototype.stop = function () {
    var that = this;
    clearInterval(that.timer);
    for (var i = 0; i < that.luckyMoneyArr.length; i++) {
        clearInterval(that.luckyMoneyArr[i].timer);
    }
};

luckyMoney.prototype.clear = function () {
    var container = this.el,
        luckyMoneyNodes = container.childNodes;
    for (var i = luckyMoneyNodes.length - 1; i >= 0; i--) {
        container.removeChild(luckyMoneyNodes[i]);
    }
};

