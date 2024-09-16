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
@Table(name = "bills")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private double fire;

    @Column(nullable = false)
    private double rsd;

    @Column(nullable = false)
    private double netPremium;

    @Column(nullable = false)
    private double tax;

    @Column(nullable = false)
    private double grossPremium;

    // Many Bills can belong to one Policy
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "policy_id", nullable = false)  // Foreign key for Policy entity
    private Policy policy;

    @JsonIgnore
    @OneToMany(mappedBy = "bill", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Receipt> receipts;
}
