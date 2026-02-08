package com.abhiraj.SponsorFlow.domain.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "brand")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, updatable = false)
    private String role;

    @Column(nullable = false)
    private Double totalBudget;

    @Column(nullable = false)
    private Double reservedBudget;

    @OneToMany(mappedBy = "brand")
    @ToString.Exclude
    @Builder.Default
    private List<Offer> offers = new ArrayList<>();

    //@Transient would not create a database column but would allow us to use getAvailableBudget() method whenever needed
    @Transient
    public Double getAvailableBudget(){
        return this.totalBudget - (this.reservedBudget != null ? this.reservedBudget : 0.0);
    }

    @PrePersist
    public void onCreate(){
        this.reservedBudget = 0.0;
        if(this.role == null){
            this.role = "ROLE_BRAND";
        }
    }

}
