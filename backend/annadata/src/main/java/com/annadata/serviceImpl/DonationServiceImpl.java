package com.annadata.serviceImpl;

import com.annadata.dto.DonationDTO;
import com.annadata.dto.DonorRequestViewDTO;
import com.annadata.entity.Donation;
import com.annadata.entity.Request;
import com.annadata.repository.DonationRepository;
import com.annadata.service.DonationService;
import com.annadata.valueobject.DonationStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonationServiceImpl implements DonationService {

    private DonationRepository donationRepository;

    @Autowired
    DonationServiceImpl(DonationRepository donationRepository){
        this.donationRepository=donationRepository;
    }

    @Override
    public DonationDTO createDonation(Donation donation) {
        donation.setStatus(DonationStatus.OPEN);
        donationRepository.save(donation);

        return mapToDTO(donation);
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
        
        return donations.stream()
                .map(DonationDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public String deleteAllDonations() {
        if(donationRepository.findAll().size() > 0){
            donationRepository.deleteAll();
            return "Deleted All donations";
        }else{
            return "No Donations Exists";
        }
    }


}