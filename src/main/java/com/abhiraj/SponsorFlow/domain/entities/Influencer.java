package com.abhiraj.SponsorFlow.domain.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "influencer")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Influencer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, updatable = false)
    private String role;

    @Column(nullable = false)
    private String platform;

    @Column(nullable = false)
    private Long followerCount;

    @Column(nullable = false)
    private Double engagementRate;

    @Column(nullable = false)
    private Double totalEarnings;

    @OneToMany(mappedBy = "influencer")
    @Builder.Default
    @ToString.Exclude
    private List<Offer> offers = new ArrayList<>();

    @PrePersist
    public void onCreate(){
        if(this.totalEarnings == null){
            this.totalEarnings = 0.0;
        }
        if(this.role == null){
            this.role = "ROLE_INFLUENCER";
        }
    }

}
