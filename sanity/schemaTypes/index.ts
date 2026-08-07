import { type SchemaTypeDefinition } from 'sanity'

import { articleType } from './articleType'
import { blockContentType } from './blockContentType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [articleType, blockContentType],
}
