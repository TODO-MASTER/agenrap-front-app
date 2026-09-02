export const PERMISSION_GROUPS: {
  group: string
  title: string
  items: { code: string; label: string }[]
}[] = [
  {
    group: "house.service",
    title: "Serviços da casa",
    items: [
      { code: "house.service.create", label: "Criar" },
      { code: "house.service.edit", label: "Editar" },
      { code: "house.service.delete", label: "Excluir" },
    ],
  },
  {
    group: "house.hour",
    title: "Jornada da casa",
    items: [
      { code: "house.hour.create", label: "Criar" },
      { code: "house.hour.edit", label: "Editar" },
      { code: "house.hour.delete", label: "Excluir" },
    ],
  },
  {
    group: "house.block",
    title: "Bloqueios da casa",
    items: [
      { code: "house.block.create", label: "Criar" },
      { code: "house.block.edit", label: "Editar" },
      { code: "house.block.delete", label: "Excluir" },
    ],
  },
  {
    group: "house.appointment",
    title: "Agenda de clientes",
    items: [
      { code: "house.appointment.create", label: "Agendar" },
      { code: "house.appointment.cancel", label: "Cancelar" },
      { code: "house.appointment.complete", label: "Concluir" },
    ],
  },
  {
    group: "house.customer",
    title: "clientes sem conta",
    items: [
      { code: "house.customer.create", label: "Criar" },
      { code: "house.customer.edit", label: "Editar" },
      { code: "house.customer.delete", label: "Deletar" },
      { code: "house.customer.merge", label: "Mesclar" },
    ],
  },
]

export function togglePermissionCode(codes: string[], code: string) {
  return codes.includes(code) ? codes.filter((c) => c !== code) : [...codes, code]
}