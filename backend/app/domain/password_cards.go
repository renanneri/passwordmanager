package domain

import "github.com/google/uuid"

type PasswordCard struct {
	ID       string `json:"id"`
	Name     string `json:"name" validate:"required"`
	Password string `json:"password" validate:"required"`
	Username string `json:"username" validate:"required"`
	URL      string `json:"url" valiedate:"required"`
}

func (p *PasswordCard) GenerateID() {
	p.ID = uuid.New().String()
}
