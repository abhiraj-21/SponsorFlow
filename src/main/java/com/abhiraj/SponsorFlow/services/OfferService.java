package com.abhiraj.SponsorFlow.services;

import com.abhiraj.SponsorFlow.domain.dtos.request.OfferRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.OfferResponseDto;

public interface OfferService {
    OfferResponseDto createNewOffer(OfferRequestDto offerRequestDto);
}
