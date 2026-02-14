package com.abhiraj.SponsorFlow.mappings;

import com.abhiraj.SponsorFlow.domain.dtos.request.BrandRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.request.BrandUpdateRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.BrandResponseDto;
import com.abhiraj.SponsorFlow.domain.entities.Brand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

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

    public BrandResponseDto brandToResponse(Brand brand, boolean isOwner) {
        return BrandResponseDto.builder()
                .id(brand.getId())
                .availableBudget(isOwner ? brand.getAvailableBudget() : null)
                .name(brand.getName())
                .build();
    }

    public void updateDetails(Brand brand, BrandUpdateRequestDto brandUpdateRequestDto){
        BigDecimal totalBudget = brandUpdateRequestDto.getTotalBudget();
        if(totalBudget != null){
            brand.setTotalBudget(brand.getTotalBudget().add(totalBudget));
        }
    }
}
