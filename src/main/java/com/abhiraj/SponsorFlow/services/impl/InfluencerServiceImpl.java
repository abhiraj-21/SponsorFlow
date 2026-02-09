package com.abhiraj.SponsorFlow.services.impl;

import com.abhiraj.SponsorFlow.services.InfluencerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class InfluencerServiceImpl implements InfluencerService {

}
