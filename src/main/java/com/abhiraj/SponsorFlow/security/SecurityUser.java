package com.abhiraj.SponsorFlow.security;

import com.abhiraj.SponsorFlow.domain.entities.Brand;
import com.abhiraj.SponsorFlow.domain.entities.Influencer;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@Data
public class SecurityUser implements UserDetails {

    private String username;
    private String password;
    private String role;


    SecurityUser(Influencer influencer){
        this.password = influencer.getPassword();
        this.role = influencer.getRole();
        this.username = influencer.getUsername();
    }

    SecurityUser(Brand brand){
        this.role = brand.getRole();
        this.username = brand.getName();
        this.password = brand.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }
}
