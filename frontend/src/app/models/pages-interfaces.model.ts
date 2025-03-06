
type PersonType = 
  | "brideMother" 
  | "brideMaid" 
  | "bestMan" 
  | "guest" 
  | "groomMother" 
  | "brideFather" 
  | "groomFather";
  
export interface Service{
id:string,
name:string,
link?:string,
value:Number
category:String,
email:String
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
type: "guest" | "brideMaid" | "bestMan" | "brideMother" | "brideFather" | "groomFather" | "groomMother";
email:string,
phone:number
photo?:string
bog:'bride'| 'groom'
}

export interface TableGuest{
  id:string,
  name:string
}

    