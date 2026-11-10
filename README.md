# strudel

Learning live coding music with [Strudel](https://strudel.cc): theory classes,
pattern exercises and sample-based lessons.

## Repository layout

| Folder | What's inside |
|---|---|
| [`intro/`](intro/) | Theory classes: history and roots, patterns and time, mini-notation, sound, transformations, live coding practice |
| [`patterns/`](patterns/) | Hands-on exercises with built-in sounds: rhythm, Euclidean grooves, basslines, chords, randomness, effects |
| [`clips/`](clips/) | Lessons using your own audio clips (dial-up modem sounds): chopping, melodies, textures, a full track |

## Suggested path

1. **Read** [`intro/01-roots-history-and-present.md`](intro/01-roots-history-and-present.md) for the big picture.
2. **Read** classes [02](intro/02-patterns-cycles-and-time.md) and [03](intro/03-mini-notation.md): how patterns, cycles and mini-notation work.
3. **Play** `patterns/01` to `06`, keeping classes [04](intro/04-sound-samples-and-synthesis.md) and [05](intro/05-transforming-patterns.md) open as references.
4. **Play** `clips/01` to `04` with your own samples (setup in [`clips/README.md`](clips/README.md)).
5. **Perform**: see [class 06](intro/06-live-coding-practice.md).

### Intro

| # | Class |
|---|---|
| 01 | [Roots, history and present](intro/01-roots-history-and-present.md) |
| 02 | [Patterns, cycles and time](intro/02-patterns-cycles-and-time.md) |
| 03 | [Mini-notation](intro/03-mini-notation.md) |
| 04 | [Sound: samples and synthesis](intro/04-sound-samples-and-synthesis.md) |
| 05 | [Transforming patterns](intro/05-transforming-patterns.md) |
| 06 | [Live coding practice](intro/06-live-coding-practice.md) |

### Patterns

| File | Explores |
|---|---|
| [`01-first-steps-rhythm.js`](patterns/01-first-steps-rhythm.js) | Hi-hats, kick and snare with `struct`, `beat` and polymeter |
| [`02-euclidean-grooves.js`](patterns/02-euclidean-grooves.js) | Euclidean rhythms with rotation on a TR-808 |
| [`03-bassline-scales.js`](patterns/03-bassline-scales.js) | Scale-degree basslines with a filter sweep |
| [`04-chords-voicings.js`](patterns/04-chords-voicings.js) | Chord progressions and automatic voicings |
| [`05-randomness-variation.js`](patterns/05-randomness-variation.js) | Probability, random notes and periodic variation |
| [`06-effects-space.js`](patterns/06-effects-space.js) | Delay, reverb, panning, vowel filter, bit-crushing |

### Clips

| File | Explores |
|---|---|
| [`01-chopping-clips.js`](clips/01-chopping-clips.js) | `loopAt`, `chop`, `splice`, `begin`/`end`, `speed` |
| [`02-dialing-melodies.js`](clips/02-dialing-melodies.js) | Phone keypad tones and line tones as pitched instruments |
| [`03-handshake-evolution.js`](clips/03-handshake-evolution.js) | Seven modem standards as textures |
| [`04-modem-techno.js`](clips/04-modem-techno.js) | A full track built from modem sounds and 909 drums |

The audio for `clips/` is not in the repo. See [`clips/README.md`](clips/README.md)
for how to prepare and load it.

## How to run

1. Open <https://strudel.cc>.
2. Paste the contents of a `.js` file into the editor.
3. Press **Ctrl+Enter** (Cmd+Enter on a Mac) to play, and **Ctrl+.** to stop.
