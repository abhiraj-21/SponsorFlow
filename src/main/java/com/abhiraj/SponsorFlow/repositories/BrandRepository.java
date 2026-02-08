package com.abhiraj.SponsorFlow.repositories;

import com.abhiraj.SponsorFlow.domain.entities.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
}
