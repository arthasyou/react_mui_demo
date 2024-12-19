import { request } from './api'
import type { CommonResponse } from './commonResponse'

interface GameRecordPayload {
  user_id?: string
  username?: string
  wagers_id?: string
  serial_id?: string
  round_no?: string
  game_type?: string
  game_code?: string
  status?: string
  start_time?: string
  end_time?: string
  skip?: number
  limit?: number
}

interface GameRecordResponse extends CommonResponse {
  limit: number
  records: GameRecord[]
  skip: number
  total: number
}

export type GameRecord = {
  tid: number
  type: number
  order_id: string
  sync_time: number
  username: string
  wagers_id: string
  wagers_date: string
  serial_id: string
  round_no: string
  game_type: string
  wager_detail: string
  game_code: string
  result: string
  result_type: string
  card: string
  bet_amount: string
  payoff: string
  currency: string
  exchange_rate: string
  commissionable: string
  origin: string
  modified_date: string
  client: number
  bet_time: number
  draw_time: number
  update_time: number
  create_time: number
  status: number
}

/**
 * 获取游戏记录
 * @param payload - 游戏记录参数
 * @returns 游戏记录列表
 */
export const getGameRecord = async (payload: GameRecordPayload): Promise<GameRecordResponse> => {
  const response = await request<GameRecordPayload, GameRecordResponse>({
    method: 'GET',
    url: 'usr/searchGameRecord',
    body: payload,
  })
  return response.data // 解构 data，返回具体类型
}

// 预生成数据

interface PreCreateGameRecordPayload {
  username: string
  count: number
  profit: number
  game_type: string
}

interface PreCreateGameRecordResponse extends CommonResponse {
  records: GameRecord[]
}

/**
 * 预生成游戏记录
 * @param payload - 游戏记录参数
 * @returns 游戏记录列表
 */
export const preCreateGameRecord = async (
  payload: PreCreateGameRecordPayload,
): Promise<PreCreateGameRecordResponse> => {
  const response = await request<PreCreateGameRecordPayload, PreCreateGameRecordResponse>({
    method: 'POST',
    url: 'usr/preCreateGameRecord',
    body: payload,
  })
  return response.data // 解构 data，返回具体类型
}

interface CreateGameRecordPayload {
  records: GameRecord[]
}

/**
 * 生成游戏记录
 * @param payload - 游戏记录参数
 * @returns 游戏记录列表
 */
export const createGameRecord = async (
  payload: CreateGameRecordPayload,
): Promise<CommonResponse> => {
  const response = await request<CreateGameRecordPayload, CommonResponse>({
    method: 'POST',
    url: 'usr/createGameRecord',
    body: payload,
  })
  return response.data // 解构 data，返回具体类型
}
