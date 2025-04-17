package com.annadata.controller;

import com.annadata.dto.DonationCreateDTO;
import com.annadata.dto.DonationDTO;
import com.annadata.entity.Donation;
import com.annadata.service.DonationService;
import com.annadata.valueobject.FoodCategory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;



@RestController
@RequestMapping("/food-donation/api/v1/donations")
public class DonationController {

    private DonationService donationService;

    DonationController(DonationService donationService){
        this.donationService=donationService;
    }
    @PostMapping


    public ResponseEntity<?> createDonation(@RequestBody DonationCreateDTO donationDTO) {

        Donation saved = donationService.createDonation(donationDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Donation created successfully", "donation", saved));

    }


    @DeleteMapping("/{uuid}")
    public ResponseEntity<String> deleteDonation(@PathVariable UUID uuid) {
        try {
            donationService.deleteDonationById(uuid); // your service method
            return ResponseEntity.ok("Donation deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Donation with ID " + uuid + " not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while deleting the donation.");
        }
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<?> getDonationById(@PathVariable UUID uuid) {
        Donation donation = donationService.getDonationById(uuid);

        if (donation != null) {
            return ResponseEntity.status(HttpStatus.OK).body(new DonationDTO(donation));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Donation not found with ID: " + uuid);
        }
    }


    @GetMapping
    public ResponseEntity<List<DonationDTO>> getAllDonations() {
        List<DonationDTO> donations = donationService.getAllDonations();
        return ResponseEntity.ok(donations);
    }



    @PutMapping("/{uuid}/closed")
    public ResponseEntity<DonationDTO> markAsCollected(@PathVariable UUID uuid) {
        try {
            Donation donation = donationService.markAsCollected(uuid);
            return ResponseEntity.ok(new DonationDTO(donation));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping("/{uuid}")
    public ResponseEntity<?> updateDonation(@PathVariable UUID uuid , @RequestBody Donation donationRequest){
        Donation donation = donationService.updateDonation(uuid,donationRequest);
        if (donation != null) {
            return ResponseEntity.status(HttpStatus.OK).body(new DonationDTO(donation));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Donation not found with ID: " + uuid);
        }
    }

    @GetMapping("/search")
    @ResponseBody
    public ResponseEntity<List<DonationDTO>> getDonation(@RequestParam(required = false)String location){
        List<Donation> donationList = donationService.searchDonations(location);
        List<DonationDTO> donationDTOList = donationList.stream().map(DonationDTO::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.ok(donationDTOList);
    }

    @GetMapping("/donor/{donorId}")
    public ResponseEntity<List<DonationDTO>> getDonationsByDonor(@PathVariable UUID donorId) {
        List<DonationDTO> donationList = donationService.getDonationsByDonorId(donorId);
        return ResponseEntity.ok(donationList);
    }


}