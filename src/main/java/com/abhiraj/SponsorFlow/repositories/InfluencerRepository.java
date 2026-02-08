package com.abhiraj.SponsorFlow.repositories;

import com.abhiraj.SponsorFlow.domain.entities.Influencer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InfluencerRepository extends JpaRepository<Influencer, Long> {
}
