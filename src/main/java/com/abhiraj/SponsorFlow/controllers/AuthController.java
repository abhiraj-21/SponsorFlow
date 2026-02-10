package com.abhiraj.SponsorFlow.controllers;

import com.abhiraj.SponsorFlow.domain.dtos.request.BrandRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.request.InfluencerRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.request.LoginRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.BrandResponseDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.InfluencerResponseDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.JwtResponseDto;
import com.abhiraj.SponsorFlow.services.AuthService;
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
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register/influencer")
    public ResponseEntity<InfluencerResponseDto> registerInfluencer(@Valid @RequestBody InfluencerRequestDto influencerRequestDto){
        return ResponseEntity.ok(authService.createNewInfluencer(influencerRequestDto));
    }

    @PostMapping("/register/brand")
    public ResponseEntity<BrandResponseDto> registerBrand(@Valid @RequestBody BrandRequestDto brandRequestDto){
        return ResponseEntity.ok(authService.createNewBrand(brandRequestDto));
    }

    @PostMapping("/login/influencer")
    public ResponseEntity<JwtResponseDto> loginInfluencer(@RequestBody LoginRequestDto loginRequestDto){
        return ResponseEntity.ok(authService.verifyInfluencer(loginRequestDto));
    }

    @PostMapping("/login/brand")
    public ResponseEntity<JwtResponseDto> loginBrand(@RequestBody LoginRequestDto loginRequestDto){
        return ResponseEntity.ok(authService.verifyBrand(loginRequestDto));
    }

}
