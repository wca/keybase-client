'use strict'

import * as UIConstants from '../constants/ui'

export function showModal (modal) {
  return { type: UIConstants.actions.showModal, modal }
}
