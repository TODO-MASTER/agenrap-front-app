export type DashboardSummary = {
    revenueToday: number
    revenueThisWeek: number
    revenueThisMonth: number
    revenuePreviousMonth: number
 
    appointmentsToday: number
    appointmentsScheduledToday: number
    appointmentsCompletedToday: number
    appointmentsCancelledToday: number
 
    appointmentsThisMonth: number
    appointmentsCompletedThisMonth: number
    appointmentsCancelledThisMonth: number
 
    totalActiveCustomers: number
    newCustomersThisMonth: number
 
    nextAppointment: {
        appointmentId: number
        clientName: string
        serviceName: string
        hour: string
    } | null
 
    dailyRevenueThisMonth: {
        date: string
        revenue: number
    }[]
 
    topServices: {
        serviceName: string
        count: number
    }[]
}