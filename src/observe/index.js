class Observer {
    constructor(data) {
        // Object.defineProperty只能劫持已经存在的属性（vue里面会单独写一些api，$set, $delete）
        // 遍历对象
        this.walk(data)
    }
    walk(data) {
        // 对象上的所有属性依次进行劫持, 重新定义属性
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key])
        })
    }
}

export function defineReactive(target, key, value) { //闭包
    console.log(value,'value');
    observe(value) // value 可能是个对象，对所有对象都进行属性劫持
    Object.defineProperty(target,key, {    // 属性劫持
        get() {
            console.log('获取值');
            
            return value
        },
        set(newValue) {
            console.log('设置值');
            if (newValue === value) return
            value = newValue
        }
    })

}

export function observe(data) {
    if (typeof data !== 'object' || data === null) {
        return
    }
    // 如果一个数据被劫持过了，就不需要再被劫持了（要判断一个对象是否被劫持过，可以增添一个实例，用实例来判断是否被劫持过）
    if (data.__ob__) {
        return data.__ob__
    }
    return new Observer(data)
}