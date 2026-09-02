'use client'

import AgenrapSideBar from "@/src/shared/components/agenrap-ui/sidebar/agenrap-side-bar"
import { useStaffContext } from "@/src/providers/staff-context-provider"

export default function StaffContextGate() {
  const { staffContext, contextLoading } = useStaffContext()

  return (
    <AgenrapSideBar
      staffContext={staffContext}
      contextLoading={contextLoading}
    />
  )
}