package external

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

const file string = "passwordmanager.db"

func ConnectToDB() *sql.DB {
	db, err := sql.Open("sqlite3", file)
	if err != nil {
		log.Fatal(err)
	}

	return db
}
