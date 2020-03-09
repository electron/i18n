import * as path from 'path'
import * as fs from 'fs'

export async function writeHelper<T = unknown>(file: string, name: string, data: Record<string, T>) {
  return fs.writeFileSync(
    path.join(__dirname, `../dist/${file}.json`),
    JSON.stringify(
      {
        [name]: data,
        date: new Date(),
      },
      null,
      2
    )
  )
}
