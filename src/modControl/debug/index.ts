// Look at output:
// cat ~/Library/Application\ Support/factorio/script-output/factorio-chip.log
const FILE = 'factorio-chip.log'

let firstDebug = false

export function debug(msg: string, fileOnly: boolean = false) {
  if (!firstDebug) game.write_file(FILE, '\n\n---------------\n\n', true)
  firstDebug = true
  game.write_file(FILE, msg + '\n', true)
  if (!fileOnly) {
    msg = `[factorio-chip] ${msg}`
    for (let i = 1; i <= game.players.length(); i++) game.players[i].print(msg)
  }
}
