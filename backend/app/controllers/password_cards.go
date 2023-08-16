package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/renanneri/passmanager/backend/app/domain"
	"github.com/renanneri/passmanager/backend/app/usecases"
)

var Validate *validator.Validate

type PasswordCardsController struct {
	passwordUsecases *usecases.PasswordCardsUsecases
}

func NewPasswordCardsController(passwordUsecases *usecases.PasswordCardsUsecases) *PasswordCardsController {
	return &PasswordCardsController{
		passwordUsecases: passwordUsecases,
	}
}

func (c *PasswordCardsController) GetPasswordCards(ctx *gin.Context) {
	response, err := c.passwordUsecases.GetPasswordCards(ctx)

	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, response)
}

func (c *PasswordCardsController) CreatePasswordCard(ctx *gin.Context) {
	var body domain.PasswordCard
	err := ctx.ShouldBindJSON(&body)

	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	err = Validate.Struct(body)
	validationErrors := err.(validator.ValidationErrors)

	if len(validationErrors) > 0 {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, map[string]string{"error": validationErrors.Error()})
		return
	}

	err = c.passwordUsecases.CreatePasswordCard(ctx, body)

	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, map[string]string{"message": "Password card created successfully"})
}

func (c *PasswordCardsController) UpdatePasswordCard(ctx *gin.Context) {
	var body domain.PasswordCard
	err := ctx.ShouldBindJSON(&body)

	if err != nil {
		customError := fmt.Errorf("invalid body")
		ctx.AbortWithStatusJSON(http.StatusBadRequest, map[string]string{"error": customError.Error()})
		return
	}

	err = Validate.Struct(body)
	validationErrors := err.(validator.ValidationErrors)

	if len(validationErrors) > 0 {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, map[string]string{"error": validationErrors.Error()})
		return
	}

	err = c.passwordUsecases.UpdatePasswordCard(ctx, ctx.Param("id"), body)

	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, map[string]string{"message": "Password card updated successfully"})
}

func (c *PasswordCardsController) DeletePasswordCard(ctx *gin.Context) {
	err := c.passwordUsecases.DeletePasswordCard(ctx, ctx.Param("id"))

	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, map[string]string{"message": "Password card deleted successfully"})
}
