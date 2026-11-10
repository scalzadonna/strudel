// Effects and space
// Delay, reverb, stereo and filters turn simple notes into a soundscape
// Try: raise delayfeedback slowly (stay below 1!), or change the vowels
setcpm(100/4)
$: n("0 2 4 <6 7>".off(1/8, x => x.add(7)))
  .scale("D4:dorian")
  .s("triangle")
  .delay(.5).delaytime(.375).delayfeedback(.5)
  .room(.6)
  .pan(sine.slow(4))
  ._pianoroll()
$: n("<0 -3>").scale("D2:dorian").s("sawtooth")
  .vowel("<a e i o>")
  .lpf(800)
  .gain(.6)
$: s("bd*2, ~ cp").bank("tr909")
  .jux(rev)
  .crush("<16 8 4 8>")
