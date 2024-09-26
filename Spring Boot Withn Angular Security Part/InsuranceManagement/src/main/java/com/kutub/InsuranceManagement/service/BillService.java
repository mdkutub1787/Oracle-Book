package com.kutub.InsuranceManagement.service;

import com.kutub.InsuranceManagement.entity.Bill;
import com.kutub.InsuranceManagement.entity.Policy;
import com.kutub.InsuranceManagement.repository.BillRepository;
import com.kutub.InsuranceManagement.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private PolicyRepository policyRepository ;


    public List<Bill> getAllBill() {
        return billRepository.findAll();
    }


    public void saveBill(Bill b) {
        Policy policy = policyRepository.findById(b.getPolicy().getId())
                .orElseThrow(
                        () -> new RuntimeException("policy not found " + b.getPolicy().getId())
                );
        b.setPolicy(policy);
        billRepository.save(b);
    }



    public void updateBill(Bill b, int id) {
        billRepository.save(b);

    }


    public void deleteBill(int id) {
        billRepository.deleteById(id);
    }


    // Get a bill by its ID
    public Bill getBillById(int id) {
        return billRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found with ID: " + id));
    }

    // Find bills by policyholder name
    public List<Bill> getBillsByPolicyholder(String policyholder) {
        return billRepository.findBillsByPolicyholder(policyholder);
    }

    // Find bills by the associated policy ID
    public List<Bill> findBillByPolicyId(int policyId) {
        return billRepository.findBillsByPolicyId(policyId);

    }

}


