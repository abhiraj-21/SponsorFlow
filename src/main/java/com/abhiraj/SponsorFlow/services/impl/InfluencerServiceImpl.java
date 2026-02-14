package com.abhiraj.SponsorFlow.services.impl;

import com.abhiraj.SponsorFlow.domain.dtos.request.InfluencerUpdateRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.InfluencerResponseDto;
import com.abhiraj.SponsorFlow.domain.entities.Influencer;
import com.abhiraj.SponsorFlow.mappings.InfluencerMappings;
import com.abhiraj.SponsorFlow.repositories.InfluencerRepository;
import com.abhiraj.SponsorFlow.services.CurrentUserService;
import com.abhiraj.SponsorFlow.services.InfluencerService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class InfluencerServiceImpl implements InfluencerService {

    private final InfluencerRepository influencerRepository;
    private final InfluencerMappings influencerMappings;
    private final CurrentUserService currentUserService;

    @Override
    @PreAuthorize("hasRole('BRAND')")
    public InfluencerResponseDto getById(Long id) {
        Influencer influencer = influencerRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("No influencer with id" + id)
        );
        return influencerMappings.influencerToResponse(influencer, false);
    }

    @Override
    @PreAuthorize("hasRole('BRAND')")
    public Page<InfluencerResponseDto> getAllRegisteredInfluencers(Pageable pageable) {
        return influencerRepository.findAll(pageable)
                .map(influencer ->
                        influencerMappings.influencerToResponse(influencer, false)
                );
    }

    @Override
    @PreAuthorize("hasRole('INFLUENCER')")
    public InfluencerResponseDto getLoggedInUser() {
        return influencerMappings.influencerToResponse(currentUserService.getCurrentInfluencer(), true);
    }

    @Override
    @PreAuthorize("hasRole('INFLUENCER')")
    @Transactional
    public InfluencerResponseDto updateDetails(InfluencerUpdateRequestDto influencerUpdateRequestDto) {
        Influencer influencer = currentUserService.getCurrentInfluencer();
        influencerMappings.applyUpdates(influencer, influencerUpdateRequestDto);
        influencerRepository.save(influencer);
        return influencerMappings.influencerToResponse(influencer, true);
    }
}
