package usecases

import (
	"context"
	"fmt"

	"github.com/renanneri/passmanager/backend/app/domain"
)

type PasswordCardsUsecases struct {
	passwordCardRepository PasswordCardRepository
	encrypt                Encrypter
}

func NewPasswordCardsUsecases(passwordCardRepository PasswordCardRepository, encrypt Encrypter) *PasswordCardsUsecases {
	return &PasswordCardsUsecases{
		encrypt:                encrypt,
		passwordCardRepository: passwordCardRepository,
	}
}

func (u *PasswordCardsUsecases) CreatePasswordCard(ctx context.Context, passwordCard domain.PasswordCard) error {
	encryptedPassword, err := u.encrypt(passwordCard.Password)

	if err != nil {
		return fmt.Errorf("error encrypting password: %v", err)
	}

	passwordCard.Password = encryptedPassword
	passwordCard.GenerateID()
	return u.passwordCardRepository.Create(ctx, passwordCard)
}

func (u *PasswordCardsUsecases) GetPasswordCards(ctx context.Context) ([]domain.PasswordCard, error) {
	return u.passwordCardRepository.GetAll(ctx)
}

func (u *PasswordCardsUsecases) UpdatePasswordCard(ctx context.Context, id string, passwordCard domain.PasswordCard) error {
	encryptedPassword, err := u.encrypt(passwordCard.Password)

	if err != nil {
		return fmt.Errorf("error encrypting password: %v", err)
	}

	passwordCard.Password = encryptedPassword
	return u.passwordCardRepository.Update(ctx, id, passwordCard)
}

func (u *PasswordCardsUsecases) DeletePasswordCard(ctx context.Context, id string) error {
	return u.passwordCardRepository.Delete(ctx, id)
}
