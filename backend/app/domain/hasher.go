package domain

import "crypto/sha256"

const CONCAT_PASSWORD = "MARACANÃ"

func Hash(password string) string {
	hasher := sha256.New()

	// ENCODED PASSWORD
	hasher.Write([]byte(password))
	bytesString := hasher.Sum(nil)
	passwordEncoded := string(bytesString)

	// ENCODED CONCAT PASSWORD
	hasher.Reset()
	hasher.Write([]byte(CONCAT_PASSWORD))
	bytesString = hasher.Sum(nil)
	concatPasswordEncoded := string(bytesString)

	// ENCODED CONCAT PASSWORD + PASSWORD
	hasher.Reset()
	hasher.Write([]byte(concatPasswordEncoded + passwordEncoded))
	bytesString = hasher.Sum(nil)

	return string(bytesString)
}
