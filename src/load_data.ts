import fs from 'fs'
import { join } from 'path'

import neatCsv from 'neat-csv'

const csv_path = join(__dirname, '../data/sample.csv')

export default async () => {
  try {
    const file = await fs.promises.readFile(csv_path)
    return await neatCsv(file)
  } catch (err) {
    console.error(err)
  }
}
