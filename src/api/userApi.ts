import { request } from './api'
import type { CommonResponse } from './commonResponse'
interface AddUserPayload {
  name: string
  account: string
  type: number
  role: number
  password: string
  balance: number
  operate_pass: string
}

/**
 * 添加用户
 * @param payload - 添加用户参数
 * @returns 添加用户响应
 */
export const addUser = async (payload: AddUserPayload): Promise<CommonResponse> => {
  const response = await request<AddUserPayload, CommonResponse>({
    method: 'POST',
    url: 'usr/addUser',
    body: payload,
  })
  return response.data
}

interface SearchUserPayload {
  type: number
  role: number
  status: string
  balance_status: string
  key?: string
  offset?: number
  limit?: number
}

export interface SearchUserResponse extends CommonResponse {
  users: User[]
  balances: undefined[]
}

export interface User {
  tid: number
  type: number
  role: number
  name: string
  account: string
  phone: string
  email: string
  password: string
  trade_pass: string
  image: string
  creator: number
  parent_id: number
  balance_status: number
  sub_count: number
  group_id: number
  last_login_time: string
  update_time: string
  create_time: string
  status: number
}

// interface Balance {
//   user_id: number
//   area: number
//   asset: string
//   free: string
//   locked: string
//   margin: string
//   update_time: number
//   create_time: number
// }

/**
 * 搜索用户
 * @param payload - 搜索用户参数
 * @returns 搜索用户响应
 */
export const searchUser = async (payload: SearchUserPayload): Promise<SearchUserResponse> => {
  const response = await request<SearchUserPayload, SearchUserResponse>({
    method: 'GET',
    url: 'usr/searchUser',
    body: payload,
  })
  return response.data
}

interface LogoutUserPayload {
  user_id: number
}

/**
 * 注销用户
 * @param payload - 注销用户参数
 * @returns 注销用户响应
 */
export const logoutUser = async (payload: LogoutUserPayload): Promise<CommonResponse> => {
  const response = await request<LogoutUserPayload, CommonResponse>({
    method: 'POST',
    url: 'usr/logoutUser',
    body: payload,
  })
  return response.data
}

/**
 * 自己注销
 * @returns 注销响应
 */
export const logout = async () => {
  const response = await request<CommonResponse>({
    method: 'POST',
    url: 'usr/logout',
  })
  return response.data
}

interface UpdateUserPayload {
  tid: number // 用户ID 不传默认修改自身
  name: string // 名称
  password: string // 密码
  old_password: string // 旧密码
  status: number // 100 正常 200 冻结
  balance_status: number // 100 正常 200 冻结
  operate_pass: string // 操作密码
}

// 修改自己密码例子
// const payload = {
//   password: 'newPassword',
//   old_password: 'oldPassword'
// }

// 修改他人密码例子
// const payload = {
//   tid: 123,
//   password: 'newPassword',
//   operate_pass: 'operatePassword'
// }

/**
 * 更新用户
 * @param payload - 更新用户参数
 * @returns 更新用户响应
 */
export const updateUser = async (payload: UpdateUserPayload): Promise<CommonResponse> => {
  const response = await request<UpdateUserPayload, CommonResponse>({
    method: 'POST',
    url: 'usr/updateUser',
    body: payload,
  })
  return response.data
}

interface UserInfoResponse extends CommonResponse {
  user: User
  session_id: string
  current_time: number
}

/**
 * 获取用户信息
 * @returns 用户信息响应
 */

export const userInfo = async () => {
  const response = await request<UserInfoResponse>({
    method: 'GET',
    url: 'usr/userInfo',
  })
  return response.data
}
