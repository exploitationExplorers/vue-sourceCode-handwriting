import { newArrayProto } from './array'
class Observer {
    constructor(data) {
        // Object.defineProperty只能劫持已经存在的属性（vue里面会单独写一些api，$set, $delete）
         
        Object.defineProperty(data,'__ob__', {  // 目的是防止如果data是对象的时候造成死循环
            value: this,
            enumerable: false,  // 不可枚举
            configurable: false  // 不可配置
        })

        // data.__ob__ = this   // 给数组添加一个__ob__属性，如果数据上有一个__ob__属性，说明这个数据已经被观测过了
        if(Array.isArray(data)) {
            
            // 需要保留数组原有的特性，并且可以重写部分的方法
            data.__proto__ = newArrayProto
            this.observeArray(data) // 如果数组中放的是对象，也可以监控到对象的变化
        }
        else {
            this.walk(data)
        }
        
    }
    walk(data) {
        // 对象上的所有属性依次进行劫持, 重新定义属性
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key])
        })
    }

    observeArray(data) {
        data.forEach(item => observe(item))
    }
}

export function defineReactive(target, key, value) { //闭包
    observe(value) // value 可能是个对象，对所有对象都进行属性劫持
    Object.defineProperty(target,key, {    // 属性劫持
        get() {
            console.log(key,'key');
            
            return value
        },
        set(newValue) {
            console.log('设置值');
            if (newValue === value) return
            // 如果设置的值是个对象，那么需要劫持这个对象
            observe(newValue)
            value = newValue
        }
    })

}

export function observe(data) {
    if (typeof data !== 'object' || data === null) {
        return
    }
    if (data.__ob__ instanceof Observer) {
        return data.__ob__
    }
    return new Observer(data)
}