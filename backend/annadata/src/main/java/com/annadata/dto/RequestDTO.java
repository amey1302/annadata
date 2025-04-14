package com.annadata.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class RequestDTO {
    private UUID donationId;
    private UUID receiverId;
    private Integer quantityRequested;
    private String message;

    public UUID getDonationId() {
        return donationId;
    }

    public void setDonationId(UUID donationId) {
        this.donationId = donationId;
    }

    public UUID getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(UUID receiverId) {
        this.receiverId = receiverId;
    }

    public Integer getQuantityRequested() {
        return quantityRequested;
    }

    public void setQuantityRequested(Integer quantityRequested) {
        this.quantityRequested = quantityRequested;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
