package com.carwash.backend.controller;

import com.carwash.backend.entity.Booking;
import com.carwash.backend.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    /**
     * Create a booking.
     * Expected JSON body:
     * {
     *   "service": { "id": 1 },
     *   "vehicle": { "plateNumber": "KBD123", "type": "SUV" },
     *   "bookingTime": "2025-01-20T10:00:00"
     * }
     */
    @PostMapping("/create")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking created = bookingService.createBooking(booking);
        return ResponseEntity.status(201).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    /**
     * Rate a booking (marks booking as COMPLETED).
     * POST /api/booking/{id}/rate?rating=5
     */
    @PostMapping("/{id}/rate")
    public ResponseEntity<Booking> rateBooking(@PathVariable Long id, @RequestParam int rating) {
        Booking updated = bookingService.rateBooking(id, rating);
        return ResponseEntity.ok(updated);
    }

    /**
     * Confirm a booking (optional endpoint)
     * POST /api/booking/{id}/confirm
     */
    @PostMapping("/{id}/confirm")
    public ResponseEntity<Booking> confirmBooking(@PathVariable Long id) {
        Booking updated = bookingService.confirmBooking(id);
        return ResponseEntity.ok(updated);
    }
}
