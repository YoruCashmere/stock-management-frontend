interface OrderI {
    warehouse: string,
    status:boolean,
    id: string,
    creator:string,
    createdAt?:string,
    orderNumber:number
}

export type { OrderI }