package com.annadata.dto;

import com.annadata.valueobject.CollectStatus;
import com.annadata.valueobject.RequestStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class DonorRequestViewDTO {
    private UUID id;
    private UUID donationId;
    private UUID receiverId;
    private String receiverName;
    private String receiverContact;
    private Integer quantityRequested;
    private String message;
    private RequestStatus status;
    private CollectStatus collectStatus;
    private LocalDateTime createdAt;

    private String donorOtp;
}