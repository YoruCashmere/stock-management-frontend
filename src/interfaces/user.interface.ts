interface UserI {
    id: string,
    email: string,
    role: string,
    creator: string,
    firstName: string,
    status: string,
    lastName: string,
    phone: string,
    profileUrl: string,
    userName: string,
    warehouse?: string,
    createdAt?: string,
    activeHours:number,
    week:number,
}


export type { UserI }
