const formatTime = (time) => {
  // time = time || 0
  if (time > 1000) {
    time = time / 1000
  }
  let h = parseInt(time / 3600)
  let m = parseInt(time % 3600 / 60)
  let s = parseInt(time % 60)

  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s

  return m + ':' + s
}

export default formatTime