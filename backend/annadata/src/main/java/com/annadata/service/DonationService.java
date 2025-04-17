package com.annadata.service;

import com.annadata.dto.DonationCreateDTO;
import com.annadata.dto.DonationDTO;
import com.annadata.entity.Donation;

import java.util.List;
import java.util.UUID;

public interface DonationService {

    Donation createDonation(DonationCreateDTO donationDTO);

    List<DonationDTO> getAllDonations();

    Donation getDonationById(UUID uuid);

    void deleteDonationById(UUID uuid);

    Donation markAsCollected(UUID uuid);

    Donation updateDonation(UUID uuid,Donation donation);

    List<Donation> searchDonations(String location);

    List<DonationDTO> getDonationsByDonorId(UUID donorId);


}



