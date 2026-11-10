// Chords and voicings
// chord() names the harmony, voicing() picks the notes for you
// Try: change the chord names, or swap "piano" for "sawtooth" with a lpf
setcpm(90/4)
$: chord("<Am7 Dm7 G7 C^7>")
  .voicing()
  .struct("[~ x]*2")
  .s("piano")
  .room(.5)
  ._pianoroll()
$: n("<0 3 4 0>").chord("<Am7 Dm7 G7 C^7>").mode("root:a1")
  .voicing().s("triangle").gain(.8)
$: s("bd ~ [~ bd] ~, ~ sd").bank("tr909").gain(.7)
