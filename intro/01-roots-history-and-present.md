# Class 01: Roots, history and present

> Strudel is a young tool built on old ideas. To use it well, you need to know
> those ideas: music as a process, rhythm as a pattern, code as an instrument,
> and the screen as part of the performance.

## 1. What Strudel is, in one paragraph

Strudel is a **live coding environment for music that runs in your web
browser**. You write short pieces of code describing **patterns** (rhythms,
melodies, chords, changes to sound), and Strudel plays them in a loop while you
keep editing. Every time you re-evaluate (Ctrl+Enter), the music changes
without stopping. It is a JavaScript version of **TidalCycles**, a pattern
language Alex McLean has been developing since around 2009. Strudel is free
software, developed in the open by a small team and a community of musicians
and programmers.

Four ideas set it apart from a typical music app:

| Idea | In a typical music app | In Strudel |
|---|---|---|
| How music is described | A timeline: notes placed at positions | **Patterns**: rules that generate notes for any moment in time |
| How you play | You edit, then press play | You **edit while it plays**, so editing *is* playing |
| Where it runs | Installed software | **A web page**: nothing to install, and you share music as a URL |
| Who owns it | Usually a company | **Free software** (AGPL), built by its community |

## 2. Timeline at a glance

| Year | What happened | Why it matters for Strudel |
|---|---|---|
| 1792 | *Musikalisches Würfelspiel* (dice game music, attributed to Mozart) published | Music produced by a procedure plus chance |
| 1957 | Max Mathews writes **MUSIC I** at Bell Labs; Hiller & Isaacson's *Illiac Suite* | First computer-generated sound, and first computer-composed score |
| 1965–67 | Steve Reich's *It's Gonna Rain* and *Piano Phase* | "Process music": simple rules, rich results. Strudel's `off`, `jux` and polymeter come from this tradition |
| 1981 on | Bernard Bel's **Bol Processor**, for North Indian tabla patterns | A text notation for rhythm that later inspired Tidal's mini-notation |
| 1985 | Ron Kuivila live-programs music in Forth at STEIM (Amsterdam); Csound appears | Often cited as an early live coding performance |
| late 1980s | Max (Miller Puckette, IRCAM); The Hub's network music | Visual patching and networked performance |
| 1996 | **SuperCollider** (James McCartney) and **Pure Data** (Puckette) | Real-time synthesis on ordinary computers. SuperCollider later became Tidal's sound engine |
| 2000 on | Alex McLean and Adrian Ward perform as **slub**; JITLib for SuperCollider (Julian Rohrhuber) | Live coding becomes a performance practice |
| 2003 | **ChucK** (Ge Wang, Perry Cook): "on-the-fly programming" | A language designed from the start for changing code during performance |
| 2004 | **TOPLAP** founded in Hamburg | The live coding community organises, and writes its manifesto |
| ~2009 | **TidalCycles** begins (Alex McLean, written in Haskell) | The direct ancestor: cycles, mini-notation, pattern transformations |
| 2012 | First **Algorave**; **Sonic Pi** (Sam Aaron) | Live coding reaches dance floors and classrooms |
| ~2015 | **SuperDirt** replaces Tidal's original Dirt sampler | Tidal's sound moves into SuperCollider |
| 2017–18 | **Hydra** (Olivia Jack); **Tidal 1.0** | Live-coded visuals in the browser; Tidal's pattern core redesigned |
| 2022 | **Strudel** begins (Felix Roos and Alex McLean) | Tidal's ideas ported to JavaScript and the browser |
| 2023 | Strudel paper at ICLC (Utrecht) | The project's design is formally documented |
| 2024–26 | Strudel 1.x releases, development moves to Codeberg | Mature, community-driven development (see section 11) |

## 3. Prehistory: computers making sound

### Max Mathews and the unit generator (1957)

At Bell Labs, Max Mathews wrote **MUSIC I**, the first program to generate
audio on a digital computer. Its successors (the "MUSIC-N" family) introduced
the **unit generator**: small building blocks such as oscillators, filters and
envelopes that you connect together. Almost every synthesizer since, hardware
or software, follows this design. When you write `.s("sawtooth").lpf(800)` in
Strudel, you are connecting unit generators: an oscillator feeding a filter.

### Csound, Max and Pure Data

