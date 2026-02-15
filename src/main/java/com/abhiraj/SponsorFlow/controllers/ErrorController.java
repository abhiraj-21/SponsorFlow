package com.abhiraj.SponsorFlow.controllers;

import com.abhiraj.SponsorFlow.domain.dtos.ApiErrorResponse;
import com.abhiraj.SponsorFlow.exceptions.IllegalOfferChangeException;
import com.abhiraj.SponsorFlow.exceptions.InsufficientBalanceException;
import com.abhiraj.SponsorFlow.exceptions.UnauthorizedOfferAccessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class ErrorController {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleException(Exception ex){
        log.error("Caught exception: ",ex);
        ApiErrorResponse error = ApiErrorResponse.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message(ex.getMessage())
                .build();
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(InsufficientBalanceException.class)
    public ResponseEntity<ApiErrorResponse> handleInsufficientBalanceException(InsufficientBalanceException ex){
        log.error("Caught exception: ",ex);
        ApiErrorResponse error = ApiErrorResponse.builder()
                .status(HttpStatus.CONFLICT.value())
                .message(ex.getMessage())
                .build();
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UnauthorizedOfferAccessException.class)
    public ResponseEntity<ApiErrorResponse> handleUnauthorizedOfferAccessException(UnauthorizedOfferAccessException ex){
        log.error("Caught exception:", ex);
        ApiErrorResponse error = ApiErrorResponse.builder()
                .message(ex.getMessage())
                .status(HttpStatus.FORBIDDEN.value())
                .build();
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(IllegalOfferChangeException.class)
    public ResponseEntity<ApiErrorResponse> handleIllegalOfferChangeException(IllegalOfferChangeException ex){
        log.error("Caught exception: ",ex);
        ApiErrorResponse error = ApiErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message(ex.getMessage())
                .build();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

}
