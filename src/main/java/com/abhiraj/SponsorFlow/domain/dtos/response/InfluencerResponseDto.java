package com.abhiraj.SponsorFlow.domain.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InfluencerResponseDto {

    private Long id;
    private String username;
    private String platform;
    private Long followerCount;
    private Double engagementRate;
    private Double totalEarnings;

}
