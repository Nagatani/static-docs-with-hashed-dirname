
import jsSHA from './sha3.mjs'

export default function getText2Hash(text) {
  const sha = new jsSHA('SHA3-256', 'TEXT')
  sha.update(text)
  return sha.getHash('HEX')
}
