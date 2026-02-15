package com.abhiraj.SponsorFlow.services.impl;

import com.abhiraj.SponsorFlow.domain.OfferStatus;
import com.abhiraj.SponsorFlow.domain.dtos.request.OfferRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.request.OfferUpdateRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.OfferResponseDto;
import com.abhiraj.SponsorFlow.domain.entities.Brand;
import com.abhiraj.SponsorFlow.domain.entities.Influencer;
import com.abhiraj.SponsorFlow.domain.entities.Offer;
import com.abhiraj.SponsorFlow.exceptions.IllegalOfferChangeException;
import com.abhiraj.SponsorFlow.exceptions.InsufficientBalanceException;
import com.abhiraj.SponsorFlow.exceptions.UnauthorizedOfferAccessException;
import com.abhiraj.SponsorFlow.mappings.OfferMappings;
import com.abhiraj.SponsorFlow.repositories.BrandRepository;
import com.abhiraj.SponsorFlow.repositories.InfluencerRepository;
import com.abhiraj.SponsorFlow.repositories.OfferRepository;
import com.abhiraj.SponsorFlow.services.CurrentUserService;
import com.abhiraj.SponsorFlow.services.OfferService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Objects;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OfferServiceImpl implements OfferService {

    private final InfluencerRepository influencerRepository;
    private final BrandRepository brandRepository;
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
        brandRepository.save(currentBrand);

        Offer offer = offerMappings.requestToOffer(offerRequestDto, influencer, currentBrand);
        Offer savedOffer = offerRepository.save(offer);

        return offerMappings.offerToResponse(savedOffer);
    }

    @Override
    public Page<OfferResponseDto> getAllOffers(Pageable pageable) {
        if(currentUserService.isBrand()){
            Brand currentBrand = currentUserService.getCurrentBrand();
            return offerRepository.findByBrand(currentBrand, pageable)
                    .map(offerMappings::offerToResponse);
        }
        Influencer influencer = currentUserService.getCurrentInfluencer();
        return offerRepository.findByInfluencer(influencer, pageable)
                .map(offerMappings::offerToResponse);
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('INFLUENCER')")
    public OfferResponseDto updateOfferStatus(OfferUpdateRequestDto offerUpdateRequestDto, Long id) {

        Offer offer = offerRepository.findById(id).orElseThrow(() ->
                    new EntityNotFoundException("No offer with offer-id "+id)
                );

        Influencer currentInfluencer = currentUserService.getCurrentInfluencer();
        if(!Objects.equals(currentInfluencer.getId(), offer.getInfluencer().getId())){
            throw new UnauthorizedOfferAccessException("You cannot change the status of someone else's offer");
        }

        if(!offer.getOfferStatus().equals(OfferStatus.PENDING)){
            throw new IllegalOfferChangeException("You cannot change the offer status multiple times.");
        }

        offer.setOfferStatus(offerUpdateRequestDto.getOfferStatus());
        Offer savedOffer = offerRepository.save(offer);
        Brand brand = savedOffer.getBrand();
        brand.setReservedBudget(brand.getReservedBudget().subtract(savedOffer.getAmount()));
        if(savedOffer.getOfferStatus().equals(OfferStatus.ACCEPTED)) {
            brand.setTotalBudget(brand.getTotalBudget().subtract(savedOffer.getAmount()));
            currentInfluencer.setTotalEarnings(currentInfluencer.getTotalEarnings().add(savedOffer.getAmount()));
        }

        brandRepository.save(brand);
        influencerRepository.save(currentInfluencer);

        return offerMappings.offerToResponse(savedOffer);
    }

}
