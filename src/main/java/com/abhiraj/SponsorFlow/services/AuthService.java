package com.abhiraj.SponsorFlow.services;

import com.abhiraj.SponsorFlow.domain.dtos.request.BrandRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.request.InfluencerRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.request.LoginRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.BrandResponseDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.InfluencerResponseDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.JwtResponseDto;

public interface AuthService {
    InfluencerResponseDto createNewInfluencer(InfluencerRequestDto influencerRequestDto);

    BrandResponseDto createNewBrand(BrandRequestDto brandRequestDto);

    JwtResponseDto verifyInfluencer(LoginRequestDto loginRequestDto);

    JwtResponseDto verifyBrand(LoginRequestDto loginRequestDto);
}
