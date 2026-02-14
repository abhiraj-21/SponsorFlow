package com.abhiraj.SponsorFlow.controllers;

import com.abhiraj.SponsorFlow.domain.dtos.request.BrandUpdateRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.BrandResponseDto;
import com.abhiraj.SponsorFlow.services.BrandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/brand")
@RequiredArgsConstructor
public class BrandController {

    private final BrandService brandService;

    @GetMapping("/{id}")
    public ResponseEntity<BrandResponseDto> getBrandById(@PathVariable Long id){
        return ResponseEntity.ok(brandService.getById(id));
    }

    @GetMapping("/me")
    public ResponseEntity<BrandResponseDto> getMyBrandProfile(){
        return ResponseEntity.ok(brandService.getLoggedInBrand());
    }

    @GetMapping
    public ResponseEntity<Page<BrandResponseDto>> getAllBrands(@RequestParam(required = false, defaultValue = "0") int pageNo,
                                                               @RequestParam(required = false, defaultValue = "5") int pageSize,
                                                               @RequestParam(required = false, defaultValue = "name") String sortBy,
                                                               @RequestParam(required = false, defaultValue = "asc") String sortOrder){

        Sort sort = null;
        if(sortOrder.equalsIgnoreCase("asc")){
            sort = Sort.by(sortBy).ascending();
        }else{
            sort = Sort.by(sortBy).descending();
        }
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        return ResponseEntity.ok(brandService.findAllBrands(pageable));

    }

    @PatchMapping("/me")
    public ResponseEntity<BrandResponseDto> updateBrandDetails(@Valid @RequestBody BrandUpdateRequestDto brandUpdateRequestDto){
        return ResponseEntity.ok(brandService.updateDetails(brandUpdateRequestDto));
    }

}
