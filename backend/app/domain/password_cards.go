package domain

import "github.com/google/uuid"

type PasswordCard struct {
	ID       string `json:"id" db:"id"`
	Name     string `json:"name" db:"name"`
	Password string `json:"password" db:"password"`
	Username string `json:"username" db:"username"`
	URL      string `json:"url" db:"url"`
}

func (p *PasswordCard) GenerateID() {
	p.ID = uuid.New().String()
}
