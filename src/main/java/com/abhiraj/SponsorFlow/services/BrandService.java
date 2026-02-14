package com.abhiraj.SponsorFlow.services;

import com.abhiraj.SponsorFlow.domain.dtos.request.BrandUpdateRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.BrandResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface BrandService {
    BrandResponseDto getById(Long id);

    BrandResponseDto getLoggedInBrand();

    Page<BrandResponseDto> findAllBrands(Pageable pageable);

    BrandResponseDto updateDetails(BrandUpdateRequestDto brandUpdateRequestDto);
}
