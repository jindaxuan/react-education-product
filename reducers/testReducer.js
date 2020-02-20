// reducer本质上是一个函数，，此函数接受两个参数
// 参数1。state:  全局对象，将来可以被store和dispatch修改，同时会触发依赖此对象
// 参数2，action：当action的dispatch被调用的时候，会传入此action，来告诉store应该做什么？
export default function testRudecer(state={color:'red'},action){
  switch(action.type){
    case 'CHANGE_COLOR':
      return {
        color: action.color
      }
    default:
      return state
  }
}