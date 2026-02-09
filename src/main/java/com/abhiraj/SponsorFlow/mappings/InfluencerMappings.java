package com.abhiraj.SponsorFlow.mappings;

import com.abhiraj.SponsorFlow.domain.dtos.request.InfluencerRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.InfluencerResponseDto;
import com.abhiraj.SponsorFlow.domain.entities.Influencer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class InfluencerMappings {

    public Influencer requestToInfluencer(InfluencerRequestDto influencerRequestDto){
        return Influencer.builder()
                .engagementRate(influencerRequestDto.getEngagementRate())
                .followerCount(influencerRequestDto.getFollowerCount())
                .password(influencerRequestDto.getPassword())
                .username(influencerRequestDto.getUsername())
                .platform(influencerRequestDto.getPlatform())
                .build();
    }

    public InfluencerResponseDto influencerToResponse(Influencer influencer) {
        return InfluencerResponseDto.builder()
                .id(influencer.getId())
                .totalEarnings(influencer.getTotalEarnings())
                .engagementRate(influencer.getEngagementRate())
                .followerCount(influencer.getFollowerCount())
                .platform(influencer.getPlatform())
                .username(influencer.getUsername())
                .build();
    }
}
