package domain

import (
	"encoding/base64"
)

const KEY = "AGENERALKEYFORALLPASSWORDS123456"

func Encrypt(password string) (string, error) {
	return base64.StdEncoding.EncodeToString([]byte(password)), nil
}
