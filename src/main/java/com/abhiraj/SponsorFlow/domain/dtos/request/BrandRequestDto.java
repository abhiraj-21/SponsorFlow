package com.abhiraj.SponsorFlow.domain.dtos.request;

import jakarta.validation.constraints.Min;
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
public class BrandRequestDto {

    @NotBlank(message = "name cannot be empty")
    private String name;

    @NotBlank(message = "password cannot be empty")
    private String password;

    @NotNull
    @Positive
    @Min(0)
    private Double totalBudget;

}
