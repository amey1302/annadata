package com.annadata.serviceImpl;

import com.annadata.dto.DonorRequestViewDTO;
import com.annadata.entity.Donation;
import com.annadata.entity.Request;
import com.annadata.repository.DonationRepository;
import com.annadata.repository.RequestRepository;
import com.annadata.service.DonorRequestService;
import com.annadata.valueobject.CollectStatus;
import com.annadata.valueobject.DonationStatus;
import com.annadata.valueobject.RequestStatus;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DonorRequestServiceImpl implements DonorRequestService {

    private final RequestRepository requestRepository;

    private final DonationRepository donationRepository;

    @Override
    public List<DonorRequestViewDTO> getListOfRequestsByDonation(UUID donationId) {
       List<Request> saved = requestRepository.findByDonationId(donationId);

       return mapToDTO(saved);
    }

    @Override
    public DonorRequestViewDTO acceptRequest(UUID requestId) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new EntityNotFoundException("Request not found"));

        request.setStatus(RequestStatus.ACCEPTED);

        // Generate OTPs
        String OTP = generateOtp();
        if (request.getDonorOtp() == null) {
            request.setDonorOtp(OTP);
        }

        if (request.getReceiverOtp() == null) {
            request.setReceiverOtp(OTP);
        }
        Request saved = requestRepository.save(request);
        return mapToDTO(saved);
    }

    @Override
    public DonorRequestViewDTO rejectRequest(UUID requestId) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new EntityNotFoundException("Request not found"));
        request.setStatus(RequestStatus.REJECTED);
        Request saved = requestRepository.save(request);
        return mapToDTO(saved);
    }

    @Override
    public DonorRequestViewDTO updateCollectStatus(UUID requestId, CollectStatus status) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new EntityNotFoundException("Request not found"));
        request.setCollectStatus(status);
        Request saved = requestRepository.save(request);
        return mapToDTO(saved);
    }
    @Override
    public Donation updateQuantity(UUID donationId, int quantity) {
        Donation donation = donationRepository.findById(donationId)
                .orElseThrow(() -> new EntityNotFoundException("Donation not found"));

        donation.setQuantity(quantity);

        if (quantity <= 0) {
            donation.setStatus(DonationStatus.CLOSED);
        }

        return donationRepository.save(donation);
    }

    @Override
    public String deleteAllDonationRequests() {

        if(requestRepository.findAll().size() > 0){
            requestRepository.deleteAll();
            return "Deleted All requests";
        }else{
            return "No Users Requests";
        }
    }

    @Override
    public Donation closeDonation(UUID donationId) {
        Donation donation = donationRepository.findById(donationId)
                .orElseThrow(() -> new EntityNotFoundException("Donation not found"));

        donation.setStatus(DonationStatus.CLOSED);
        return donationRepository.save(donation);
    }

    @Override
    public long getRequestCountForDonation(UUID donationId) {
        return requestRepository.countRequestsByDonationId(donationId);
    }

    private DonorRequestViewDTO mapToDTO(Request request) {
        return DonorRequestViewDTO.builder()
                .id(request.getId())
                .donationId(request.getDonation().getId())
                .receiverId(request.getReceiver().getId())
                .receiverName(request.getReceiver().getName())
                .receiverContact(request.getReceiver().getPhoneNumber())
                .quantityRequested(request.getQuantityRequested())
                .message(request.getMessage())
                .status(request.getStatus())
                .collectStatus(request.getCollectStatus())
                .createdAt(request.getCreatedAt())
                .donorOtp(request.getDonorOtp())
                .build();
    }

    private List<DonorRequestViewDTO> mapToDTO(List<Request> requests) {
        return requests.stream()
                .map(this::mapToDTO)
                .toList(); //
    }
    private String generateOtp() {
        return String.valueOf((int) (Math.random() * 900000) + 100000);
    }

}
