import axios from 'axios';
import { loginreq, req } from './axiosFun';

let url="";

//登录验证码
export const getCodeImg = params => { return axios.post(`/front/api/captcha.json`, params).then(res => res.data); };

// 登录接口
export const login = (params) => { return req("post", `/front/login/`, params) }; //headers传入token
