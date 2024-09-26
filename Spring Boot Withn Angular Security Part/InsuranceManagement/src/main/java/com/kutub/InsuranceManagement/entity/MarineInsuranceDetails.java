package com.kutub.InsuranceManagement.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "marineInsuranceDetails")
public class MarineInsuranceDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private String bankName;

    @Column(nullable = false)
    private String policyholder;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String voyageFrom;

    @Column(nullable = false)
    private String voyageTo;

    @Column(nullable = false)
    private String via;

    @Column(nullable = false)
    private String stockItem;

    @Column(nullable = false)
    private double sumInsured;


    @Column(nullable = false)
    private String coverage;

    @JsonIgnore
    @OneToMany(mappedBy = "marineDetails", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MarineInsuranceBill> marineInsuranceBills;

}
