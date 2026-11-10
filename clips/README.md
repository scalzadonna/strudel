# Clips

Lessons for working with audio clips in Strudel. They build on `patterns/`.

The audio itself is **not** in the repo (see `.gitignore`). Put your own clips
in `clips/samples/`, one folder per sound:

```
clips/samples/
├── loop/   one musical loop, ideally exactly 1 or 2 bars
├── vox/    a short vocal or spoken phrase (1–3 s)
└── hit/    a few one-shots (single hits, stabs, notes), any number of files
```

Each folder name becomes a sound name in Strudel (`s("loop")`, `s("vox")`,
`s("hit")`). Files inside a folder are picked with `n(0)`, `n(1)`, ... in
alphabetical order.

## Cutting clips with ffmpeg

```sh
# 4 seconds starting at 1:23.5, mono, 44.1 kHz
ffmpeg -i source.m4a -ss 00:01:23.5 -t 4 -ac 1 -ar 44100 clips/samples/loop/loop.wav
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
