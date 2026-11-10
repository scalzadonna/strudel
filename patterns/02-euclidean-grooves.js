// Euclidean grooves
// bd(hits, steps, rotation) spreads hits as evenly as possible
// Try: change the rotation numbers, or swap the bank for "RolandTR707"
setcpm(120/4)
const dbank = "RolandTR808"
$: s("bd(3,8)").bank(dbank)._punchcard()
$: s("~ cp").bank(dbank).room(.3)
$: s("hh(5,8,2)").bank(dbank).gain(.4)._punchcard()
$: s("rim(<3 5>,8,<0 2>)").bank(dbank).gain(.5)._punchcard()
$: s("lt(2,16,5), mt(3,16,9)").bank(dbank).gain(.6)
