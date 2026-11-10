// Basslines with scales
// n() picks scale degrees, scale() maps them to notes
// Try: change "C:minor" to "C:dorian" or "C:phrygian"
setcpm(124/4)
$: n("0 0 [~ 0] 3 <5 7> ~ [2 3] <0 -2>")
  .scale("C2:minor")
  .s("sawtooth")
  .lpf(sine.range(300, 2000).slow(8))
  .lpq(10)
  .decay(.15).sustain(0)
  ._pianoroll()
$: s("bd*4").bank("tr909")
$: s("~ hh").bank("tr909").gain(.3).fast(4)
