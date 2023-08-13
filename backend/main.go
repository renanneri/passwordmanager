package main

import (
	"github.com/gin-gonic/gin"

	"github.com/renanneri/passmanager/backend/app/controllers"
	"github.com/renanneri/passmanager/backend/app/domain"
	"github.com/renanneri/passmanager/backend/app/external"
	"github.com/renanneri/passmanager/backend/app/usecases"
)

func main() {
	// database
	db := external.ConnectToDB()
	defer db.Close()

	// depency injection
	passwordUsecases := usecases.NewPasswordCardsUsecases(
		external.NewPasswordCardsRepository(db),
		domain.Hash,
	)

	controller := controllers.NewPasswordCardsController(passwordUsecases)

	// router
	router := gin.Default()
	passwordCards := router.Group("/password-cards")

	passwordCards.PUT("/:id", controller.UpdatePasswordCard)
	passwordCards.DELETE("/:id", controller.DeletePasswordCard)
	passwordCards.GET("", controller.GetPasswordCards)
	passwordCards.POST("", controller.CreatePasswordCard)

	router.Run()
}
