package com.abhiraj.SponsorFlow.domain.entities;

import com.abhiraj.SponsorFlow.domain.OfferStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "offer")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    @ToString.Exclude
    private Brand brand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "influencer_id", nullable = false)
    @ToString.Exclude
    private Influencer influencer;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OfferStatus offerStatus;

    @PrePersist
    public void onCreate(){
        this.offerStatus = OfferStatus.PENDING;
    }

}
