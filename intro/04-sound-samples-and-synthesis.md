# Class 04: Sound, from samples to synthesis

> The pattern engine decides **when** and **what**. The audio engine
> (superdough) decides **how it sounds**. This class is about the second part.

## 1. Every event is a bag of parameters

A hap's value is an object such as:

```js
{ s: "bd", bank: "tr909", gain: .8, room: .3 }
```

Each chained function adds or replaces one key. `s` (or `sound`) chooses the
**sound source**, and all other keys shape it.

## 2. Sources of sound

### Samples

Recorded audio files. A *sound name* refers to a folder of files, and `n`
picks one file from it:

```js
s("hh").n("0 1 2 3")        // or s("hh:0 hh:1 hh:2 hh:3")
s("bd").bank("tr909")       // banks group sounds from a drum machine
```

Where samples come from:

- **built in**: Strudel loads a default collection (drum machines, instruments)
- **from the web**: `samples('github:user/repo')` or a URL to a sample map (`strudel.json`)
- **local**: import a folder in the *sounds* tab, or serve one with
  `npx @strudel/sampler` (that's what `clips/` does)

Sample parameters:

| Parameter | Effect |
|---|---|
| `speed` | Playback rate: 2 = an octave up and twice as fast, -1 = backwards |
| `begin`, `end` | Play only part of the file (0 to 1) |
| `loopAt(n)` | Set the speed so the whole sample lasts *n* cycles |
| `chop(n)` | Cut every event into *n* pieces |
| `splice(n, pat)` / `slice(n, pat)` | Cut into *n* slices and play them in the order of `pat` (splice also fits the speed to each step) |
| `cut(group)` | A new sound in the same group stops the previous one |
| `clip` / `legato` | How long each sound lasts relative to its event |

### Synthesizers

Basic oscillators, made by Web Audio in real time:

```js
note("c3 e3 g3").s("sawtooth")   // also: sine, square, triangle
s("white"), s("pink"), s("brown") // noise
```

Shape the sound over time with an **envelope** (ADSR):

| Parameter | Meaning |
|---|---|
| `attack` | Time to reach full volume |
| `decay` | Time to fall to the sustain level |
| `sustain` | Level held while the note lasts (0 to 1) |
| `release` | Fade-out time after the note ends |

`.decay(.15).sustain(0)` is the "plucky" bass from `patterns/03`.

### Soundfonts

Sampled General MIDI instruments with names like `gm_epiano1`,
`gm_acoustic_bass` or `gm_violin`. They are pitched, so use them with `note()`.

## 3. Pitch: `note`, `n`, `freq`

| Parameter | Used for |
|---|---|
| `note("c4 e4")` or `note("60 64")` | Note names or MIDI numbers |
| `n("0 2 4").scale("C:minor")` | Scale steps, mapped to notes |
| `freq(440)` | Frequency in Hz |
| `speed(1.5)` | For samples: pitch by ratio (you used this in `clips/02`) |

## 4. The effect chain

Each event goes through a chain of effects, in a fixed order. Roughly:

```
source (sample / oscillator)
  → envelope and gain
  → filters: lpf (lowpass), hpf (highpass), bpf (bandpass), vowel
  → distortion: shape, distort, crush (bit depth), coarse (sample rate)
  → pan
  → postgain
  → sends to the orbit's shared effects: delay, room (reverb)
```

Exact details differ between versions, so treat this as a mental model and
check the docs when it matters.

### Orbits: shared effect buses

`delay` and `room` aren't applied per note. Each **orbit** has one delay and
one reverb that every pattern on that orbit sends into. By default, everything
uses orbit 1. Give a pattern its own reverb settings with `.orbit(2)`.

## 5. Loudness and headroom

Many layers add up. Keep `gain` values below 1 on busy patterns, use
`postgain` for overall level, and watch for distortion: in browser audio,
clipping sounds harsh. Your ears count too, so start every session quietly.

## Practice

1. Take the bass from `patterns/03` and try `s("square")`, then `s("triangle")`,
   then a `gm_` soundfont with `note()`.
2. In `clips/01`, compare `chop(32)`, `striate(32)` and `splice(8, ...)` on the
   same modem clip.
3. Put two patterns on different orbits, each with its own `room` value.
