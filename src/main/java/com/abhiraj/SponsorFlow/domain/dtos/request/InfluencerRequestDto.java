package com.abhiraj.SponsorFlow.domain.dtos.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class InfluencerRequestDto {

    @NotBlank(message = "username cannot be empty")
    private String username;

    @NotBlank(message = "password cannot be empty")
    private String password;

    @NotBlank(message = "platform cannot be empty")
    private String platform;

    @NotNull
    @Positive
    private Long followerCount;

    @NotNull
    @Positive
    @Max(100)
    private Double engagementRate;

}
