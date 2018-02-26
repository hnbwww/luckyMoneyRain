var _$ = function (str) {
    return document.querySelector(str);
};
var el = _$("#container"),
    luckyMoneyCount = 0, //红包金额
    t = 20, //倒计时
    luckyMoneyAmount = 0;//红包金额总量
var luckyMoney = new luckyMoney({
    el: el,
    speed: 10,
    density: 200,
    total: 200,
    maxMoney: 10,
    callback: function (e) {
        luckyMoneyAmount += Number(e.target.getAttribute('data-amount'));//将红包金额
        luckyMoneyCount++;
        // 抢到红包的个数
        _$('.luckyMoneyCount').innerText = luckyMoneyCount;
        _$('.totalMoney').innerText = luckyMoneyAmount.toFixed(2);
    }
});

setTimeout(function () {
    luckyMoney.start();
    timer();
    _$(".progressCon").style.display = "none";
}, 3000);

function timer() {
    _$('.timer').innerText = t;
    t--;
    if (t >= 0) {
        setTimeout(arguments.callee, 1000);
    } else if (t < 0) {
        luckyMoney.stop();
        luckyMoney.clear();
        showPop();
    }
}

//弹窗情况
function showPop() {
    _$('#mask').style.display = 'block';
    _$('.pop').style.display = 'block';
    _$('.totalCoin').innerText = luckyMoneyAmount.toFixed(2);
    _$('.totalluckyMoney').innerText = luckyMoneyCount;
}

_$('.closeBtn').addEventListener('click', function () {
    closePop();
});

function closePop() {
    _$('#mask').style.display = 'none';
    _$('.pop').style.display = 'none';
}

