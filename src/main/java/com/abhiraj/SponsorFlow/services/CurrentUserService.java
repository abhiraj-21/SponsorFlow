package com.abhiraj.SponsorFlow.services;

import com.abhiraj.SponsorFlow.domain.entities.Brand;
import com.abhiraj.SponsorFlow.domain.entities.Influencer;
import com.abhiraj.SponsorFlow.repositories.BrandRepository;
import com.abhiraj.SponsorFlow.repositories.InfluencerRepository;
import com.abhiraj.SponsorFlow.security.SecurityUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CurrentUserService {

    private final InfluencerRepository influencerRepository;
    private final BrandRepository brandRepository;

    private String getIdentity() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            throw new RuntimeException("Unauthenticated");
        }

        return auth.getName();
    }

    public Influencer getCurrentInfluencer() {
        String identity = getIdentity();

        if (!identity.startsWith("INFLUENCER:")) {
            throw new RuntimeException("Not an influencer");
        }

        String username = identity.substring("INFLUENCER:".length());
        return influencerRepository.findByUsername(username)
                .orElseThrow();
    }

    public Brand getCurrentBrand() {
        String identity = getIdentity();

        if (!identity.startsWith("BRAND:")) {
            throw new RuntimeException("Not a brand");
        }

        String name = identity.substring("BRAND:".length());
        return brandRepository.findByName(name)
                .orElseThrow();
    }
}