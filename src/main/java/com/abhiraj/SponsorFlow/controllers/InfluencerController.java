package com.abhiraj.SponsorFlow.controllers;

import com.abhiraj.SponsorFlow.domain.dtos.request.InfluencerUpdateRequestDto;
import com.abhiraj.SponsorFlow.domain.dtos.response.InfluencerResponseDto;
import com.abhiraj.SponsorFlow.services.InfluencerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/influencer")
@RequiredArgsConstructor
public class InfluencerController {

    private final InfluencerService influencerService;

    @GetMapping("/{id}")
    public ResponseEntity<InfluencerResponseDto> getInfluencerById(@PathVariable Long id){
        return ResponseEntity.ok(influencerService.getById(id));
    }

    @GetMapping
    public ResponseEntity<Page<InfluencerResponseDto>> getAllInfluencers(@RequestParam(required = false, defaultValue = "0") int pageNo,
                                                                         @RequestParam(required = false, defaultValue = "5") int pageSize,
                                                                         @RequestParam(required = false, defaultValue = "followerCount") String sortBy,
                                                                         @RequestParam(required = false, defaultValue = "desc") String sortOrder){
        Sort sort = null;
        if(sortOrder.equalsIgnoreCase("ASC")){
            sort = Sort.by(sortBy).ascending();
        }else{
            sort = Sort.by(sortBy).descending();
        }

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        return ResponseEntity.ok(influencerService.getAllRegisteredInfluencers(pageable));
    }

    @GetMapping("/me")
    public ResponseEntity<InfluencerResponseDto> getMyProfile(){
        return ResponseEntity.ok(influencerService.getLoggedInUser());
    }

    @PatchMapping("/me")
    public ResponseEntity<InfluencerResponseDto> updateInfluencerDetails(@Valid @RequestBody InfluencerUpdateRequestDto influencerUpdateRequestDto){
        return ResponseEntity.ok(influencerService.updateDetails(influencerUpdateRequestDto));
    }

}
