'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function RegisterOrganizationRedirect() {
  useEffect(() => {
    redirect('/auth/register-organization')
  }, [])

  return null
}