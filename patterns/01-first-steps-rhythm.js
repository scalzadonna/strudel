// First steps with strudel.cc
// Basic rythm exploration
const dbank = "tr909"
$: s("hh!8").gain(.2)
$: s("bd(<4,5,7,8>,16)").struct("{1 0 0 1 0 1 0}%8").bank(dbank)._punchcard()
$: s("sd").bank(dbank).beat("4,12", 16)._punchcard()
