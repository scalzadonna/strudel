// Modem techno
// A full track: 909 drums with modem sounds as hats, bass, lead and pads
// Every block plays. Perform it live: add or remove _ in front of $: to mute or unmute
samples('http://localhost:5432/')
setcpm(128/4)
const dbank = "tr909"

// Drums: kick every beat, claps join after 8 cycles
$: s("bd*4").bank(dbank)
$: s("~ cp ~ cp").bank(dbank).mask("<0 1>/8").room(.2)

// Hats: relay clicks, accented on the off-beats
$: s("click*8").n("0 2 1 2 0 2 1 3")
  .gain("[.3 .6]*4").hpf(2000)._punchcard()

// Bass: key presses pitched down two octaves (speed .25) and distorted
$: s("dtmf").n("0 ~ 0 [~ 2] 0 ~ <3 4> ~")
  .speed(.25).lpf(700).shape(.4).gain(.8)

// Lead: dialing bursts chopped into 8 steps, every other 4 cycles
$: s("dial").n("<0 2 4>").chop(8)
  .sometimes(x => x.speed(2))
  .delay(.3).delaytime(.1875).delayfeedback(.4)
  .mask("<0 1>/4")
  .gain(.4)

// Texture: random slices of the fastest modems, through a slow filter sweep
$: s("modem").n("<5 6>/4")
  .splice(16, irand(16).segment(8))
  .lpf(sine.range(400, 3000).slow(16))
  .gain(.35)

// Swells: the 56K "bongs" every two cycles, with reverb
$: s("swell").n("<0 1>").slow(2).room(.6).gain(.5)
