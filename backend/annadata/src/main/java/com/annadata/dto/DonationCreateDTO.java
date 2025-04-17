package com.annadata.dto;

import com.annadata.valueobject.DonationStatus;
import com.annadata.valueobject.FoodCategory;
import com.annadata.valueobject.FoodType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class DonationCreateDTO {
    private UUID donorId;
    private String title;
    private String description;
    private FoodCategory foodCategory;
    private FoodType foodType;
    private Integer quantity;
    private LocalDateTime expiryTime;
    private String address;
    private String addressLink;
}