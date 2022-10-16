import { mkdirSync } from 'fs'
import { getText2Hash } from './text2hash.mjs'

const myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

if (myArgs.length <= 0) { throw new Error('please add args.') }

// hash
const url = getText2Hash(myArgs[0])

// create dir
mkdirSync(url, (err) => {
  if (err) { throw err; }
})

console.log(`created dir: ${ url }`)
