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

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final InfluencerRepository influencerRepository;
    private final BrandRepository brandRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Influencer> influencer = influencerRepository.findByUsername(username);
        if(influencer.isPresent()){
            return new SecurityUser(influencer.get());
        }

        Optional<Brand> brand = brandRepository.findByName(username);
        if(brand.isPresent()){
            return new SecurityUser(brand.get());
        }

        throw new UsernameNotFoundException("No influencer or brand with username "+username);
    }
}
