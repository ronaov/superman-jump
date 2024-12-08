const game = document.getElementById("game")
const nv = document.getElementById("nv")
const vc = document.getElementById("vc")
const style = document.getElementById("style")
const bdau = document.getElementById("bd")
const diem = document.getElementById("diem")
const kyluc = document.getElementById("kyluc")
const sc = document.getElementById("sc")
const mhst = document.getElementById("mhst")
const kst = document.getElementById("kst")
const bnn = document.getElementById("bnn")
const bsfx = document.getElementById("bsfx")
const ps = document.getElementById("ps")
const click = document.getElementById("click")
const rq = document.getElementById("rq")

var ms = new Howl({
  src: ['bg-music.mp3'],
  preload: true,
  loop: true,
  autoplay: true
})

var jm = new Howl({
  src: ['jump.mp3'],
  preload: true
})

var go = new Howl({
  src: ['go.mp3'],
  preload: true
})

bnn.addEventListener('click', () => {
  if (bnn.textContent === "ON") {
    bnn.textContent = "OFF"
    ms.mute(true)
  } else {
    bnn.textContent = "ON"
    ms.mute(false)
  }
})

bsfx.addEventListener('click', () => {
  if (bsfx.textContent === "ON") {
    bsfx.textContent = "OFF"
    jm.mute(true)
    go.mute(true)
  } else {
    bsfx.textContent = "ON"
    jm.mute(false)
    go.mute(false)
  }
})

var play = false
var kd = true

var d = 0
var k = 0

sc.style.backgroundImage = "url(bg/" + Math.floor(Math.random()*4) + ".jpg)"

function bd() {
  ps.style.display = "none"
  play = true
  console.log(k)
  diem.textContent = "Điểm: " + d
  kyluc.textContent = "Kỷ lục: " + k
  td()
  vc.style.rotate = Math.floor(Math.random() *361) + "deg"
  if (kd) {
    bdau.style.display = "none"
    vc.style.display = "block"
    vc.style.animation = "bay 1.5s infinite linear"
  }
  else {
    sc.style.backgroundImage = "url('bg/" + Math.floor(Math.random()*4) + ".jpg')"
    bdau.style.display = "none"
    vc.style.left = maxw + "px"
    vc.style.animation = "bay 1.5s infinite linear"
    nv.style.top = maxh - 130 + "px" //230px
    ms.play()
  }
}

//chiều ngang ban đầu = chiều đứng lúc sau

const a1 = window.innerWidth
const a2 = screen.height

var maxh = 0
var maxw = 0

if (a1 < a2) {
  maxh = a1
  maxw = a2
} else {
  maxh = a2
  maxw = a1
}

nv.style.top = maxh - 130 + "px" //230px
vc.style.top = maxh - 120 + "px" //240px
vc.style.left = maxw + "px"
style.sheet.insertRule(`
  @keyframes bay {
    0% {left: ${maxw}}
    100% {left: -50px}
  }
`)
style.sheet.insertRule(`
  @keyframes jump {
    0% {top: ${maxh - 130}px}
    40% {top: ${maxh - 220}px}
    60% {top: ${maxh - 220}px}
    100% {top: ${maxh - 130}px}
  }
`)

game.addEventListener("click", () => {
  if (screen.orientation.lock) {
    document.documentElement.requestFullscreen()
    .then(() => {
      screen.orientation.lock('landscape')
    })
    .catch(() => {})
  }
})

document.addEventListener('touchstart', () => {
  if (!nv.classList.contains("jump") && play) {
    nv.classList.add("jump")
    jm.play()
    setTimeout(() => {
      nv.classList.remove("jump")
    }, 500)
  }
})

setInterval(() => {
  var top = window.getComputedStyle(nv)
  var left = window.getComputedStyle(vc)
  
  top = parseInt(top.getPropertyValue("top"))
  left = parseInt(left.getPropertyValue("left"))
  
  if (play && top + 50 > maxh - 120 && left < 90 && left + 50 > 70) {
    vc.style.animation = "none"
    vc.style.left = left + "px"
    nv.classList.remove('jump')
    nv.style.top = top + "px"
    play = false
    bdau.textContent = "THỬ LẠI"
    bdau.style.display = "block"
    ms.pause()
    go.play()
    vc.removeEventListener('animationiteration', td2)
    kd = false
    ps.style.display = "block"
    if (d > k) {
      k = d
    }
    d = 0
  }
}, 10)


function td() {
  vc.addEventListener('animationiteration', td2)
}

function td2() {
  d ++
  diem.textContent = "Điểm: " + d
  vc.style.rotate = Math.floor(Math.random() *361) + "deg"
  if (d === 20) {
    vc.style.animation = "bay 1.2s infinite linear"
  } else if (d === 40) {
    vc.style.animation = "bay 1s infinite linear"
  } else if (d === 60) {
    vc.style.animation = "bay 0.8s infinite linear"
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === "hidden") {
    ms.pause()
  } else if (play) {
    ms.play()
  }
})

function mst() {
  mhst.style.display = "flex"
  setTimeout(() => {
    mhst.style.opacity = "1"
    kst.style.transform = "scale(1)"
  }, 10)
}

function cls() {
  mhst.style.opacity = "0"
  kst.style.transform = "scale(0)"
  setTimeout(() => {
    mhst.style.display = "none"
  }, 300)
}

var clickkk = setInterval(() => {
  if (click.src.includes("click.png")) {
    click.src = "click1.png"
  } else {
    click.src = "click.png"
  }
}, 500)

setInterval(() => {
  if (window.innerHeight < window.innerWidth) {
    rq.style.display = "none"
  } else {
    rq.style.display = "flex"
  }
}, 100)

setInterval(() => {
  nv.style.backgroundImage = "url(nv1.png)"
  setTimeout(() => {
    nv.style.backgroundImage = "url(nv.png)"
  }, 300)
}, 2000)