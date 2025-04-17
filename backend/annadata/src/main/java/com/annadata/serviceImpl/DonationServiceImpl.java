package com.annadata.serviceImpl;

import com.annadata.dto.DonationDTO;
import com.annadata.entity.Donation;
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
    public String deleteAllDonations() {
        if(donationRepository.findAll().size() > 0){
            donationRepository.deleteAll();
            return "Deleted All donations";
        }else{
            return "No Donations Exists";
        }
    }


}