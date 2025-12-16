package com.carwash.backend.service;

import com.carwash.backend.entity.Booking;
import com.carwash.backend.entity.Vehicle;
import com.carwash.backend.entity.Service;
import com.carwash.backend.repository.BookingRepository;
import com.carwash.backend.repository.ServiceRepository;
import com.carwash.backend.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.Optional;

@org.springframework.stereotype.Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ServiceRepository serviceRepository;
    private final VehicleRepository vehicleRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository,
                          ServiceRepository serviceRepository,
                          VehicleRepository vehicleRepository) {
        this.bookingRepository = bookingRepository;
        this.serviceRepository = serviceRepository;
        this.vehicleRepository = vehicleRepository;
    }

    /**
     * Create a booking. Expected that booking.service.id is set (refers to existing service).
     * For vehicle: if vehicle.id present -> fetched, else if plateNumber present -> attempt to find or create.
     */
    @Transactional
    public Booking createBooking(Booking booking) {
        if (booking.getService() == null || booking.getService().getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Service id must be provided");
        }

        // resolve service
        Service svc = serviceRepository.findById(booking.getService().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found"));
        booking.setService(svc);

        // resolve vehicle
        Vehicle vehicle = booking.getVehicle();
        if (vehicle == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vehicle must be provided");
        }

        Vehicle persistedVehicle = null;
        if (vehicle.getId() != null) {
            persistedVehicle = vehicleRepository.findById(vehicle.getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle not found by id"));
        } else if (vehicle.getPlateNumber() != null && !vehicle.getPlateNumber().isBlank()) {
            Optional<Vehicle> found = vehicleRepository.findByPlateNumber(vehicle.getPlateNumber().trim());
            if (found.isPresent()) {
                persistedVehicle = found.get();
            } else {
                // create new vehicle
                Vehicle newV = new Vehicle();
                newV.setPlateNumber(vehicle.getPlateNumber().trim());
                newV.setType(vehicle.getType());
                persistedVehicle = vehicleRepository.save(newV);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vehicle id or plateNumber must be provided");
        }

        booking.setVehicle(persistedVehicle);

        // default booking time if not provided
        if (booking.getBookingTime() == null) {
            booking.setBookingTime(LocalDateTime.now());
        }

        // set default status
        if (booking.getStatus() == null) {
            booking.setStatus("PENDING");
        }

        booking.setRating(null); // ensure rating empty initially

        return bookingRepository.save(booking);
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));
    }

    @Transactional
    public Booking rateBooking(Long bookingId, int rating) {
        if (rating < 1 || rating > 5) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rating must be between 1 and 5");
        }
        Booking booking = getBookingById(bookingId);
        booking.setRating(rating);
        booking.setStatus("COMPLETED");
        return bookingRepository.save(booking);
    }

    @Transactional
    public Booking confirmBooking(Long bookingId) {
        Booking booking = getBookingById(bookingId);
        booking.setStatus("CONFIRMED");
        return bookingRepository.save(booking);
    }
}
