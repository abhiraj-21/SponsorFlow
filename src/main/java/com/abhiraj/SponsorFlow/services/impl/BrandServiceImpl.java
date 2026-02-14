package com.abhiraj.SponsorFlow.services.impl;

import com.abhiraj.SponsorFlow.domain.dtos.request.BrandUpdateRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.BrandResponseDto;
import com.abhiraj.SponsorFlow.domain.entities.Brand;
import com.abhiraj.SponsorFlow.mappings.BrandMappings;
import com.abhiraj.SponsorFlow.repositories.BrandRepository;
import com.abhiraj.SponsorFlow.services.BrandService;
import com.abhiraj.SponsorFlow.services.CurrentUserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;
    private final BrandMappings brandMappings;
    private final CurrentUserService currentUserService;

    @Override
    public BrandResponseDto getById(Long id) {
        Brand brand = brandRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("No brand with id "+id)
        );
        return brandMappings.brandToResponse(brand, false);
    }

    @Override
    public BrandResponseDto getLoggedInBrand() {
        return brandMappings.brandToResponse(currentUserService.getCurrentBrand(), true);
    }

    @Override
    public Page<BrandResponseDto> findAllBrands(Pageable pageable) {
        return brandRepository.findAll(pageable)
                .map(brand ->
                        brandMappings.brandToResponse(brand, false)
                );
    }

    @Override
    @Transactional
    public BrandResponseDto updateDetails(BrandUpdateRequestDto brandUpdateRequestDto) {
        Brand currentBrand = currentUserService.getCurrentBrand();
        brandMappings.updateDetails(currentBrand, brandUpdateRequestDto);
        Brand savedBrand = brandRepository.save(currentBrand);
        return brandMappings.brandToResponse(savedBrand, true);
    }


}
