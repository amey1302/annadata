package com.annadata.serviceImpl;

import com.annadata.dto.ReceiverRequestViewDTO;
import com.annadata.dto.RequestDTO;
import com.annadata.entity.Donation;
import com.annadata.entity.Request;
import com.annadata.entity.User;
import com.annadata.repository.DonationRepository;
import com.annadata.repository.RequestRepository;
import com.annadata.repository.UserRepository;
import com.annadata.service.ReceiverRequestService;
import com.annadata.valueobject.CollectStatus;
import com.annadata.valueobject.RequestStatus;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReceiverRequestServiceImpl implements ReceiverRequestService {

    private final RequestRepository requestRepository;
    private final DonationRepository donationRepository;
    private final UserRepository userRepository;

    @Override
    public ReceiverRequestViewDTO createRequest(RequestDTO dto) {
        Donation donation = donationRepository.findById(dto.getDonationId())
                .orElseThrow(() -> new EntityNotFoundException("Donation not found"));

        User receiver = userRepository.findById(dto.getReceiverId())
                .orElseThrow(() -> new EntityNotFoundException("Receiver not found"));

        UUID donationId = dto.getDonationId();
        UUID receiverId = dto.getReceiverId();

        int existingCount = requestRepository.countRequestsByReceiverAndDonation(donationId, receiverId);

        if (existingCount >= 1) {
            throw new IllegalStateException("You can only request this donation a maximum of one time.");
        }

        Request request = Request.builder()
                .donation(donation)
                .receiver(receiver)
                .quantityRequested(dto.getQuantityRequested())
                .message(dto.getMessage())
                .status(RequestStatus.PENDING)
                .collectStatus(CollectStatus.NOT_COLLECTED)
                .createdAt(LocalDateTime.now())
                .build();

        Request saved = requestRepository.save(request);

        return mapToDTO(saved);
    }


    @Override
    public List<ReceiverRequestViewDTO> getRequestsByReceiver(UUID receiverId) {
        return requestRepository.findByReceiverId(receiverId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }


    @Override
    public String deleteAllRequests() {

        if(requestRepository.findAll().size() > 0){
            requestRepository.deleteAll();
            return "Deleted All users";
        }else{
            return "No Users Exists";
        }
    }

    private ReceiverRequestViewDTO mapToDTO(Request request) {
        return ReceiverRequestViewDTO.builder()
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
                .receiverOtp(request.getReceiverOtp())
                .build();
    }

}