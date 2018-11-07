import absFloor from './abs-floor'

export default function toInt (argumentForCoercion) {
  var coercedNumber = +argumentForCoercion

  var value = 0

  if (coercedNumber !== 0 && isFinite(coercedNumber)) {
    value = absFloor(coercedNumber)
  }

  return value
}
