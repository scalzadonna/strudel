# Class 05: Transforming patterns

> In Strudel you rarely write out music note by note. You write a small seed
> and **transform** it. Composing transformations is composing music.

## 1. Chaining

Every function returns a new pattern, so transformations read left to right:

```js
note("c e g b")       // seed
  .fast(2)            // twice per cycle
  .rev()              // backwards
  .add(note(12))      // an octave up
  .s("triangle")
```

The original pattern is never changed, so you can reuse it:

```js
const riff = note("c e g b")
$: riff.s("sawtooth")
$: riff.slow(2).add(note(-12)).s("sine")
```

## 2. Time transformations

| Function | Effect |
|---|---|
| `fast(n)` / `slow(n)` | Speed up or slow down |
| `early(t)` / `late(t)` | Shift in time by a fraction of a cycle |
| `rev()` | Reverse each cycle |
| `ply(n)` | Repeat each event *n* times |
| `palindrome()` | Forwards one cycle, backwards the next |
| `iter(n)` | Start each cycle 1/*n* later in the pattern |
| `linger(f)` | Repeat only the first fraction *f* of each cycle |

## 3. Combining patterns

| Function | Effect |
|---|---|
| `stack(a, b)` | Play at the same time (like `,`) |
| `cat(a, b)` | One per cycle (like `< >`) |
| `seq(a, b)` | Squeezed into one cycle (like a sequence) |
| `$:` blocks | Separate patterns, all playing (internally a stack) |

## 4. Functions that take functions

The most expressive part of Strudel: transformations that apply *another*
transformation in a particular way.

```js
.lastOf(4, rev)                     // every 4th cycle, reversed
.firstOf(3, x => x.fast(2))         // every 3rd cycle starting with the first, doubled
.sometimes(x => x.speed(2))         // about half of the events
.rarely(x => x.ply(2))              // about a quarter of them
.off(1/8, x => x.add(note(7)))      // a delayed, transformed copy on top
.superimpose(x => x.fast(2))        // a transformed copy on top, no delay
.jux(rev)                           // original in the left ear, transformed in the right
.chunk(4, x => x.hurry(2))          // transform one quarter of the cycle, a different quarter each cycle
```

`x => ...` is a JavaScript arrow function meaning "given a pattern x, return
this". You can chain inside it: `x => x.speed(2).gain(.5)`.

Probability variants: `always`, `almostAlways`, `often`, `sometimes`,
`rarely`, `almostNever`, `never`, and `sometimesBy(p, f)` for an exact
probability.

## 5. Arithmetic on patterns

Patterns can be added, multiplied and so on, value by value:

```js
n("0 2 4").add("<0 3 5>").scale("C:major")   // transposes each cycle
note("c e g").add(note("<0 5 7>"))
s("hh*8").gain(saw.range(.2, .8))            // signals as values
```

## 6. Signals and randomness

| Signal | Shape |
|---|---|
| `sine`, `cosine` | Smooth wave |
| `saw`, `isaw` | Ramp up, ramp down |
| `tri`, `square` | Triangle, on/off |
| `rand` | Random value at every moment |
| `perlin` | Smooth random drift |
| `irand(n)` | Random whole number from 0 to n-1 |

Randomness in Strudel is **deterministic**: it's computed from the position in
time. The same moment always gives the same random value, so a "random" loop
is repeatable. Use `.segment(n)` to sample a signal into *n* steps per cycle.

## 7. Thinking in transformations

A useful habit: **seed → structure → variation → space**.

1. **Seed**: a short idea, `n("0 2 4 7")`
2. **Structure**: rhythm and form, `.struct("x ~ x x")`, `.slow(2)`
3. **Variation**: something that changes over cycles, `.lastOf(4, rev)`, `.sometimes(...)`
4. **Space**: sound and effects, `.s(...)`, `.lpf(...)`, `.room(...)`, `.jux(...)`

## Practice

1. In `patterns/05-randomness-variation.js`, replace `lastOf(4, rev)` with
   `chunk(4, x => x.add(7))`.
2. Make a Reich-style canon: `n("0 2 4 5 7 5 4 2").scale("D:dorian").off(1/4, x => x.add(2))`.
3. Take any clip from `clips/` and build a full pattern using only one sample
   and transformations.
