import { disablePlacementOnNauvisBus } from './nauvisBus'
import { PROTOTYPES } from './data'

export function init() {
  data.extend(PROTOTYPES)
  disablePlacementOnNauvisBus()
}
