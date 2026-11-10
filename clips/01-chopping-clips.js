// Chopping clips
// Builds on patterns/: same $: blocks and mini-notation, now with your own audio
// Setup: see clips/README.md (folders loop/, vox/, hit/ in clips/samples)
// Steps 2-6 start muted (_$:). Remove the _ to unmute one step at a time.
samples('http://localhost:5432/')
setcpm(100/4)
const dbank = "tr909"

// 1. Play the loop as-is, stretched to fit exactly 2 cycles
//    Try: loopAt(1) or loopAt(4) to hear it squeezed or slowed
$: s("loop").loopAt(2)

// 2. Chop it into 16 pieces: same sound, now each piece is a step
//    Try: add .rev() to play the pieces backwards in order
_$: s("loop").loopAt(2).chop(16)._punchcard()

// 3. Splice: cut into 8 slices and play them in a new order
//    Mini-notation from patterns/ works here: <> alternates, [] subdivides
_$: s("loop").splice(8, "0 1 <2 6> 3 [4 4] 5 <7 2> 6")._punchcard()

// 4. Play only part of the vocal, at different speeds
//    begin/end pick a fraction of the clip, negative speed plays it reversed
_$: s("vox").begin("<0 .25 .5>").end("<.25 .5 .75>")
  .speed("<1 -1 .5 2>")
  .room(.4)

// 5. One-shots as a drum kit: n() picks the file in hit/
//    Same euclidean idea as patterns/02-euclidean-grooves.js
_$: s("hit(5,8,<0 2>)").n("<0 1 2>").gain(.7)._punchcard()

// 6. Your first-steps drums underneath, as in patterns/01-first-steps-rhythm.js
_$: s("bd(<4,5,7,8>,16)").struct("{1 0 0 1 0 1 0}%8").bank(dbank)
_$: s("sd").bank(dbank).beat("4,12", 16)
_$: s("hh!8").gain(.2)
