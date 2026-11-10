// Handshake evolution
// Seven modem standards, from 300 bps (1960s) to 56K (1998), as textures
// Steps 2-4 start muted (_$:). Remove the _ to unmute.
samples('http://localhost:5432/')
setcpm(80/4)

// 1. A history lesson: each standard stretched to 4 cycles, oldest first
//    Listen to how the sound gets denser and noisier as speeds go up
$: s("modem").n("<0 1 2 3 4 5 6>").loopAt(4).gain(.6)

// 2. Random slicing: 16 slices of the 56K handshake, picked at random each step
//    irand(16) is a random whole number from 0 to 15, segment(16) makes 16 steps
//    Try: segment(8) or segment(32), or n(5) for V.34
_$: s("modem").n(6)
  .splice(16, irand(16).segment(16))
  .gain(.6)._punchcard()

// 3. Same chop, through a resonant filter that sweeps slowly up and down
//    Same sine.range() idea as patterns/03-bassline-scales.js
_$: s("modem").n("<3 4>").loopAt(2).chop(32)
  .lpf(sine.range(300, 5000).slow(8)).lpq(15)
  .gain(.7)

// 4. Stereo: jux plays the pattern reversed in the right ear only
//    Try: replace rev with x => x.speed(1.5)
_$: s("modem").n(2).loopAt(2).chop(16)
  .jux(rev)
  .room(.4).gain(.5)
