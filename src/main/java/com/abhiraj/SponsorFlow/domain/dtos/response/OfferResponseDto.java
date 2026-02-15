package com.abhiraj.SponsorFlow.domain.dtos.response;

import com.abhiraj.SponsorFlow.domain.OfferStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class OfferResponseDto {

    private String brandName;
    private String influencerName;
    private BigDecimal amount;
    private OfferStatus offerStatus;

}
