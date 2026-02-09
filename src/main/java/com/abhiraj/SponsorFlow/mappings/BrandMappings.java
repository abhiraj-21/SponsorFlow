package com.abhiraj.SponsorFlow.mappings;

import com.abhiraj.SponsorFlow.domain.dtos.request.BrandRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.BrandResponseDto;
import com.abhiraj.SponsorFlow.domain.entities.Brand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class BrandMappings {

    public Brand requestToBrand(BrandRequestDto brandRequestDto){
        return Brand.builder()
                .name(brandRequestDto.getName())
                .totalBudget(brandRequestDto.getTotalBudget())
                .password(brandRequestDto.getPassword())
                .build();
    }

    public BrandResponseDto brandToResponse(Brand brand) {
        return BrandResponseDto.builder()
                .id(brand.getId())
                .availableBudget(brand.getAvailableBudget())
                .name(brand.getName())
                .build();
    }
}
