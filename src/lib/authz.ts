export function authorizeDocumentUpdate(
  user: { id: string; email: string },
  doc: { owner_id: string } | null,
  share: { permission: 'viewer' | 'editor' } | null
) {
  if (!doc) {
    throw new Error('Document not found')
  }

  if (doc.owner_id === user.id) {
    return true
  }

  if (share && share.permission === 'editor') {
    return true
  }

  throw new Error('Unauthorized to edit this document')
}
