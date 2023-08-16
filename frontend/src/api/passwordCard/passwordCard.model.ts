export interface PasswordCard {
    id: string;
    name: string;
    username: string;
    password: string;
    url: string;
 }

 export interface CreatePasswordCard {
  name: string;
  username: string;
  password: string;
  url: string;
}
 
 export interface GetAllPasswordCardsResponse extends Array<PasswordCard> {}
 
 
 export interface PasswordCardService {
   getAllPasswordCards: () => HttpPromise<PasswordCard[]>;
   deletePasswordCard: (id: string) => HttpPromise<void>;
   createPasswordCard: (passwordCard: CreatePasswordCard) => HttpPromise<void>;   
   updatePasswordCard: (passwordCard: PasswordCard) => HttpPromise<void>; 
 }