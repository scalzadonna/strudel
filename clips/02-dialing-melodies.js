// Dialing melodies
// DTMF keys and line tones have a pitch, so you can play them like an instrument
// dtmf n(): 0 = key 0, 1 = key 4, 2 = key 5, 3 = key 6, 4 = key 7, 5 = key 8, 6 = key 9
// Steps 2-5 start muted (_$:). Remove the _ to unmute.
samples('http://localhost:5432/')
setcpm(96/4)

// 1. Dial a phone number as a rhythm. ~ is a pause between digit groups
//    Try: write your own number (only keys 0 4 5 6 7 8 9 were in the recording)
$: s("dtmf").n("2 4 3 [~ 2] 4 1 ~ 0").gain(.6)._punchcard()

// 2. The hum is 440 Hz, exactly the note A. speed() changes pitch by ratio:
//    1 = A, 1.189 = C, 1.498 = E, 2 = A one octave up
//    Commas play notes together, so each [ ] is a chord: Am, F, C, G
_$: s("tone:5")
  .speed("<[1,1.189,1.498] [.794,1,1.189] [1.189,1.498,1.782] [.891,1.122,1.335]>")
  .room(.6).lpf(3000).gain(.5)

// 3. Two modems answering at once: 2225 Hz and 2100 Hz are close but not equal,
//    so together they "beat" (wobble). Panned left and right for width
_$: stack(
  s("tone:2").pan(0),
  s("tone:3").pan(1)
).speed("<1 .75 .5 .75>").gain(.4).room(.5)

// 4. The ring tone pitched down two octaves (speed .25) becomes a soft pad
_$: s("tone:1").speed(.25).slow(2).room(.8).gain(.6)

// 5. A melody of key presses with an echo an octave up (speed 2)
//    off() is the same trick as in patterns/06-effects-space.js
_$: s("dtmf").n("0 2 4 [6 4] 2 <1 3> ~ 5")
  .off(1/8, x => x.speed(2).gain(.3))
  .delay(.4).delaytime(.375).delayfeedback(.4)
  .gain(.5)
