package com.abhiraj.SponsorFlow.domain.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OfferRequestDto {

    @NotBlank(message = "You have to specify the influencer name")
    private String influencerName;

    @Positive
    @NotNull(message = "Amount cannot be null")
    private BigDecimal amount;

}
