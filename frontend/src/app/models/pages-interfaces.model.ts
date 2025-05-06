
export type PersonType = 
  | "brideMother" 
  | "brideMaid" 
  | "bestMan" 
  | "guest" 
  | "groomMother" 
  | "brideFather" 
  | "groomFather";
  
export interface Service{ // nunca se cria um tipo chamado service, isso confunde todo mundo!!!!!!!!!!!
id:string,
name:string,
link?:string,
value:number
category:string,
email:string
phone?:Number
}

export interface Expense {
id:string,
name:string,
category:string,
value:number
service?:Service
}

export interface Table {
id:string,
name:string,
selectedGuests:TableGuest[]
}

export interface Guest {
id:string,
name:string,
type: PersonType,
email:string,
phone: string 
photo?:string
bog:'bride'| 'groom' 
}

export interface TableGuest{
  id:string,
  name:string,
  type: "guest" | "brideMaid" | "bestMan" | "brideMother" | "brideFather" | "groomFather" | "groomMother";
}

    