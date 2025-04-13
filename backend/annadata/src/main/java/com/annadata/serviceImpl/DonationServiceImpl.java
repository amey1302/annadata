package com.annadata.serviceImpl;

import com.annadata.dto.DonationDTO;
import com.annadata.entity.Donation;
import com.annadata.repository.DonationRepository;
import com.annadata.service.DonationService;
import com.annadata.valueobject.DonationStatus;
import com.annadata.valueobject.FoodCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DonationServiceImpl implements DonationService {

    private DonationRepository donationRepository;

    @Autowired
    DonationServiceImpl(DonationRepository donationRepository){
        this.donationRepository=donationRepository;
    }

    @Override
    public Donation createDonation(Donation donation) {
        donation.setStatus(DonationStatus.OPEN);
        donationRepository.save(donation);
        return donation;
    }

    @Override
    public List<DonationDTO> getAllDonations() {
        List<Donation> donations = donationRepository.findAll();

        return donations.stream()
                .map(DonationDTO::new) // constructor maps from entity
                .collect(Collectors.toList());
    }

    @Override
    public Donation getDonationById(UUID uuid) {
        return donationRepository.findById(uuid)
                .orElseThrow(() -> new RuntimeException("Donation not found"));
    }

    @Override
    public void deleteDonationById(UUID uuid) {
        donationRepository.deleteById(uuid);
    }

    @Override
    public Donation markAsCollected(UUID uuid) {
        Donation donation = getDonationById(uuid);
        donation.setStatus(DonationStatus.CLOSED);
        return donation;
    }

    @Override
    public Donation updateDonation(UUID id, Donation updatedDonation) {
        Donation donation = getDonationById(id);
        donation.setTitle(updatedDonation.getTitle());
        donation.setDescription(updatedDonation.getDescription());
        donation.setFoodCategory(updatedDonation.getFoodCategory());
        donation.setFoodType(updatedDonation.getFoodType());
        donation.setQuantity(updatedDonation.getQuantity());
        donation.setExpiryTime(updatedDonation.getExpiryTime());
        donation.setAddress(updatedDonation.getAddress());
        donation.setAddressLink(updatedDonation.getAddressLink());
        return donationRepository.save(donation);
    }

    @Override
    public List<Donation> searchDonations(FoodCategory foodCategory, String address) {

        return donationRepository.findByFoodCategoryOrAddressContainingIgnoreCase(foodCategory,address);
    }

}
