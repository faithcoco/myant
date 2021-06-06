export function timeFix() {
    const time = new Date()
    const hour = time.getHours()
    return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome() {
    const arr = ['休息一会儿吧', '准备吃什么呢?']
    const index = Math.floor(Math.random() * arr.length)
    return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
    const event = document.createEvent('HTMLEvents')
    event.initEvent('resize', true, true)
    event.eventType = 'message'
    window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
    let timer = 0

    let beforeScrollTop = window.pageYOffset
    callback = callback || function () {
    }
    window.addEventListener(
        'scroll',
        event => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                let direction = 'up'
                const afterScrollTop = window.pageYOffset
                const delta = afterScrollTop - beforeScrollTop
                if (delta === 0) {
                    return false
                }
                direction = delta > 0 ? 'down' : 'up'
                callback(direction)
                beforeScrollTop = afterScrollTop
            }, 50)
        },
        false
    )
}

export function isIE() {
    const bw = window.navigator.userAgent
    const compare = (s) => bw.indexOf(s) >= 0
    const ie11 = (() => 'ActiveXObject' in window)()
    return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
    if (id === '') {
        return
    }
    setTimeout(() => {
        document.body.removeChild(document.getElementById(id))
    }, timeout)
}

/**
 * 将字符串格式yyyy-MM-dd HH:mm:ss 转换为js日期对象,适用各种浏览器
 * @param timeStr
 * @returns {Date}
 */
export function getDateByTimeStr(timeStr) {
    var timeArr = timeStr.split(" ");
    var d = timeArr[0].split("-");
    var t = timeArr[1].split(":");
    return new Date(d[0], (d[1] - 1), d[2], t[0], t[1], t[2]);
}

/**
 * 将js日期对象转换为字符串格式 yyyy-MM-dd HH:mm:ss,适用各种浏览器
 * @param date
 * @returns {string}
 */
export function getTimeStrByDate(date) {
    var y = date.getFullYear();
    var M = date.getMonth() + 1;
    var d = date.getDate();
    var H = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return y + '-' + (M < 10 ? ('0' + M) : M) + '-' + (d < 10 ? ('0' + d) : d) + " " + (H < 10 ? ('0' + H) : H) + ":" + (m < 10 ? ('0' + m) : m) + ":" + (s < 10 ? ('0' + s) : s);
}

/*
 * 字段判空
 */
export function stringNotBlank(a) {
    if (Object.is(a, null)) {
        return false;
    } else if (Object.is(a, undefined)) {
        return false;
    } else if (Object.is(a, '')) {
        return false;
    }
    return true;
}


