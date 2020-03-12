import axios from 'axios';

// 登录请求方法
const loginreq = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json',
        },
        data:JSON.stringify(params),
        traditional: true,
        transformRequest: [
            function(data) {
                let ret = ''
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                return ret
            }
        ]
    }).then(res => res.data);
};
function getCookie(key){
    var cookies=document.cookie;
    if(cookies.length>0){
        var start=cookies.indexOf(key+"=");
        if(start<0){
            return "";
        }
        var end =cookies.indexOf(";",start);
        if(end<0){
            end=cookies.length;
        }
        return cookies.substring(start+key.length+1,end);
    }
}

// 通用公用方法
const req = (method, url, params) => {
    let xctoken=getCookie("csrftoken");
    let authorization=sessionStorage.getItem("authorization");
    let auth=null;
    if(authorization!=null){
     auth="Bearer "+authorization;
    }
    return axios({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            //'Content-Type': 'application/json',
            'X-CSRFToken':xctoken,
            'Authorization':auth
        },
        data: params,
        traditional: true,
        transformRequest: [
            function(data) {
                let ret = ''
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                return ret
            }
        ]
    }).then(res => res.data);
};

export {
    loginreq,
    req
}