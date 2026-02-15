package com.abhiraj.SponsorFlow.controllers;

import com.abhiraj.SponsorFlow.domain.dtos.request.BrandRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.request.InfluencerRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.request.LoginRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.BrandResponseDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.InfluencerResponseDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.JwtResponseDto;
import com.abhiraj.SponsorFlow.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(
        name="Authentication",
        description = "Handles registration and login operations for Brands and Influencers using JWT-based stateless authentication."
)
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register/influencer")
    @Operation(summary = "Register a new Influencer account with encrypted credentials.")
    public ResponseEntity<InfluencerResponseDto> registerInfluencer(@Valid @RequestBody InfluencerRequestDto influencerRequestDto){
        return ResponseEntity.ok(authService.createNewInfluencer(influencerRequestDto));
    }

    @PostMapping("/register/brand")
    @Operation(summary = "Register a new Brand account and initialize financial profile.")
    public ResponseEntity<BrandResponseDto> registerBrand(@Valid @RequestBody BrandRequestDto brandRequestDto){
        return ResponseEntity.ok(authService.createNewBrand(brandRequestDto));
    }

    @PostMapping("/login/influencer")
    @Operation(summary = "Authenticate Influencer and generate JWT access token.")
    public ResponseEntity<JwtResponseDto> loginInfluencer(@RequestBody LoginRequestDto loginRequestDto){
        return ResponseEntity.ok(authService.verifyInfluencer(loginRequestDto));
    }

    @PostMapping("/login/brand")
    @Operation(summary = "Authenticate Brand and generate JWT access token.")
    public ResponseEntity<JwtResponseDto> loginBrand(@RequestBody LoginRequestDto loginRequestDto){
        return ResponseEntity.ok(authService.verifyBrand(loginRequestDto));
    }

}
