package com.kutub.InsuranceManagement.repository;

import com.kutub.InsuranceManagement.entity.Bill;
import com.kutub.InsuranceManagement.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface PolicyRepository extends JpaRepository<Policy, Integer> {


}

