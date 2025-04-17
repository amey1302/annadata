package com.annadata.controller;

import com.annadata.dto.ReceiverRequestViewDTO;
import com.annadata.dto.RequestDTO;
import com.annadata.entity.Request;
import com.annadata.service.ReceiverRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/food-donation/api/v1/receiver")
@RequiredArgsConstructor
public class ReceiverRequestController {


    private final ReceiverRequestService receiverRequestService;

    @PostMapping("/requests")
    public ReceiverRequestViewDTO createRequest(@RequestBody RequestDTO dto) {
        return receiverRequestService.createRequest(dto);
    }

    @GetMapping("/requests")
    public List<ReceiverRequestViewDTO> getMyRequests(@RequestParam UUID receiverId) {
        return receiverRequestService.getRequestsByReceiver(receiverId);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllRequests(){
        String message = receiverRequestService.deleteAllRequests();
        return ResponseEntity.ok(message);
    }
}