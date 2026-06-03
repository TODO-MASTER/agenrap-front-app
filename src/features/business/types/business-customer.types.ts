export type BusinessCustomer = {
    userId: number | null
    customerId: number | null
    firstName: string
    lastName: string
    fullName: string
    initials: string
    telephone: string | null
    lastAppointment: string | null
    lastServiceName: string | null
    totalAppointments: number
    totalSpent: number
    isRegistered: boolean
}
 