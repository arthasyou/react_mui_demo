import { request } from './api'
import type { CommonResponse } from './commonResponse'

interface SearchStatementPayload {
  game_type?: string
  start_time?: string
  end_time?: string
  skip?: number
  limit?: number
}

interface StatementResponse extends CommonResponse {
  limit: number
  statements: FS[]
  skip: number
  total: number
}

export interface FS {
  total: number
  s: Statement[]
}

interface Statement {
  tid: number
  user_id: number
  username: string
  game_type: string
  bet_quantity: number
  bet_amount: string
  payoff: string
  profit: string
  commissionable: string
  start_time: number
  end_time: number
  update_time: number
  create_time: number
  status: number
  type: number
  game_code: string
}

/**
 * 搜索游戏记录
 * @param payload - 游戏记录参数
 * @returns 游戏记录列表
 */
export const searchStatement = async (
  payload: SearchStatementPayload,
): Promise<StatementResponse> => {
  const response = await request<SearchStatementPayload, StatementResponse>({
    method: 'POST',
    url: 'usr/searchStatement',
    body: payload,
  })
  return response.data
}
