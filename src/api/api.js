import axios from 'axios';
import { loginreq, req } from './axiosFun';

export const loginFirst = params => { return loginreq("post", `/api/healthbook/login/`, params) };//headers传入token

export const login = params => { return req("post", `/api/healthbook/login/`, params) };//headers传入token

loginreq
/*
*员工信息管理
*/
export const staffList = params => { return req("get", `/api/healthbook_portal/staff/?username=`+ params.username +"&page="+params.page+"&page_size="+params.page_size) };//headers传入token

export const staffAdd = params => { return req("post", `/api/healthbook_portal/staff/`, params) }; 

// export const staffEdit= params => { return loginreq("post", `/api/healthbook_portal/staff/create`, params) }; 

//export const staffDelete = params => { return req("post", `/api/healthbook_portal/staff/delete/`, params) }; 

export const staffStatus = params => { return req("post", `/api/healthbook_portal/staff/change/`, params) }; 

/*
*角色管理
*/
export const roleList = params => { return req("get", `/api/healthbook_portal/role/?group=`+params) }; 

/*
*组织机构管理
*/

//获取组织类型
export const orgType = params => { return req("get", `/api/healthbook_portal/company_type/`, params) };//headers传入token

export const orgList = params => { return req("get", `/api/healthbook_portal/organization/?name=`+ params.name +"&page="+params.page+"&page_size="+params.page_size) };//headers传入token

export const orgAdd = params => { return req("post", `/api/healthbook_portal/organization/`, params) }; 

export const orgEdit= params => { return req("put", `/api/healthbook_portal/organization/`+ params.id +"/", params) }; 

//export const orgDelete = params => { return req("post", `/api/healthbook_portal/organization/delete`, params) }; 

export const getOrgTypeById= params => { return req("get", `/api/healthbook_portal/organization/`+ params +"/") }; 

