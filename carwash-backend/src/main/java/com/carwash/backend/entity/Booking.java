package com.carwash.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many bookings can reference one service
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "service_id")
    private Service service;

    // Many bookings can reference one vehicle
    @ManyToOne(optional = false, fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    private LocalDateTime bookingTime;

    private String status; // PENDING, CONFIRMED, COMPLETED

    private Integer rating; // 1-5, nullable until rated

    public Booking() {}

    public Booking(Long id, Service service, Vehicle vehicle, LocalDateTime bookingTime, String status, Integer rating) {
        this.id = id;
        this.service = service;
        this.vehicle = vehicle;
        this.bookingTime = bookingTime;
        this.status = status;
        this.rating = rating;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
}
