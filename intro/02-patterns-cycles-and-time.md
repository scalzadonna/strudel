# Class 02: Patterns, cycles and time

> The one idea to remember: **a pattern is not a list of notes. It is a
> function you can ask, "what happens between time A and time B?"**

## 1. Time is measured in cycles

In Strudel, time is counted in **cycles**, not seconds or bars. Cycle 0 runs
from time 0 to 1, cycle 1 from 1 to 2, and so on forever.

A mini-notation string fills **exactly one cycle**, however many steps it has:

```js
s("bd sd")            // 2 steps, each half a cycle
s("bd sd hh")         // 3 steps, each a third of a cycle
s("bd sd hh cp")      // 4 steps, each a quarter of a cycle
```

So adding steps doesn't make the loop longer. It **subdivides** the cycle more
finely. This is the most important difference from a step sequencer, where
each step has a fixed length.

## 2. Tempo: cps, cpm and bpm

Tempo is the number of cycles per second (**cps**) or per minute (**cpm**):

```js
setcps(0.5)     // 0.5 cycles per second = 1 cycle every 2 seconds
setcpm(30)      // the same tempo, in cycles per minute
```

Strudel has no built-in idea of "beats". If you decide that **one cycle is
one bar of 4 beats**, then:

```
cpm = bpm / 4          → setcpm(120/4) means 120 bpm in 4/4
```

That's why every lesson in this repo starts with `setcpm(BPM/4)`. If you
think of one cycle as 3 beats (a waltz), use `setcpm(bpm/3)`.

## 3. Events: haps

When Strudel asks a pattern what happens in a span of time, the answer is a
list of **haps** (short for "happenings"). A hap has:

| Field | Meaning | Example |
|---|---|---|
| `whole` | The full time span of the event | 0 → ½ |
| `part` | The fragment of it that falls inside the span you asked about | 0 → ¼ |
| `value` | What it is: an object of parameters | `{ s: "bd", gain: .8 }` |
| `context` | Extra data, such as where in your code it came from (used for highlighting) | |

`whole` and `part` differ when a query cuts through the middle of an event.
Only the fragment where `part` starts at the same moment as `whole` triggers a
sound (the "onset"). Otherwise long notes would retrigger every time the
scheduler looked at them.

## 4. A pattern is a function of time

Internally, a `Pattern` is an object with a **query function**:

```
query(timespan) → list of haps
```

Nothing is stored ahead of time. `s("bd sd")` doesn't contain the events for
cycle 1,000,000, yet it can produce them instantly when asked. That has big
consequences:

- **Patterns are infinite.** They exist for all time, including negative time.
- **Transformations are cheap.** `fast(2)` doesn't copy any notes. It wraps the
  query: "when asked about span [a, b], ask the original about [2a, 2b] and
  halve the times of the answers." `rev` and `late` work the same way:
  they rewrite the question and the answer.
- **Everything composes.** Since every transformation returns a new pattern,
  you can chain as many as you like: `s("bd sd").fast(2).rev().late(.25)`.

You can try this yourself in the Strudel REPL's console:

```js
s("bd sd").queryArc(0, 1)   // the haps of cycle 0
s("bd sd").fast(2).queryArc(0, 1)
```

## 5. Exact time: fractions, not floats

Strudel stores time as **fractions** (1/3, 7/12...), not floating-point
numbers. With floats, `1/3 + 1/3 + 1/3` might not equal exactly 1, and after
hours of playing, tiny errors would add up until events drifted. With
fractions, a triplet against a 4-step pattern lines up perfectly forever.

## 6. Discrete and continuous patterns

| Kind | What it is | Examples |
|---|---|---|
| **Discrete** | Events with a start and an end | `"bd sd"`, `note("c e g")` |
| **Continuous** (signals) | A value at every moment, with no onsets | `sine`, `cosine`, `saw`, `square`, `tri`, `rand`, `perlin` |

A signal on its own makes no sound, because it has no events. You use it to
**control** a discrete pattern: the discrete pattern decides *when*, and the
signal decides *how much*:

```js
s("hh*16").gain(sine.range(.1, .6))      // the volume follows a sine wave
note("c e g b").lpf(saw.range(300, 3000).slow(4))
```

Signals run from 0 to 1 by default. `.range(min, max)` rescales them, and
`.slow(n)` stretches one period over *n* cycles. To turn a signal into steps,
`segment(n)` samples it *n* times per cycle: `n(irand(8).segment(4))`.

## 7. How values combine

When you chain `s("bd sd").gain("1 .5 .8")`, two patterns with *different*
structures are combined. By default, **the structure comes from the left**
(the pattern you started with): `bd` and `sd` keep their timing, and each one
takes the gain value active at its onset (here `bd` gets `1` and `sd` gets
`.8`).

This "structure from the left" rule explains a lot of behaviour that seems
surprising at first. When you want the structure from somewhere else:

- `.struct("x ~ x x")` imposes a new rhythm
- `.mask("1 0 1 1")` removes events where the mask is 0
- `.beat("0,7,10", 16)` places events on chosen steps (you used it in `patterns/01`)

## 8. How the scheduler plays your code

1. You press **Ctrl+Enter**. The transpiler turns your code into JavaScript,
   which runs and builds `Pattern` objects (one per `$:` block, stacked
   together).
2. A **scheduler** wakes up many times per second (roughly every 50 ms). Each
   time, it asks the pattern for the haps in the next small slice of time
   (converting seconds into cycles using cps).
3. Each hap whose onset falls in that slice is sent to its **output** with a
   precise timestamp a little in the future (latency). That's usually the
   superdough audio engine, but it can also be MIDI or OSC.
4. The audio engine schedules the sound on the Web Audio clock, so timing
   stays sample-accurate even if the browser is momentarily busy.

When you re-evaluate, the scheduler simply starts querying the **new**
pattern from the current time. The clock never stops, which is what makes
live editing seamless.

## 9. Common confusions

| You expect | What actually happens | Why |
|---|---|---|
| `fast(2)` makes the sample play faster | The *events* happen twice as often. The sample sounds the same | `fast` changes time, not audio. Use `speed` to change audio |
| More steps make a longer loop | The same cycle, cut finer | A mini-notation string always fills one cycle |
| `rand` is different every time you press play | It's the same for the same moment in time | Randomness is computed from time, so patterns are repeatable |
| `sine` alone makes a sine tone | Silence | A signal has no events. Use `s("sine")` or `.s("sine")` for the oscillator |

## Practice

1. Play `s("bd sd")`, then `s("bd sd hh")`, then `s("bd sd hh cp")`. The loop
   length never changes.
2. Compare `s("bd sd").fast(2)` with `s("bd sd").speed(2)`.
3. In `patterns/03-bassline-scales.js`, find the signal controlling the filter,
   and change `.slow(8)` to `.slow(1)`.
4. In the REPL console, run `s("bd [sd sd]").queryArc(0, 1)` and read the
   whole/part fields of each hap.
