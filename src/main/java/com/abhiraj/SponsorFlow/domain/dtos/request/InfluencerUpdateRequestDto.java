package com.abhiraj.SponsorFlow.domain.dtos.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class InfluencerUpdateRequestDto {

    @Positive
    private Long followerCount;

    @Positive
    @Max(100)
    private Double engagementRate;

}
