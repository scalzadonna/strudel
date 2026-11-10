// Chopping clips
// Builds on patterns/: same $: blocks and mini-notation, now with real audio
// Sounds: dial-up modem clips, see clips/README.md
// Steps 2-6 start muted (_$:). Remove the _ to unmute one step at a time.
samples('http://localhost:5432/')
setcpm(100/4)
const dbank = "tr909"

// 1. Play the V.34 handshake stretched to fit exactly 4 cycles
//    n() picks the file: 0 = Bell 103 (oldest) ... 6 = V.90 (56K)
//    Try: n(6), or loopAt(2) to squeeze it into 2 cycles
$: s("modem").n(5).loopAt(4)

// 2. Chop it into 32 pieces: same sound, now each piece is a step
//    Try: add .rev() to play the pieces backwards
_$: s("modem").n(5).loopAt(4).chop(32)._punchcard()

// 3. Splice: cut V.32bis into 8 slices and play them in a new order
//    Mini-notation from patterns/ works here: <> alternates, [] subdivides
_$: s("modem").n(4).splice(8, "0 1 <2 6> 3 [4 4] 5 <7 2> 6")._punchcard()

// 4. Play only part of a dialing burst, at different speeds
//    begin/end pick a fraction of the clip, negative speed plays it reversed
_$: s("dial").n("<0 3>")
  .begin("<0 .25 .5>").end("<.25 .5 .75>")
  .speed("<1 -1 .5 2>")
  .room(.4)

// 5. Relay clicks as a hi-hat, with the euclidean rhythms from patterns/02
_$: s("click(5,8,<0 2>)").n("<0 1 2>").gain(.7)._punchcard()

// 6. Your first-steps drums underneath, as in patterns/01-first-steps-rhythm.js
_$: s("bd(<4,5,7,8>,16)").struct("{1 0 0 1 0 1 0}%8").bank(dbank)
_$: s("sd").bank(dbank).beat("4,12", 16)
_$: s("hh!8").gain(.2)
