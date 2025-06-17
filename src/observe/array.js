/**重写数组中的部分方法 */

const oldArrayProto = Array.prototype

export let newArrayProto = Object.create(oldArrayProto)


let methods = ['push','shift','unshift','pop','reverse','sort','splice']

methods.forEach(method => {
    // arr.push(1,2,3)
    newArrayProto[method] = function(...args) {  // 重写数组方法
      const result = oldArrayProto[method].call(this,...args)   // 内部调用原来的方法 切片编程
      console.log(method,'method');
      console.log(this,'this');
      
      // 我们需要对新增加的数据再次进行劫持，例如调用unshift方法，新增了一个对象，那么这个对象也需要被劫持
      let inserted
      let ob = this.__ob__
      switch(method) {
        case 'push':
        case 'unshift':
            inserted = args
            break
        case 'splice':
            inserted = args.slice(2)
            break
        default:
            break
      }
      if(inserted) {  // 对新增的内容再次进行观测
        ob.observeArray(inserted)
      }
      return result
    }
})