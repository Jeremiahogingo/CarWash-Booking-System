package com.carwash.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vehicles", indexes = {
        @Index(name = "idx_plate_number", columnList = "plateNumber")
})
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String plateNumber;

    private String type; // e.g., Sedan, SUV, Truck

    public Vehicle() {}

    public Vehicle(Long id, String plateNumber, String type) {
        this.id = id;
        this.plateNumber = plateNumber;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
