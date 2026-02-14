package com.abhiraj.SponsorFlow.services;

import com.abhiraj.SponsorFlow.domain.dtos.request.InfluencerUpdateRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.InfluencerResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface InfluencerService {
    InfluencerResponseDto getById(Long id);

    Page<InfluencerResponseDto> getAllRegisteredInfluencers(Pageable pageable);

    InfluencerResponseDto getLoggedInUser();

    InfluencerResponseDto updateDetails(InfluencerUpdateRequestDto influencerUpdateRequestDto);
}
