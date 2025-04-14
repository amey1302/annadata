package com.annadata.service;

import com.annadata.dto.ReceiverRequestViewDTO;
import com.annadata.dto.RequestDTO;
import com.annadata.entity.Request;

import java.util.List;
import java.util.UUID;

public interface ReceiverRequestService {
    ReceiverRequestViewDTO createRequest(RequestDTO dto);
    List<ReceiverRequestViewDTO> getRequestsByReceiver(UUID receiverId);

    String deleteAllRequests();
}