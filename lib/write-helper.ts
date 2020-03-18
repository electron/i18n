import * as path from 'path'
import * as fs from 'fs'

export async function writeHelper<T = unknown>(
  file: string,
  data: Record<string, T>
) {
  return fs.writeFileSync(
    path.join(__dirname, `../dist/${file}.json`),
    JSON.stringify(data, null, 2)
  )
}
