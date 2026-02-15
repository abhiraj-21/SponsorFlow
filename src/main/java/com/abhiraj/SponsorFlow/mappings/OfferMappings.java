package com.abhiraj.SponsorFlow.mappings;

import com.abhiraj.SponsorFlow.domain.OfferStatus;
import com.abhiraj.SponsorFlow.domain.dtos.request.OfferRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.OfferResponseDto;
import com.abhiraj.SponsorFlow.domain.entities.Brand;
import com.abhiraj.SponsorFlow.domain.entities.Influencer;
import com.abhiraj.SponsorFlow.domain.entities.Offer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class OfferMappings {

    public Offer requestToOffer(OfferRequestDto offerRequestDto, Influencer influencer, Brand brand){
        return Offer.builder()
                .amount(offerRequestDto.getAmount())
                .brand(brand)
                .offerStatus(OfferStatus.PENDING)
                .influencer(influencer)
                .build();
    }

    public OfferResponseDto offerToResponse(Offer offer){
        return OfferResponseDto.builder()
                .amount(offer.getAmount())
                .offerStatus(offer.getOfferStatus())
                .brandName(offer.getBrand().getName())
                .influencerName(offer.getInfluencer().getUsername())
                .build();
    }

}
