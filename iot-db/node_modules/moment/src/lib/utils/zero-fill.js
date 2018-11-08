export default function zeroFill (number, targetLength, forceSign) {
  var absNumber = '' + Math.abs(number)

  var zerosToFill = targetLength - absNumber.length

  var sign = number >= 0
  return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber
}
