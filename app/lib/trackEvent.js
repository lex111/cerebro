import ua from 'universal-analytics'
import { machineIdSync } from 'node-machine-id'

const DEFAULT_CATEGORY = 'Cerebro App'

let visitor
let trackingEnabled = process.env.NODE_ENV === 'production'

try {
  visitor = ua('UA-87361302-1', machineIdSync(), { strictCidFormat: false })
} catch (err) {
  console.log('[machine-id error]', err)
  visitor = ua('UA-87361302-1')
}

export default ({ category, event, label, value }) => {
  if (trackingEnabled) {
    visitor.event(category || DEFAULT_CATEGORY, event, label, value).send()
  }
}
