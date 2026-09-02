import { StaffContext } from "@/src/features/business/types/professional.types"

export function hasPerm(ctx: StaffContext, code: string) {
  if (ctx.isManager) return true
  return ctx.permissionCodes.includes(code)
}