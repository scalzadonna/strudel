# Class 03: Mini-notation

> Mini-notation is a small rhythm language that lives inside **double-quoted
> strings**. It descends from Tidal, and through Tidal from the Bol Processor
> and the idea of rhythm as a cycle.

In Strudel, `"..."` (double quotes) is parsed as mini-notation. `'...'` (single
quotes) and backticks are ordinary strings. So `s("bd sd")` is a pattern, and
`s('bd sd')` is just text.

## 1. Sequences: steps share one cycle

```js
"bd sd hh cp"        // 4 events, each 1/4 of a cycle
```

## 2. Rest: `~`

```js
"bd ~ sd ~"          // silence on steps 2 and 4
```

## 3. Subdivision: `[ ]`

Brackets squeeze a group into the space of one step:

```js
"bd [sd sd] hh"      // the two sd share the second third of the cycle
"bd [sd [hh hh]]"    // brackets can be nested
```

## 4. Alternation: `< >`

Angle brackets pick **one item per cycle**, in turn:

```js
"bd <sd cp>"         // cycle 0: bd sd, cycle 1: bd cp, cycle 2: bd sd...
"<c e g>"            // one note per cycle
```

## 5. Speed up and slow down: `*` and `/`

```js
"hh*8"               // hh eight times in one step
"bd [sd cp]/2"       // the group takes 2 cycles: sd in one cycle, cp in the next
"<c e g>*2"          // two items of the alternation per cycle
```

Numbers can be patterns too: `"hh*<4 8 16>"`.

## 6. Repeat: `!`

```js
"bd!3 sd"            // the same as "bd bd bd sd"
"hh!8"               // eight hh (you used this in patterns/01)
```

`!` adds steps (the others get shorter). `*` speeds up within a single step.

## 7. Elongation: `@`

```js
"c@3 e"              // c lasts 3 units, e lasts 1: c takes 3/4 of the cycle
```

## 8. Layers: `,`

A comma plays several sequences **at the same time**:

```js
"bd*4, hh*8, ~ sd"   // three layers in one cycle
"[c3,e3,g3]"         // a chord
"[bd sd, hh hh hh]"  // 2 against 3: a polyrhythm, both fill the cycle
```

## 9. Polymeter: `{ }` and `%`

With curly braces, layers keep the **same step length** rather than the same
cycle length:

```js
"{bd sd, hh hh hh}"  // the step length comes from the first layer (2 per cycle)
                     // so hh hh hh drifts against it: 3 steps over 2 per cycle
"{1 0 0 1 0 1 0}%8"  // a 7-step pattern, 8 steps per cycle: it rotates each cycle
```

That last example comes from your `patterns/01-first-steps-rhythm.js`, where
a 7-step accent pattern runs at 8 steps per cycle, so it shifts every cycle.

## 10. Euclidean rhythms: `(hits, steps, rotation)`

```js
"bd(3,8)"            // 3 hits spread evenly over 8 steps: the tresillo
"bd(5,8,2)"          // 5 over 8, rotated by 2 steps
"hh(<3 5>,8)"        // the parameters can be patterns
```

## 11. Randomness: `?` and `|`

```js
"hh*8?"              // each hh plays with 50% probability
"hh*8?0.2"           // each hh is dropped with 20% probability
"[bd | cp | sd]"     // pick one at random each cycle
```

As explained in Class 02, the randomness is computed from time, so it's
repeatable.

## 12. Sample number: `:`

```js
"hh:0 hh:3"          // the same as s("hh hh").n("0 3")
"modem:5"            // the 6th file of the modem folder (clips/)
```

## 13. Putting it together

```js
s("<bd(3,8) bd(5,8)>, [~ sd]*2, hh*<8 16>?0.1")
```

Read it as three layers:

1. a kick alternating between tresillo and cinquillo each cycle
2. a snare on the off-beats
3. hi-hats, 8 or 16 per cycle, randomly thinned out a little

## 14. Mini-notation vs functions

Most symbols have an equivalent function, which is useful when you want to
transform a pattern with code:

| Mini-notation | Function |
|---|---|
| `"a b"` | `seq("a", "b")` |
| `"<a b>"` | `cat("a", "b")` |
| `"a, b"` | `stack("a", "b")` |
| `"a*2"` | `.fast(2)` |
| `"a/2"` | `.slow(2)` |
| `"a?"` | `.degrade()` |
| `"a(3,8)"` | `.euclid(3, 8)` |

## Practice

1. Rewrite `patterns/01-first-steps-rhythm.js` using only one `s("...")` string
   with commas.
2. Make a 3-against-4 polyrhythm with `[ , ]`, then a 3-against-4 polymeter
   with `{ , }`. Listen to the difference.
3. Find every mini-notation feature used in `patterns/02` to `06` and `clips/`.
