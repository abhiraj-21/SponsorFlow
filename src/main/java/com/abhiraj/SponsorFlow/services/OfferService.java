package com.abhiraj.SponsorFlow.services;

import com.abhiraj.SponsorFlow.domain.dtos.request.OfferRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.request.OfferUpdateRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.OfferResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OfferService {
    OfferResponseDto createNewOffer(OfferRequestDto offerRequestDto);

    Page<OfferResponseDto> getAllOffers(Pageable pageable);

    OfferResponseDto updateOfferStatus(OfferUpdateRequestDto offerUpdateRequestDto, Long id);
}
