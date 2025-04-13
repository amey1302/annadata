package com.annadata.controller;

import com.annadata.dto.DonationDTO;
import com.annadata.entity.Donation;
import com.annadata.service.DonationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/food-donation/api/v1/donations")
public class DonationController {

    private DonationService donationService;

    DonationController(DonationService donationService){
        this.donationService=donationService;
    }

    @PostMapping
    public ResponseEntity<?> createDonation(@RequestBody Donation donation) {
        Donation saved = donationService.createDonation(donation);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Donation created successfully", "donation", new DonationDTO(saved)));
    }



    @GetMapping
    public ResponseEntity<List<DonationDTO>> getAllDonations() {
        List<DonationDTO> donations = donationService.getAllDonations();
        return ResponseEntity.ok(donations);
    }


}
