interface ProductI {
    id: string,
    productName: string,
    brand: string,
    category: string,                            //categoryid
    creator:string,
    description:string,
    specification:string,
    perishable:string,
    createdAt?:string
    units?: number,
    images:string[],
    skuBreakdown?:object[]
}

export type {ProductI};