package com.abhiraj.SponsorFlow.repositories;

import com.abhiraj.SponsorFlow.domain.entities.Brand;
import com.abhiraj.SponsorFlow.domain.entities.Influencer;
import com.abhiraj.SponsorFlow.domain.entities.Offer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

    Page<Offer> findByBrand(Brand brand, Pageable pageable);
    Page<Offer> findByInfluencer(Influencer influencer, Pageable pageable);

}
