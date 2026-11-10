# Clips

Lessons for working with audio clips in Strudel. They build on `patterns/`.

The audio itself is **not** in the repo (see `.gitignore`). The lessons use
clips cut from a dial-up modem recording (300 bps to 56K). Put the source file
in `clips/source/` and the cut clips in `clips/samples/`, one folder per sound:

```
clips/samples/
├── modem/  one data handshake per standard, oldest first
│           0_bell103 1_v22 2_v22bis 3_v32 4_v32bis 5_v34 6_v90
├── dial/   six full dialing bursts (DTMF key sequences), ~1 s each
├── dtmf/   single key presses: 0 4 5 6 7 8 9
├── click/  four relay clicks and blips (short, percussive)
├── tone/   steady line tones, pitched:
│           0_dial (1140 Hz) 1_ring (1400 Hz) 2_answer (2225 Hz)
│           3_ans (2100 Hz) 4_carrier (5085 Hz) 5_hum (440 Hz = A4)
└── swell/  two decaying "bong" swells from the 56K handshake
```

Each folder name becomes a sound name (`s("modem")`, `s("dtmf")`, ...). Files
inside a folder are picked with `n(0)`, `n(1)`, ... in alphabetical order, or
with `s("modem:5")`. For `dtmf`, that means:

| n() | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|-----|---|---|---|---|---|---|---|
| key | 0 | 4 | 5 | 6 | 7 | 8 | 9 |

## Lessons

| File | What it explores |
|---|---|
| `01-chopping-clips.js` | loopAt, chop, splice, begin/end, speed: the basic sample tools |
| `02-dialing-melodies.js` | DTMF keys and line tones as pitched instruments, chords via speed ratios |
| `03-handshake-evolution.js` | The 7 modem standards as textures: random slicing, filter sweeps, stereo |
| `04-modem-techno.js` | A full track: 909 drums with modem sounds as hats, bass, lead and pads |

## How the clips were cut

All clips come from the source file with `sox`: trimmed, high-passed at 120 Hz
(to remove rumble), short fades in and out, and normalized to -1 dB. Example:

```sh
sox source.wav clips/samples/dtmf/5.wav highpass 120 trim 20.88 =21.01 fade t 0.004 0 0.01 norm -1
```

## Loading them into strudel.cc

**Option A, local server (recommended):**

```sh
cd clips/samples
npx @strudel/sampler
```

It serves the folder on `http://localhost:5432` and the lessons load it with
`samples('http://localhost:5432/')`.

**Option B, browser import:** in strudel.cc open the **sounds** tab, choose
**import sounds folder** and pick `clips/samples`. Then delete the `samples(...)`
line at the top of the lesson.
