import fs from 'fs-extra'

async function run() {
  const manual = await fs.readFile('_redirects', 'utf-8')
  const redirects: [string, string, number][] = []

  // Add code to generate redirects here

  const final = `${manual}\n${redirects.map(i => i.join('\t')).join('\n')}`

  await fs.writeFile('_dist_redirects', final, { encoding: 'utf-8', flag: 'w' })
}

run()
