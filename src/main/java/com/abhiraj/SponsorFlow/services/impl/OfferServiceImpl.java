package com.abhiraj.SponsorFlow.services.impl;

import com.abhiraj.SponsorFlow.domain.dtos.request.OfferRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.OfferResponseDto;
import com.abhiraj.SponsorFlow.domain.entities.Brand;
import com.abhiraj.SponsorFlow.domain.entities.Influencer;
import com.abhiraj.SponsorFlow.domain.entities.Offer;
import com.abhiraj.SponsorFlow.exceptions.InsufficientBalanceException;
import com.abhiraj.SponsorFlow.mappings.OfferMappings;
import com.abhiraj.SponsorFlow.repositories.InfluencerRepository;
import com.abhiraj.SponsorFlow.repositories.OfferRepository;
import com.abhiraj.SponsorFlow.services.CurrentUserService;
import com.abhiraj.SponsorFlow.services.OfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OfferServiceImpl implements OfferService {

    private final InfluencerRepository influencerRepository;
    private final CurrentUserService currentUserService;
    private final OfferMappings offerMappings;
    private final OfferRepository offerRepository;

    @Override
    @Transactional
    @PreAuthorize("hasRole('BRAND')")
    public OfferResponseDto createNewOffer(OfferRequestDto offerRequestDto) {

        Brand currentBrand = currentUserService.getCurrentBrand();
        if(offerRequestDto.getAmount().compareTo(currentBrand.getAvailableBudget()) > 0){
            throw new InsufficientBalanceException("Offer amount cannot exceed available budget.");
        }

        Influencer influencer = influencerRepository.findByUsername(offerRequestDto.getInfluencerName()).orElseThrow(() ->
                new UsernameNotFoundException("No influencer with username: " + offerRequestDto.getInfluencerName())
        );

        BigDecimal newReservedBudget = currentBrand.getReservedBudget().add(offerRequestDto.getAmount());
        currentBrand.setReservedBudget(newReservedBudget);

        Offer offer = offerMappings.requestToOffer(offerRequestDto, influencer, currentBrand);
        Offer savedOffer = offerRepository.save(offer);

        return offerMappings.offerToResponse(savedOffer);
    }

}
