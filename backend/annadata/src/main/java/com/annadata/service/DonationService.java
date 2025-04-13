package com.annadata.service;

import com.annadata.dto.DonationDTO;
import com.annadata.entity.Donation;

import java.util.List;

public interface DonationService {

     Donation createDonation(Donation donation);

     List<DonationDTO> getAllDonations();

}
