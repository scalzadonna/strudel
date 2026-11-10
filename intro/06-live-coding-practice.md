# Class 06: Live coding practice

> Knowing the functions is one skill. Performing with them is another. This
> class is about the second one.

## 1. The REPL workflow

| Action | Shortcut |
|---|---|
| Evaluate (apply your changes) | Ctrl+Enter (Cmd+Enter on a Mac) |
| Stop everything | Ctrl+. (or `hush()`) |
| Mute one block | Put `_` in front: `_$:` |
| Share | The share button encodes your code into a URL |

Small, frequent evaluations work better than big rewrites. Change one thing,
listen, then change the next.

## 2. Preparing a set

- **Start from a skeleton**: tempo, a few muted `$:` blocks, and the samples
  you'll use, already loaded.
- **Name your ideas** with `const`, so you can reuse and change them quickly.
- **Plan an arc**, not a script: intro, build-up, peak, breakdown, ending.
  `mask("<0 1>/8")`-style switches help you build arrangements.
- **Keep an exit**: a calm pattern you can always fall back to.
- **Practise mistakes**: a typo stops only the re-evaluation, and the previous
  version keeps playing. Fix it and evaluate again.

## 3. Show your screen

Following the TOPLAP manifesto, the code is part of the performance:

- Use a large font and a readable theme.
- Prefer clear names and short lines over clever tricks.
- Leave comments the audience can read: `// now the bass`.

## 4. Playing with others

- **Flok** (<https://flok.cc>) lets several people edit the same Strudel session
  live.
- Agree on tempo and roles (drums, bass, textures) before starting.
- Leave space. Two people adding layers at the same time make mud.

## 5. Samples and ethics

What you play, you publish. Use your own recordings, freely licensed sounds
(CC0, Creative Commons with credit), or material you have permission to use.
For personal practice with other sources, keep the audio out of public repos,
as `clips/` does with `.gitignore`.

## 6. A practice routine

| Time | Exercise |
|---|---|
| 5 min | Warm up: recreate one pattern from `patterns/` from memory |
| 10 min | Constraint: one sample only, or one function you've never used |
| 10 min | Transformation drill: take a seed through 10 variations without stopping the music |
| 5 min | Record (the browser's or your system's audio recorder) and listen back |

Once a week: play a 10-minute set from start to finish without pausing.

## 7. Where to go next

- The official workshop: <https://strudel.cc/workshop/getting-started>
- The function reference: <https://strudel.cc/learn>
- Community: the TidalCycles/Strudel forum (<https://club.tidalcycles.org>),
  and the Discord linked from strudel.cc
- Events: Algorave nights, TOPLAP local nodes, ICLC (the International
  Conference on Live Coding)

## Practice

1. Build a 5-minute set from `clips/04-modem-techno.js`, unmuting blocks one by
   one and muting them again for an ending.
2. Share it as a URL and listen to it on another device.
3. Pick a constraint from section 6 and repeat it every day for a week.
