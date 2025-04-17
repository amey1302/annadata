package com.annadata.serviceImpl;

import com.annadata.dto.DonationCreateDTO;
import com.annadata.dto.DonationDTO;
import com.annadata.entity.Donation;
import com.annadata.entity.User;
import com.annadata.repository.DonationRepository;
import com.annadata.repository.UserRepository;
import com.annadata.service.DonationService;
import com.annadata.valueobject.DonationStatus;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DonationServiceImpl implements DonationService {


    private DonationRepository donationRepository;
    private UserRepository userRepository;


    @Autowired
    DonationServiceImpl(DonationRepository donationRepository,UserRepository userRepository){
        this.donationRepository=donationRepository;
        this.userRepository=userRepository;
    }


    @Override
    public Donation createDonation(DonationCreateDTO donationDTO) {
        System.out.println(donationDTO.getAddress()+ " " + donationDTO.getDonorId());
        User donor = userRepository.findById(donationDTO.getDonorId())
                .orElseThrow(() -> new RuntimeException("Donor not found with ID: " + donationDTO.getDonorId()));
        Donation donation = new Donation();
        donation.setDonor(donor);
        donation.setTitle(donationDTO.getTitle());
        donation.setDescription(donationDTO.getDescription());
        donation.setFoodCategory(donationDTO.getFoodCategory());
        donation.setFoodType(donationDTO.getFoodType());
        donation.setQuantity(donationDTO.getQuantity());
        donation.setExpiryTime(donationDTO.getExpiryTime());
        donation.setAddress(donationDTO.getAddress());
        donation.setAddressLink(donationDTO.getAddressLink());
        donation.setStatus(DonationStatus.OPEN);
        donation.setCreatedAt(LocalDateTime.now());
        return donationRepository.save(donation);

    }
    private DonationDTO mapToDTO(Donation donation) {
        return DonationDTO.builder()
                .id(donation.getId())
                .title(donation.getTitle())
                .description(donation.getDescription())
                .foodCategory(donation.getFoodCategory())
                .foodType(donation.getFoodType())
                .quantity(donation.getQuantity())
                .expiryTime(donation.getExpiryTime())
                .address(donation.getAddress())
                .addressLink(donation.getAddressLink())
                .createdAt(donation.getCreatedAt())
                .status(donation.getStatus())
                .donorName(donation.getDonor().getName())
                .donorEmail(donation.getDonor().getEmail())
                .donorPhone(donation.getDonor().getPhoneNumber())
                .build();
    }



    @Override
    public List<DonationDTO> getAllDonations() {
        List<Donation> donations = donationRepository.findAll();
        LocalDateTime now = LocalDateTime.now();

        donations.forEach(donation -> {
            if (donation.getStatus() == DonationStatus.OPEN && donation.getExpiryTime().isBefore(now)) {
                donation.setStatus(DonationStatus.CLOSED);
                donationRepository.save(donation);
            }
        });
        return donations.stream()
                .map(DonationDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public Donation getDonationById(UUID id) {
        return donationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Donation not found"));
    }

    public String deleteAllDonations() {
        if(donationRepository.findAll().size() > 0){
            donationRepository.deleteAll();
            return "Deleted All donations";
        }else{
            return "No Donations Exists";
        }
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
    public List<Donation> searchDonations(String location) {
        return donationRepository.findByAddressContainingIgnoreCase(location);
    }

    @Override
    public List<DonationDTO> getDonationsByDonorId(UUID donorId) {
        List<Donation> donations = donationRepository.findByDonor_Id(donorId);
        return donations.stream()
                .map(DonationDTO::new)
                .collect(Collectors.toList());
    }


}