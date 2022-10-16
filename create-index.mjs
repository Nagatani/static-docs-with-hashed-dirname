import { readdirSync, writeFileSync } from 'fs'
import { getText2Hash } from './text2hash.mjs'

const myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

if (myArgs.length <= 0) { throw new Error('please add args.') }

// hash
const url = getText2Hash(myArgs[0])

// get file list
const fileItemHtml = readdirSync(url).filter((file) => {
  const regex = /\.(jpe?g|png|svg|html|pdf|docx?|xlsx?)$/i
  return regex.test(file)
}).map((filename) => {
  console.log(filename)
  return filename !== 'index.html' ? `<li><a href="${ filename }">${ filename }</li>` : ''
}).reduce((v1, v2) => {
  return v1 + (v2 !== '' ? '\r\n' : '') + v2
})

const exportHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow, noarchive">
  <title>Document List</title>
</head>
<body>
<h1>${ myArgs[0] }</h1>
<ul>
${ fileItemHtml }
</ul>
</body>
</html>
`

writeFileSync(`${url}/index.html`, exportHtml)
console.log(`exported file: ${url}/index.html`)

