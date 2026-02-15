package com.abhiraj.SponsorFlow.domain.dtos.request;

import com.abhiraj.SponsorFlow.domain.OfferStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OfferUpdateRequestDto {

    private OfferStatus offerStatus;

}
