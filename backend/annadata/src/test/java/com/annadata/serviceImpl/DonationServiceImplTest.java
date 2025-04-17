package com.annadata.serviceImpl;

import com.annadata.repository.DonationRepository;
import com.annadata.repository.UserRepository;
import com.annadata.service.DonationService;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class DonationServiceImplTest {

    @Autowired
    DonationRepository donationRepository;

    @Autowired
    UserRepository userRepository;


    @Test
    void shouldBeAbleToIntializeTheClass(){

        // arrange
        DonationService donationService = new DonationServiceImpl( donationRepository, userRepository);

        // act &  assert
        assertNotNull(donationService);
    }

}