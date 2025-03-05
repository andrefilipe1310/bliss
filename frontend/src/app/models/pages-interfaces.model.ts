
type PersonType = 
  | "brideMother" 
  | "brideMaid" 
  | "bestMan" 
  | "guest" 
  | "groomMother" 
  | "brideFather" 
  | "groomFather";
  
export interface Service{
id:String,
name:String,
link?:String,
value:Number
category:String,
email:String
phone?:Number
}

export interface Expense {
id:String,
name:String,
category:String,
value:Number
service?:Service
}

export interface Table {
id:String,
name:String,
selectedGuests:Guest[]
}

export interface Guest {
id:String,
name:String,
type: "guest" | "brideMaid" | "bestMan" | "brideMother" | "brideFather" | "groomFather" | "groomMother";
email:String,
phone:Number
photo?:String
bog:'bride'| 'groom'
}

    