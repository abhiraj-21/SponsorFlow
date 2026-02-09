package com.abhiraj.SponsorFlow.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/health-check")
    public String healthCheck(){
        return "Working Fine.";
    }

}
