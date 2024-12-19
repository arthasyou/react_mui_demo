import { request } from './api'
import type { CommonResponse } from './commonResponse'

interface TransferPayload {
  user_id: number // 用户id
  action: string // IN=转入，OUT=转出
  value: number // 转账金额
}

/**
 * 转账
 * @param payload - 转账参数
 * @returns 转账响应
 */
export const transfer = async (payload: TransferPayload): Promise<CommonResponse> => {
  const response = await request<TransferPayload, CommonResponse>({
    method: 'POST',
    url: 'tx/transfer',
    body: payload,
  })
  return response.data
}
