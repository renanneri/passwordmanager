package usecases

import (
	"context"

	"github.com/renanneri/passmanager/backend/app/domain"
)

type PasswordCardRepository interface {
	Create(ctx context.Context, passwordCard domain.PasswordCard) error
	GetAll(ctx context.Context) ([]domain.PasswordCard, error)
	Update(ctx context.Context, id string, passwordCard domain.PasswordCard) error
	Delete(ctx context.Context, id string) error
}

type Hasher func(password string) string
