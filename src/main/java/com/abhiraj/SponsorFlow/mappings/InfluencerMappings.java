package com.abhiraj.SponsorFlow.mappings;

import com.abhiraj.SponsorFlow.domain.dtos.request.InfluencerRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.request.InfluencerUpdateRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.InfluencerResponseDto;
import com.abhiraj.SponsorFlow.domain.entities.Influencer;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class InfluencerMappings {

    private final PasswordEncoder passwordEncoder;

    public Influencer requestToInfluencer(InfluencerRequestDto influencerRequestDto){
        return Influencer.builder()
                .engagementRate(influencerRequestDto.getEngagementRate())
                .followerCount(influencerRequestDto.getFollowerCount())
                .password(influencerRequestDto.getPassword())
                .username(influencerRequestDto.getUsername())
                .platform(influencerRequestDto.getPlatform())
                .build();
    }

    public InfluencerResponseDto influencerToResponse(Influencer influencer, boolean isOwner) {
        return InfluencerResponseDto.builder()
                .id(influencer.getId())
                .totalEarnings(isOwner ? influencer.getTotalEarnings() : null)
                .engagementRate(influencer.getEngagementRate())
                .followerCount(influencer.getFollowerCount())
                .platform(influencer.getPlatform())
                .username(influencer.getUsername())
                .build();
    }

    public void applyUpdates(Influencer influencer, InfluencerUpdateRequestDto influencerUpdateRequestDto){
        Double engagementRate = influencerUpdateRequestDto.getEngagementRate();
        Long followerCount = influencerUpdateRequestDto.getFollowerCount();

        if(engagementRate != null){
            influencer.setEngagementRate(engagementRate);
        }
        if(followerCount != null){
            influencer.setFollowerCount(followerCount);
        }

    }


}
