export function rowsWithSn<T>(list: T[]): (T & { sn: number })[] {
  return list.map((item, index) => ({
    ...item,
    sn: index + 1, // 自动生成序号
  }));
}
