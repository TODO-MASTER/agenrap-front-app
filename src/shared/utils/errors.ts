export class SubscriptionRequiredError extends Error {
  code = 'SUBSCRIPTION_REQUIRED' as const
  constructor(message?: string) {
    super(message ?? 'Plano necessário para continuarwqewqewqe.')
    this.name = 'SubscriptionRequiredError'
  }
}