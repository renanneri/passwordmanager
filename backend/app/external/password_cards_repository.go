package external

import (
	"context"
	"database/sql"

	"github.com/renanneri/passmanager/backend/app/domain"
)

type PasswordCardsRepository struct {
	db *sql.DB
}

func NewPasswordCardsRepository(db *sql.DB) *PasswordCardsRepository {
	return &PasswordCardsRepository{db}
}

func (r *PasswordCardsRepository) Create(ctx context.Context, passwordCard domain.PasswordCard) error {

	query := `INSERT INTO password_cards (id, name, username, password, url) VALUES ($1, $2, $3, $4, $5)`

	_, err := r.db.ExecContext(ctx, query, passwordCard.ID, passwordCard.Name, passwordCard.Username, passwordCard.Password, passwordCard.URL)

	if err != nil {
		return err
	}

	return nil
}

func (r *PasswordCardsRepository) GetAll(ctx context.Context) ([]domain.PasswordCard, error) {

	query := `SELECT id, name, username, password, url FROM password_cards`

	rows, err := r.db.QueryContext(ctx, query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var passwordCards = []domain.PasswordCard{}

	for rows.Next() {
		var passwordCard domain.PasswordCard
		err := rows.Scan(&passwordCard.ID, &passwordCard.Name, &passwordCard.Username, &passwordCard.Password, &passwordCard.URL)
		if err != nil {
			return nil, err
		}

		passwordCards = append(passwordCards, passwordCard)
	}

	return passwordCards, nil

}

func (r *PasswordCardsRepository) Update(ctx context.Context, id string, passwordCard domain.PasswordCard) error {

	query := `UPDATE password_cards SET name=$1, username=$2, password=$3, url=$4 WHERE id=$5`

	_, err := r.db.ExecContext(ctx, query, passwordCard.Name, passwordCard.Username, passwordCard.Password, passwordCard.URL, id)

	if err != nil {
		return err
	}

	return nil
}

func (r *PasswordCardsRepository) Delete(ctx context.Context, id string) error {

	query := `DELETE FROM password_cards WHERE id=$1`

	_, err := r.db.ExecContext(ctx, query, id)

	if err != nil {
		return err
	}

	return nil
}
