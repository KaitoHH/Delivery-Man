function bMapTransQQMap(lng, lat) {
  const x = lng
  const y = lat
  const pi = 3.1415926535897932384626
  const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * pi)
  const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * pi)
  const bd_lon = z * Math.cos(theta) + 0.0065
  const bd_lat = z * Math.sin(theta) + 0.006
  return {
    lng: bd_lon,
    lat: bd_lat
  }
}

module.exports = {
  bMapTransQQMap
}
