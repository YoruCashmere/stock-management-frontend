interface orderDetailsI {
    variant: string,
    units: number,
    id?: string,
    custormer: string,
    createdAt?: string,
    orderNumber: number
    paymentMethod: string,
    campaign: string | null
}

export type { orderDetailsI }