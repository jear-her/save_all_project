package com.nike.store.controller;

import com.nike.store.dto.ApiResponse;
import com.nike.store.model.ContactMessage;
import com.nike.store.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ApiResponse<String>> submitMessage(@RequestBody ContactMessage message) {
        contactService.saveMessage(message);
        return ResponseEntity.ok(ApiResponse.success("Message submitted successfully", null));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<ContactMessage>>> getAllMessages() {
        List<ContactMessage> messages = contactService.getAllMessages();
        return ResponseEntity.ok(ApiResponse.success("Messages retrieved", messages));
    }
}
