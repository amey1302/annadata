package com.annadata.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.annadata.valueobject.DonationStatus;
import com.annadata.valueobject.FoodCategory;
import com.annadata.valueobject.FoodType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor // This is crucial for builder to work with all fields
@NoArgsConstructor  // Good to have, especially for Jackson or frameworks

public class DonationDTO {

    private UUID id;
    private String title;
    private String description;
    private FoodCategory foodCategory;
    private FoodType foodType;
    private Integer quantity;
    private LocalDateTime expiryTime;
    private String address;
    private String addressLink;
    private LocalDateTime createdAt;
    private DonationStatus status;

    // Donor info (flattened)
    private String donorName;
    private String donorEmail;
    private String donorPhone;

    public DonationDTO(com.annadata.entity.Donation donation) {
        this.id = donation.getId();
        this.title = donation.getTitle();
        this.description = donation.getDescription();
        this.foodCategory = donation.getFoodCategory();
        this.foodType = donation.getFoodType();
        this.quantity = donation.getQuantity();
        this.expiryTime = donation.getExpiryTime();
        this.address = donation.getAddress();
        this.addressLink = donation.getAddressLink();
        this.createdAt = donation.getCreatedAt();
        this.status = donation.getStatus();

        // Extract donor fields (from User entity)
        this.donorName = donation.getDonor().getName();
        this.donorEmail = donation.getDonor().getEmail();
        this.donorPhone = donation.getDonor().getPhoneNumber();
    }
}
