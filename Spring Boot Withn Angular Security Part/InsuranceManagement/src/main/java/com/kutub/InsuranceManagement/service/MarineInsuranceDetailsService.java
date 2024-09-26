package com.kutub.InsuranceManagement.service;

import com.kutub.InsuranceManagement.entity.MarineInsuranceDetails;
import com.kutub.InsuranceManagement.entity.Policy;
import com.kutub.InsuranceManagement.repository.MarineInsuranceDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarineInsuranceDetailsService {

    @Autowired
    private MarineInsuranceDetailsRepo marineInsuranceDetailsRepo ;


    public List<MarineInsuranceDetails> getAllMarineInsuranceDetails() {
        return marineInsuranceDetailsRepo.findAll();
    }


    public void saveMarineInsuranceDetails(MarineInsuranceDetails md) {
        marineInsuranceDetailsRepo.save(md);
    }


    public MarineInsuranceDetails findById(long id){
        return  marineInsuranceDetailsRepo.findById(id).get();
    }


    public  void updateMarineInsuranceDetails(MarineInsuranceDetails md, long id){
        marineInsuranceDetailsRepo.save(md);

    }


    public void deleteMarineInsuranceDetails(long id) {
        marineInsuranceDetailsRepo.deleteById(id);
    }

}
