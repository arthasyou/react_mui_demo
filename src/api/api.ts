import http from './http'

// 定义请求参数的类型
interface RequestParams<T = Record<string, unknown>> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  body?: T // 请求体，默认为类似 JSON 的数据
}

interface ApiResponse<R> {
  data: R
  error?: string
}

/**
 * 通用请求函数
 * @param method - HTTP 方法
 * @param url - 请求的 URL
 * @param body - 请求体（可选）
 * @returns Promise<ApiResponse<R>> - 返回一个包含 data 和错误信息的泛型 Promise
 */
export const request = async <T = Record<string, unknown>, R = unknown>({
  method,
  url,
  body,
}: RequestParams<T>): Promise<ApiResponse<R>> => {
  try {
    let finalUrl = url

    // 处理 GET 和 DELETE 的 URL 参数
    if (
      ['GET', 'DELETE'].includes(method) &&
      body &&
      typeof body === 'object' &&
      !Array.isArray(body)
    ) {
      const queryParams = new URLSearchParams(body as Record<string, string>).toString()
      finalUrl = `${url}?${queryParams}`
    }

    // 发送请求
    const response = await http.request<R>({
      method,
      url: finalUrl,
      data: ['POST', 'PUT', 'PATCH'].includes(method) ? body : undefined,
    })

    return { data: response.data }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error(String(error))
  }
}
