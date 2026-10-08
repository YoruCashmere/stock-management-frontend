interface baseReception{
    name:string,
    unitsRecieved:string,
    unitsSold?:string,
    costPrice:number,
    sellingPrice:number,
    productAttribute:string,
    barcode:number,
    batchProduct:string,
    perishable:boolean,
    id:string
}

interface baseReceptionPerishable{
    perishable:boolean,
    expiryDate:Date,
}
interface baseReceptionNotPerishable{
    perishable:boolean,
    expiryDate:never
}
type batchReceptionI= (baseReception & baseReceptionPerishable) | (baseReception & baseReceptionNotPerishable);

export type { batchReceptionI };



