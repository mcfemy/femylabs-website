import { useEffect } from 'react'

const SUFFIX = 'Femylabs LLC'

/** Sets a descriptive <title> per page (announced by screen readers on navigation). */
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SUFFIX}` : `${SUFFIX} — You Bring the Idea. We Build the Technology.`
  }, [title])
}