- **Csound** (Barry Vercoe, MIT, mid-1980s) continued the MUSIC-N line in text
  form. Strudel can still talk to Csound through an optional package.
- **Max** (Miller Puckette at IRCAM, later commercialised as Max/MSP) made
  music programming *visual*: boxes connected by cables. It is named after Max
  Mathews.
- **Pure Data** (Puckette, 1996) is Max's free, open-source sibling.

### SuperCollider (1996)

James McCartney's **SuperCollider** became open source in 2002. It separates
the **language** (`sclang`) from the **audio server** (`scsynth`), so code
sends messages to a sound engine. That split matters later: TidalCycles makes
no sound itself. It sends messages to SuperCollider. Strudel kept the same
separation inside the browser: the pattern engine decides *what* and *when*,
and a separate audio engine (superdough) makes the sound.

## 4. Algorithmic composition: music as process

Long before computers, composers described music as **rules** rather than
fixed notes.

- **Dice games** (18th century): pick bars by rolling dice. A small rule set
  generates a huge number of pieces.
- **Hiller & Isaacson's *Illiac Suite*** (1957): a string quartet composed with
  rules and random choices on the ILLIAC computer.
- **Iannis Xenakis**: "stochastic music" built from probability distributions.
  Strudel's `rand`, `perlin`, `degradeBy` and `sometimes` belong to this family.
- **Steve Reich's phasing**: two identical loops at slightly different speeds
  gradually drift apart. In Strudel: two copies of a pattern where one runs at
  `.fast(1.01)` (see Practice below), or a fixed offset with `.off(1/16, ...)`,
  or loops of different lengths with polymeter (`{}`).
- **Brian Eno's generative music** (1990s): music as a system that keeps
  producing variations, "like gardening".

Strudel inherits the key idea: **you describe a process, and the process
generates the music**. When you change the code during a performance, you are
changing the process, not editing individual notes.

## 5. Rhythm traditions: where the patterns come from

Strudel's rhythm notation draws on musical cultures where rhythm has always
been thought of as patterns and cycles:

- **Indian classical music**: *tala* (rhythmic cycles) and *konnakol* (spoken
  rhythm syllables) treat time as a repeating cycle subdivided in many ways.
  Tidal's "cycle" carries the same idea: music is built from a repeating unit
  of time, not from a fixed bar length.
- **Bol Processor** (Bernard Bel, from the early 1980s): software for modelling
  tabla compositions with a text grammar. Alex McLean has named it as an
  influence on Tidal's mini-notation.
- **Euclidean rhythms**: in 2005, Godfried Toussaint showed that spreading
  *k* hits as evenly as possible over *n* steps (an algorithm related to
  Euclid's, and to one Eric Bjorklund used for timing in a particle
  accelerator) produces rhythms found all over the world. For example,
  `(3,8)` is the Cuban *tresillo* and `(5,8)` the *cinquillo*. That's
  `s("bd(3,8)")` in Strudel, and you used it in `patterns/02-euclidean-grooves.js`.
- **Polyrhythm and polymeter** in West African, Afro-Cuban and many other
  traditions: several cycles of different lengths at once. In Strudel that's
  the `,` and `{}` notation.

## 6. The birth of live coding

**Live coding** means writing and changing code *during* a performance, with
the audience usually seeing the code.

### Early experiments

- **Ron Kuivila** (1985, STEIM, Amsterdam) performed by writing Forth code
  live. It is often cited as one of the first live coding performances.
- **The Hub** (from the mid-1980s, growing out of the League of Automatic Music
  Composers) networked several computers that each ran musicians' programs, so
  the music came from interacting programs.

### The 2000s: a scene forms

- **slub** (Alex McLean, Adrian Ward, later joined by Dave Griffiths) performed
  generative music with software they wrote themselves, in clubs. McLean's
  2004 article *Hacking Perl in Nightclubs* described the practice.
- **JITLib** (Julian Rohrhuber) brought "just-in-time" programming to
  SuperCollider: replace parts of a running program without stopping it.
- **ChucK** (2003) called itself "strongly-timed" and "on-the-fly": a language
  designed for live coding from the start.
- **Impromptu**, and later **Extempore** (Andrew Sorensen), **Fluxus** (Dave
  Griffiths, live-coded 3D visuals) and many others followed.

### TOPLAP and the manifesto (2004)

