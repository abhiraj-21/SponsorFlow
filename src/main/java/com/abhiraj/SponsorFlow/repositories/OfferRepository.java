package com.abhiraj.SponsorFlow.repositories;

import com.abhiraj.SponsorFlow.domain.entities.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
}
