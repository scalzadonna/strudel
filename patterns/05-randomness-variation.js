// Randomness and variation
// Small random changes keep a loop from sounding static
// Try: change the probabilities or the degradeBy amount
setcpm(110/4)
$: s("hh*16").bank("tr909")
  .gain(perlin.range(.1, .4))
  .degradeBy(.3)
$: s("bd [~ bd?] ~ bd").bank("tr909")
  .sometimes(x => x.speed(1.5))
$: s("~ sd").bank("tr909")
  .rarely(x => x.ply(2))
$: n(irand(8).segment(8))
  .scale("A3:minor")
  .s("square")
  .lpf(1200)
  .decay(.1).sustain(0)
  .gain(.4)
  .lastOf(4, rev)
  ._pianoroll()
