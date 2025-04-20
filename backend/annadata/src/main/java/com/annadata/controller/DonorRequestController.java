package com.annadata.controller;

import com.annadata.dto.DonorRequestViewDTO;
import com.annadata.dto.UpdateQuantityDTO;
import com.annadata.entity.Donation;
import com.annadata.service.DonorRequestService;
import com.annadata.valueobject.CollectStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/food-donation/api/v1/donor")
@RequiredArgsConstructor
public class DonorRequestController {

    private final DonorRequestService donorRequestService;

    @GetMapping("/donations/{donationId}/requests")
    public List<DonorRequestViewDTO> getListOfRequestsForDonation(@PathVariable UUID donationId) {
        return donorRequestService.getListOfRequestsByDonation(donationId);
    }

    @PutMapping("/requests/{id}/accept")
    public DonorRequestViewDTO acceptRequest(@PathVariable UUID id) {
        return donorRequestService.acceptRequest(id);
    }

    @PutMapping("/requests/{id}/reject")
    public DonorRequestViewDTO rejectRequest(@PathVariable UUID id) {
        return donorRequestService.rejectRequest(id);
    }

    @PutMapping("/requests/{id}/collect-status")
    public DonorRequestViewDTO updateCollectStatus(@PathVariable UUID id,
                                       @RequestParam CollectStatus status) {
        return donorRequestService.updateCollectStatus(id, status);
    }
    @PutMapping("/requests/{donationId}/update-quantity")
    public Donation updateQuantity(@PathVariable UUID donationId, @RequestBody UpdateQuantityDTO dto) {
        return donorRequestService.updateQuantity(donationId, dto.getQuantity());
    }

    @PutMapping("/donations/{donationId}/close")
    public Donation closeDonation(@PathVariable UUID donationId) {
        return donorRequestService.closeDonation(donationId);
    }

    @GetMapping("/requests/{donationId}")
    public long getRequestsCountForDonation(@PathVariable UUID donationId){
        return donorRequestService.getRequestCountForDonation(donationId);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllRequests(){
        String message = donorRequestService.deleteAllDonationRequests();
        return ResponseEntity.ok(message);
    }

}