//package com.annadata.scheduler;
//
//import com.annadata.entity.Donation;
//import com.annadata.repository.DonationRepository;
//import com.annadata.valueobject.DonationStatus;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Component
//@RequiredArgsConstructor
//@Slf4j
//public class DonationStatusScheduler {
//
//    private final DonationRepository donationRepository;
//
//    @Scheduled(fixedRate = 60000) // every 60 seconds
//    public void autoCloseExpiredDonations() {
//        List<Donation> openDonations = donationRepository.findByStatus(DonationStatus.OPEN);
//        LocalDateTime now = LocalDateTime.now();
//
//        List<Donation> toClose = openDonations.stream()
//                .filter(d -> d.getExpiryTime().isBefore(now))
//                .toList();
//
//        if (!toClose.isEmpty()) {
//            toClose.forEach(donation -> {
//                donation.setStatus(DonationStatus.CLOSED);
//                log.info("Closing donation {} due to expiry at {}", donation.getId(), donation.getExpiryTime());
//            });
//            donationRepository.saveAll(toClose);
//        } else {
//            log.info("No expired donations found at this time.");
//        }
//    }
//
//}
