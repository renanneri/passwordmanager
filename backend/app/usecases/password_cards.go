package usecases

import (
	"context"

	"github.com/renanneri/passmanager/backend/app/domain"
)

type PasswordCardsUsecases struct {
	passwordCardRepository PasswordCardRepository
	hash                   Hasher
}

func NewPasswordCardsUsecases(passwordCardRepository PasswordCardRepository, hash Hasher) *PasswordCardsUsecases {
	return &PasswordCardsUsecases{
		hash:                   hash,
		passwordCardRepository: passwordCardRepository,
	}
}

func (u *PasswordCardsUsecases) CreatePasswordCard(ctx context.Context, passwordCard domain.PasswordCard) error {
	passwordCard.Password = u.hash(passwordCard.Password)
	passwordCard.GenerateID()
	return u.passwordCardRepository.Create(ctx, passwordCard)
}

func (u *PasswordCardsUsecases) GetPasswordCards(ctx context.Context) ([]domain.PasswordCard, error) {
	return u.passwordCardRepository.GetAll(ctx)
}

func (u *PasswordCardsUsecases) UpdatePasswordCard(ctx context.Context, id string, passwordCard domain.PasswordCard) error {
	passwordCard.Password = u.hash(passwordCard.Password)
	return u.passwordCardRepository.Update(ctx, id, passwordCard)
}

func (u *PasswordCardsUsecases) DeletePasswordCard(ctx context.Context, id string) error {
	return u.passwordCardRepository.Delete(ctx, id)
}
