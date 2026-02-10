package com.abhiraj.SponsorFlow.security;

import com.abhiraj.SponsorFlow.domain.entities.Brand;
import com.abhiraj.SponsorFlow.domain.entities.Influencer;
import com.abhiraj.SponsorFlow.repositories.BrandRepository;
import com.abhiraj.SponsorFlow.repositories.InfluencerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final InfluencerRepository influencerRepository;
    private final BrandRepository brandRepository;

    @Override
    public UserDetails loadUserByUsername(String identity) {

        if (identity.startsWith("INFLUENCER:")) {
            String username = identity.substring("INFLUENCER:".length());
            Influencer influencer = influencerRepository.findByUsername(username)
                    .orElseThrow(() ->
                            new UsernameNotFoundException("Influencer not found"));
            return new SecurityUser(influencer);
        }

        if (identity.startsWith("BRAND:")) {
            String name = identity.substring("BRAND:".length());
            Brand brand = brandRepository.findByName(name)
                    .orElseThrow(() ->
                            new UsernameNotFoundException("Brand not found"));
            return new SecurityUser(brand);
        }

        throw new UsernameNotFoundException("Invalid identity format");
    }
}