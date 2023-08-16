package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"

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
		domain.Encrypt,
	)

	controller := controllers.NewPasswordCardsController(passwordUsecases)

	controllers.Validate = validator.New()

	// router
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://127.0.0.1:5173"},
		AllowMethods: []string{"PUT", "POST", "GET", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Type"},
	}))
	passwordCards := router.Group("/password-cards")

	passwordCards.PUT("/:id", controller.UpdatePasswordCard)
	passwordCards.DELETE("/:id", controller.DeletePasswordCard)
	passwordCards.GET("", controller.GetPasswordCards)
	passwordCards.POST("", controller.CreatePasswordCard)

	router.Run()
}
