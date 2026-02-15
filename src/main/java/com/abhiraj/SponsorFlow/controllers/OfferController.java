package com.abhiraj.SponsorFlow.controllers;

import com.abhiraj.SponsorFlow.domain.dtos.request.OfferRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.request.OfferUpdateRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.OfferResponseDto;
import com.abhiraj.SponsorFlow.services.OfferService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/offers")
@RequiredArgsConstructor
public class OfferController {

    private final OfferService offerService;

    @PostMapping
    public ResponseEntity<OfferResponseDto> createOffer(@Valid @RequestBody  OfferRequestDto offerRequestDto){
        return ResponseEntity.ok(offerService.createNewOffer(offerRequestDto));
    }

    @GetMapping
    public ResponseEntity<Page<OfferResponseDto>> listAllOffers(@RequestParam(required = false, defaultValue = "0") int pageNo,
                                                                @RequestParam(required = false, defaultValue = "5") int pageSize){

        Sort sort = Sort.by("amount").descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        return ResponseEntity.ok(offerService.getAllOffers(pageable));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<OfferResponseDto> updateStatus(@RequestBody OfferUpdateRequestDto offerUpdateRequestDto, @PathVariable Long id){
        return ResponseEntity.ok(offerService.updateOfferStatus(offerUpdateRequestDto, id));
    }

}
