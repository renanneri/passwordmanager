import {
    PasswordCardService as IPasswordService,
    GetAllPasswordCardsResponse,
    PasswordCard,
    CreatePasswordCard
 } from 'api/passwordCard/passwordCard.model';
 
 import httpClient from 'http/httpClient';
 
 const PasswordCardService = (): IPasswordService => {
    return {
        getAllPasswordCards: (): HttpPromise<GetAllPasswordCardsResponse> => {
          return httpClient.get('/password-cards');
       },
         deletePasswordCard: (id: string): HttpPromise<void> => {
            return httpClient.delete(`/password-cards/${id}`);
         },
         createPasswordCard: (passwordCard: CreatePasswordCard): HttpPromise<void> => {
            return httpClient.post('/password-cards', { data: passwordCard });
         },
         updatePasswordCard: (passwordCard: PasswordCard): HttpPromise<void> => {
            return httpClient.put(`/password-cards/${passwordCard.id}`, { data: passwordCard });
         }
    };
 };
 
 export default PasswordCardService();