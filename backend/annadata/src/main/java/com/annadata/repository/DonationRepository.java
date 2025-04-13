package com.annadata.repository;

import com.annadata.entity.Donation;
import com.annadata.valueobject.DonationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DonationRepository extends JpaRepository<Donation, UUID> {

    List<Donation> findByStatus(DonationStatus status);

}
