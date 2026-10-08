interface campaignI {
    campaignName: string,
    id: string,
    products: string[],
    type: string,
    creator:string,
    createdAt:string,
    startDate:string,
    endDate:string,
    totalProducts:number,
    status:string

}

export type { campaignI };