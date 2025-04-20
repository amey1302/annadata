package com.annadata.service;

import com.annadata.dto.DonorRequestViewDTO;
import com.annadata.entity.Donation;
import com.annadata.valueobject.CollectStatus;

import java.util.List;
import java.util.UUID;

public interface DonorRequestService {
    List<DonorRequestViewDTO> getListOfRequestsByDonation(UUID donationId);
    DonorRequestViewDTO acceptRequest(UUID requestId);
    DonorRequestViewDTO rejectRequest(UUID requestId);
    DonorRequestViewDTO updateCollectStatus(UUID requestId, CollectStatus status);

    Donation updateQuantity(UUID donationId, int quantity);

    String deleteAllDonationRequests();

    Donation closeDonation(UUID donationId);

    long getRequestCountForDonation(UUID donationId);
}