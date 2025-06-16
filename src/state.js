import { observe } from './observe/index'
export function initState(vm) {
    const opts = vm.$options
    if (opts.data) {
        initData(vm)
    }
}

function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[target][key]
        },
        set(newValue) {
            vm[target][key] = newValue
        }
    })
}
function initData(vm) {
    let data = vm.$options.data // data 可能是函数，也可能是对象
    data = typeof data === 'function' ? data.call(vm): data
    console.log(data);
    
    vm._data = data // 这样的好处是我既把这个数据挂载到实例上，又能对这个对象进行观测
    observe(data)

    // 将vm._data 用vm代理
    for (let key in data) {
        proxy(vm, '_data', key)
    }
    
}