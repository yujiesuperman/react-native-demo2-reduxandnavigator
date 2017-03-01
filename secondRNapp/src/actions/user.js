'use strict';

import { AlertIOS } from 'react-native';

import * as TYPES from './types';
// fake user data（假数据）
let testUser = {
	'name': 'yujie',
	'age': '25',
};
// for skip user （跳过的用户）
let skipUser = {
	'name': 'guest',
	'age': 33,
};

// login
// logIn是一个异步action，注意函数内部的写法与redux-thunk的定义要相同，这里采用dispatch分发。
export function logIn(opt){
	return (dispatch) => {
		dispatch({'type': TYPES.LOGGED_DOING});
		let inner_get = fetch('http://www.baidu.com')
			.then((res)=>{
				  if (opt.name === 'yujie' && opt.password === '123') {
					 dispatch({'type': TYPES.LOGGED_IN, user: testUser});
				   }else{
				   	 alert("用户名或密码错误！");
				   	 dispatch({'type':TYPES.LOGGED_DATAERROR })
				}
			}).catch((e)=>{
				alert(e.message);
				dispatch({'type': TYPES.LOGGED_ERROR, error: e});
			});
	}
}
// skip login
export function skipLogin(){
	return {
		'type': TYPES.LOGGED_IN,
		'user': skipUser,
	}
}
// logout 由于登出操作一般都只是清空一些数据，不需要异步执行直接返回就可以了
export function logOut(){
	return {
		'type': TYPES.LOGGED_OUT
	}
}