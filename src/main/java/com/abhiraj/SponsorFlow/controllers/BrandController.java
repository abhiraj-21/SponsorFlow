package com.abhiraj.SponsorFlow.controllers;

import com.abhiraj.SponsorFlow.domain.dtos.request.BrandUpdateRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.BrandResponseDto;
import com.abhiraj.SponsorFlow.services.BrandService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(
        name = "Brand Management",
        description = "Endpoints for managing Brand profiles and financial budgets."
)
public class BrandController {

    private final BrandService brandService;

    @GetMapping("/{id}")
    @Operation(summary = "Retrieve public profile details of a specific Brand.")
    public ResponseEntity<BrandResponseDto> getBrandById(@PathVariable Long id){
        return ResponseEntity.ok(brandService.getById(id));
    }

    @GetMapping("/me")
    @Operation(summary = "Retrieve authenticated Brand profile including financial data.")
    public ResponseEntity<BrandResponseDto> getMyBrandProfile(){
        return ResponseEntity.ok(brandService.getLoggedInBrand());
    }

    @GetMapping
    @Operation(summary = "Retrieve paginated and sortable list of registered Brands.")
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
    @Operation(summary = "Increase the total budget allocated for sponsorship activities.")
    public ResponseEntity<BrandResponseDto> updateBrandDetails(@Valid @RequestBody BrandUpdateRequestDto brandUpdateRequestDto){
        return ResponseEntity.ok(brandService.updateDetails(brandUpdateRequestDto));
    }

}
