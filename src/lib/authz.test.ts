import { describe, it, expect } from 'vitest'
import { authorizeDocumentUpdate } from './authz'

describe('Document Authorization (authorizeDocumentUpdate)', () => {
  it('allows owner to update document', () => {
    const user = { id: 'user-a', email: 'a@example.com' }
    const doc = { owner_id: 'user-a' }
    
    expect(() => authorizeDocumentUpdate(user, doc, null)).not.toThrow()
  })

  it('denies access to unrelated user', () => {
    const user = { id: 'user-b', email: 'b@example.com' }
    const doc = { owner_id: 'user-a' }
    
    expect(() => authorizeDocumentUpdate(user, doc, null)).toThrow('Unauthorized to edit this document')
  })
  
  it('allows shared editor to update document', () => {
    const user = { id: 'user-b', email: 'b@example.com' }
    const doc = { owner_id: 'user-a' }
    const share = { permission: 'editor' as const }
    
    expect(() => authorizeDocumentUpdate(user, doc, share)).not.toThrow()
  })
  
  it('denies shared viewer from updating document', () => {
    const user = { id: 'user-b', email: 'b@example.com' }
    const doc = { owner_id: 'user-a' }
    const share = { permission: 'viewer' as const }
    
    expect(() => authorizeDocumentUpdate(user, doc, share)).toThrow('Unauthorized to edit this document')
  })
})
