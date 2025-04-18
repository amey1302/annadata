package com.annadata.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import com.annadata.entity.Request;


@Repository
public interface RequestRepository extends JpaRepository<Request, UUID> {
    List<Request> findByDonationId(UUID donationId);

    List<Request> findByReceiverId(UUID receiverId);
    @Query("SELECT COUNT(r) FROM Request r WHERE r.donation.id = :donationId AND r.receiver.id = :receiverId")
    int countRequestsByReceiverAndDonation(@Param("donationId") UUID donationId,
                                           @Param("receiverId") UUID receiverId);

}