In 2004, at a meeting in Hamburg, practitioners founded **TOPLAP** (whose name
is usually expanded as "Temporary Organisation for the Promotion of Live
Algorithm Programming"). Their manifesto includes demands that still shape
the culture:

- **"Show us your screens."** Projecting the code is part of the performance,
  so the audience can follow the process.
- **"Obscurantism is dangerous."** Don't hide how the music is made.
- Programs are instruments that can change themselves, and the performer
  should be able to change them too.

That's why Strudel highlights the active part of the code as it plays, and
why visual feedback like `._punchcard()` and `._pianoroll()` exists: the code
is meant to be *seen*.

## 7. TidalCycles: the direct ancestor

**TidalCycles** ("Tidal") was started by Alex McLean around 2009, during his
PhD at Goldsmiths, University of London, on programming languages for artists.
It is a **domain-specific language embedded in Haskell**.

### Core ideas (all inherited by Strudel)

1. **The cycle** is the basic unit of time. A pattern repeats every cycle;
   tempo is measured in *cycles per second* (cps), not only beats per minute.
2. **A pattern is a function of time.** Ask a pattern "what happens between
   time A and time B?" and it answers with a list of events. Nothing is stored
   as a fixed list of notes (Class 02 explains this in detail).
3. **Mini-notation**: a compact text language for rhythm, `"bd [sd sd] ~ hh"`
   (Class 03).
4. **Transformations**: functions that take a pattern and return a new one:
   `fast`, `rev`, `every` (now `firstOf`/`lastOf` in Strudel), `jux`, `off`,
   `degradeBy`... Music is built by **composing** them (Class 05).
5. **Separation of pattern and sound**: Tidal sends messages (via OSC) to
   **SuperDirt**, a sampler and synth engine running in SuperCollider. (The
   original engine, "Dirt", was a sampler written in C.)

### Why Haskell?

Haskell's pure functions and strong types fit the "pattern as a function"
model well. But installing Haskell, SuperCollider and an editor plugin is a
hurdle, especially for beginners and workshops. That hurdle is one of the main
reasons Strudel exists.

### Tidal 1.0 (2018) and after

Tidal 1.0 rebuilt the internal pattern representation, with exact rational
time, events with a "whole" and a "part", and continuous signals.
**Strudel's core follows this design closely**, which is why the two languages
share so much vocabulary. Work on the next generation of Tidal (often called
Tidal 2.0) has continued since, alongside other ports such as **Vortex**
(Python).

## 8. Algorave: live coding on the dance floor

In 2012 Alex McLean and Nick Collins coined **Algorave** ("algorithmic
rave"), and the first events took place in the UK that year. The tagline
parodies the UK's 1994 Criminal Justice Act, which targeted raves with music
featuring "repetitive beats": algorave music is "sounds wholly or
predominantly characterised by the emission of a succession of repetitive
conditionals".

Algoraves have since happened all over the world. The scene is known for:

- projected code (TOPLAP's "show us your screens")
- mixing genres: techno, noise, ambient, experimental
- community organising: workshops, open stages, and deliberate efforts to make
  the scene diverse and welcoming (for example, events and collectives led by
  women and non-binary live coders)

## 9. The wider ecosystem (2012 to now)

Tools you'll meet in the same community, often at the same events:

| Tool | Creator(s) | Language | Focus |
|---|---|---|---|
| **Sonic Pi** | Sam Aaron | Ruby-like | Education (Raspberry Pi), live performance |
| **FoxDot** | Ryan Kirkbride | Python | Patterns plus SuperCollider |
| **Gibber** | Charlie Roberts | JavaScript | Browser-based audio and visual live coding |
| **Hydra** | Olivia Jack | JavaScript | Live-coded video synthesis, inspired by analog synths. **Works inside Strudel** |
| **Estuary** | David Ogborn and team | multiple | Collaborative, networked live coding in the browser |
| **Flok** | Damián Silvani (munshkr) | multiple | Collaborative editor. **Supports Strudel**, so several people can code one set |
| **Extempore** | Andrew Sorensen | Scheme/xtlang | Low-level, high-performance live programming |
| **Orca** | Hundred Rabbits | grid language | Esoteric 2D sequencer |

Strudel is one member of this family, and its closest sibling is Tidal itself.

## 10. Strudel: Tidal in the browser (2022 to now)

### Origins

In early 2022, **Felix Roos** started porting Tidal's pattern engine to
JavaScript, and **Alex McLean** joined to work on it with him. The goals were:

- **Zero installation**: open a web page and play. That's ideal for workshops,
  schools, and anyone curious.
- **Shareable**: the code can be encoded into a URL, so a link *is* a piece of
  music.
- **Same ideas as Tidal**: cycles, patterns as functions, mini-notation, and
  the same transformation vocabulary, so knowledge transfers between the two.
- **Approachable**: JavaScript is widely known and runs everywhere.

### The name

*Strudel* is the Austrian pastry with many rolled layers, like layered
patterns. The German word *Strudel* also means a **whirlpool or eddy**, which
fits a descendant of *Tidal*.

### The 2023 paper

Felix Roos and Alex McLean presented *Strudel: Live Coding Patterns on the
Web* at the International Conference on Live Coding (ICLC) in Utrecht in 2023.
It explains the design: a faithful port of Tidal's pattern model, a
JavaScript-friendly syntax, and an audio engine that works in the browser.

### How Strudel adapted Tidal to JavaScript

| Problem | Tidal (Haskell) | Strudel (JavaScript) |
|---|---|---|
| Mini-notation | Strings parsed when used | **Double-quoted strings are parsed as mini-notation automatically** by a code transformer (the *transpiler*). Single quotes or backticks stay plain strings |
| Composing functions | Operators like `#`, `$`, `.` | **Method chaining**: `s("bd").fast(2).room(.3)` |
| Multiple patterns at once | `d1`, `d2`... channels | **`$:` blocks**: each one is a separate pattern playing at the same time |
| Exact time | Haskell `Rational` | A fraction library, so time never drifts from rounding errors |
| Sound | SuperDirt in SuperCollider | **superdough**, Strudel's own Web Audio engine. It can also send to SuperDirt, MIDI, OSC or Csound |
| Visual feedback | Editor plugins | Built in: highlighting of the code that's playing, plus `_punchcard()`, `_pianoroll()`, `_scope()` |

## 11. Architecture in brief

Strudel is split into packages, each with one job:

| Package | Role |
|---|---|
| `@strudel/core` | The pattern engine: `Pattern`, time, events (haps), transformations, signals |
| `@strudel/mini` | Parser for mini-notation |
| `@strudel/transpiler` | Rewrites your code before running it: double-quoted strings become mini-notation, `$:` labels become patterns, and code locations are tracked for highlighting |
| `@strudel/webaudio` + **superdough** | Audio engine: samples, synths, filters, effects, reverb, delay |
| `@strudel/tonal` | Music theory: `scale()`, `voicing()`, chord symbols |
| `@strudel/soundfonts` | General MIDI instrument sounds (`gm_...`) |
| `@strudel/codemirror` | The editor: highlighting, keybindings, themes |
| `@strudel/draw` | Visuals such as punchcard and pianoroll |
| `@strudel/midi`, `@strudel/osc` | Control hardware and other software, or send to SuperDirt |
| `@strudel/hydra` | Hydra visuals inside a Strudel session |
| `@strudel/csound` | Csound instruments |
| `@strudel/sampler` | Small local server for your own samples (used in `clips/`) |

What happens when you press Ctrl+Enter:

```
your code ──transpiler──► JavaScript that builds Pattern objects
                                  │
                         scheduler (every ~50 ms)
                                  │  "what happens in the next slice of time?"
                                  ▼
                       pattern.query(time span) ──► list of haps (events)
                                  │
                                  ▼
               output: superdough (Web Audio) │ MIDI │ OSC │ Csound
```

Class 02 explains each step.

## 12. Current development (as of late 2026)

The state of the project when these notes were written:

- **Licence and openness**: Strudel is free software under the **AGPL-3.0**.
  The main site, the REPL and the documentation are all at <https://strudel.cc>.
- **Where development happens**: the project moved its source code from GitHub
  to **Codeberg** (the `uzu` organisation, alongside Tidal), a non-profit,
  community-run code host. Check there for issues, releases and contribution
  guidelines.
- **Versions**: Strudel has been in its **1.x** series since 2024, with regular
  releases adding functions, sounds and editor features.
- **Active areas** you'll see in recent releases and community discussion:
  - better support for **your own sounds**: importing sample folders,
    `@strudel/sampler`, sample maps from GitHub
  - **MIDI in and out**, and controlling hardware synths
  - richer **visual feedback** and **Hydra** integration
  - **collaborative** performance (Flok), and embedding Strudel in other
    websites (`<strudel-repl>` web component, npm packages)
  - closer alignment with **Tidal**, so patterns and knowledge transfer
    between the two
- **Community**: the TidalCycles/Strudel forum (Tidal Club), a Discord
  server, regular workshops, and the yearly ICLC conference.

What changes fast: function names occasionally change (for example, `every`
became `firstOf`/`lastOf`), and new effects and sounds keep arriving. **When a
lesson in this repo doesn't behave as described, check the docs and the
release notes first.**

## 13. Why this history matters to you

| Historical idea | What it means when you write Strudel |
|---|---|
| Unit generators (Mathews) | `.s("sawtooth").lpf(800).room(.3)` is a signal chain |
| Process music (Reich, Eno) | Describe a process (`off`, `jux`, `{}`) and let it run |
| Stochastic music (Xenakis) | Use `rand`, `perlin`, `sometimes` for controlled variation |
| Rhythm cultures (tala, Euclid) | Think in cycles and even spreads, `"bd(3,8)"` |
| TOPLAP ("show us your screens") | Readable code is part of the performance |
| Tidal's pattern model | Patterns are functions of time, not lists of notes |
| The browser (Strudel) | Share your music as a link; collaborate live |

## 14. Glossary

| Term | Meaning |
|---|---|
| **Live coding** | Writing and changing code during a performance |
| **Pattern** | A function of time that produces events. Strudel's central object |
| **Cycle** | The repeating unit of time patterns are measured in |
| **cps / cpm** | Cycles per second or per minute: the tempo |
| **Hap** | One event a pattern produces: a time span plus a value (from "happening") |
| **Mini-notation** | The rhythm language inside double quotes |
| **Transformation** | A function that turns one pattern into another (`fast`, `rev`, `jux`...) |
| **Signal** | A continuous pattern (`sine`, `saw`, `perlin`) used to control parameters |
| **REPL** | Read–Eval–Print Loop: the editor where you write and run code |
| **superdough** | Strudel's built-in audio engine |
| **SuperDirt** | Tidal's sound engine in SuperCollider. Strudel can send to it too |
| **Orbit** | An effects bus: patterns on the same orbit share delay and reverb |
| **Algorave** | A rave where the music is made from algorithms, usually live coded |
| **TOPLAP** | The live coding community organisation and its manifesto |

## 15. Further reading and listening

- Strudel website, workshop and reference: <https://strudel.cc> and <https://strudel.cc/learn>
- TidalCycles: <https://tidalcycles.org>
- TOPLAP and the manifesto: <https://toplap.org>
- Algorave: <https://algorave.com>
- Hydra: <https://hydra.ojack.xyz>
- Flok, the collaborative editor: <https://flok.cc>
- Sonic Pi: <https://sonic-pi.net>
- SuperCollider: <https://supercollider.github.io>
- Roos, F. and McLean, A. (2023). *Strudel: Live Coding Patterns on the Web*. ICLC 2023.
- McLean, A. and Dean, R. T. (eds.) (2018). *The Oxford Handbook of Algorithmic Music*. Oxford University Press.
- Blackwell, A., Cocker, E., Cox, G., McLean, A. and Magnusson, T. (2022). *Live Coding: A User's Manual*. MIT Press (free to read online).
- Toussaint, G. (2005). *The Euclidean Algorithm Generates Traditional Musical Rhythms*. BRIDGES conference.
- Listening: search for "algorave" and "live coding" sets from ICLC and Algorave events, and Steve Reich's *Piano Phase*.

## Practice

1. Open <https://strudel.cc>, press the "shuffle" button a few times, and read
   the examples. Spot the double-quoted strings (mini-notation) and the
   `$:` blocks.
2. Play `patterns/01-first-steps-rhythm.js` and keep the code visible while it
   plays. Watch the highlighting follow each sound, which is the "show us your
   screens" idea in action.
3. Recreate Reich's phasing: `$: note("c4 e4 g4 b4").fast(1)` and
   `$: note("c4 e4 g4 b4").fast(1.01)`. Listen as the two drift apart.
4. Play `"bd(3,8)"` and `"bd(5,8)"`: the tresillo and the cinquillo.
