package com.abhiraj.SponsorFlow.services.impl;

import com.abhiraj.SponsorFlow.domain.dtos.request.BrandRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.request.InfluencerRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.request.LoginRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.BrandResponseDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.InfluencerResponseDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.JwtResponseDto;
import com.abhiraj.SponsorFlow.domain.entities.Brand;
import com.abhiraj.SponsorFlow.domain.entities.Influencer;
import com.abhiraj.SponsorFlow.jwt.JwtService;
import com.abhiraj.SponsorFlow.mappings.BrandMappings;
import com.abhiraj.SponsorFlow.mappings.InfluencerMappings;
import com.abhiraj.SponsorFlow.repositories.BrandRepository;
import com.abhiraj.SponsorFlow.repositories.InfluencerRepository;
import com.abhiraj.SponsorFlow.security.SecurityUser;
import com.abhiraj.SponsorFlow.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final BrandRepository brandRepository;
    private final BrandMappings brandMappings;
    private final InfluencerMappings influencerMappings;
    private final InfluencerRepository influencerRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    @Transactional
    public InfluencerResponseDto createNewInfluencer(InfluencerRequestDto influencerRequestDto) {
        Influencer influencer = influencerMappings.requestToInfluencer(influencerRequestDto);
        influencer.setPassword(passwordEncoder.encode(influencer.getPassword()));
        Influencer savedInfluencer = influencerRepository.save(influencer);
        return influencerMappings.influencerToResponse(savedInfluencer);
    }

    @Override
    @Transactional
    public BrandResponseDto createNewBrand(BrandRequestDto brandRequestDto) {
        Brand brand = brandMappings.requestToBrand(brandRequestDto);
        brand.setPassword(passwordEncoder.encode(brand.getPassword()));
        Brand savedBrand = brandRepository.save(brand);
        return brandMappings.brandToResponse(savedBrand);
    }

    @Override
    @Transactional
    public JwtResponseDto verifyInfluencer(LoginRequestDto loginRequestDto) {
        String identity = "INFLUENCER:" + loginRequestDto.getName();
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        identity,
                        loginRequestDto.getPassword()
                )
        );
        SecurityUser securityUser = (SecurityUser) authentication.getPrincipal();
        return jwtService.generateToken(securityUser);
    }

    @Override
    @Transactional
    public JwtResponseDto verifyBrand(LoginRequestDto loginRequestDto) {
        String identity = "BRAND:" + loginRequestDto.getName();
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        identity,
                        loginRequestDto.getPassword()
                )
        );
        SecurityUser securityUser = (SecurityUser) authentication.getPrincipal();
        return jwtService.generateToken(securityUser);
    }
}
