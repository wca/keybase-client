'use strict'

import Folders from './folders'
import Chat from './chat'
import People from './people'
import Devices from './devices'
import More from './more'

export default [
  { title: 'Folders', rootComponent: Folders },
  { title: 'Chat', rootComponent: Chat },
  { title: 'People', rootComponent: People, systemIcon: 'contacts' },
  { title: 'Devices', rootComponent: Devices },
  { title: 'More', rootComponent: More, systemIcon: 'more' }
]
