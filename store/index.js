// 5个步骤
// 先导入redux的两个函数
import {createStore,combineReducers} from "redux";
// 准备相关的reducer
import testReducer from '../reducers/testReducer.js'

// 继承redux-persist实现store持久化到localStorage的步骤
//  1.导入相关的方法和storage对象
import {persistStore,persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
// 1.0.1配置storage对象的key
const config = {
  key:'dxredux',
  storage
}


// 2利用rudex的combineReducers来编译成跟reducer
const rootReducer = combineReducers({
  testReducer
});
// 3.0.1 配置persistReducer将rootReducer重新包装后返回新对象pReducer
const pReducer = persistReducer(config,rootReducer)

// 4.0调用createStore创建好一个store对象
const store = createStore(pReducer)

// 5.0定义一个函数将store对象返回，将来被_app.js中的withRedux去调用
export const initStore = () =>{
  return store
}

// 6.0 （export）利用persistStore方法传入store对象创建出新的persistot对象，将来在_app.js中被PersistGate组件使用
export const persistor = persistStore(store)

// 继承redux-persist实现store持久化到localStorage的步骤
//  1.导入相关的方法和storage对象
// 2.配置storage对象的key
// 3.配置persistReducer将rootReducer重新包装后返回新对象pReducer
// 4.createStore(pReducer)创建新的store对象
// 5。（export）利用persistStore方法传入store对象创建出新的persistot对象，将来在_app.js中被PersistGate组件使用
