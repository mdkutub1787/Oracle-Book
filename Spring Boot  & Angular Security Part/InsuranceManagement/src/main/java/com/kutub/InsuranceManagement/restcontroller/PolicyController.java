package com.kutub.InsuranceManagement.restcontroller;

import com.kutub.InsuranceManagement.entity.Policy;
import com.kutub.InsuranceManagement.service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/policy")
@CrossOrigin("*")
public class PolicyController {

    @Autowired
    private PolicyService policyService;


    @GetMapping("/")
    public List<Policy> getAllPolicies() {
        return policyService.getAllPolicy();
    }


    @PostMapping("/save")
    public void savePolicy(@RequestBody Policy p) {
        policyService.savePolicy(p);
    }


    @PutMapping("/update/{id}")
    public  void updatePolicy(@RequestBody Policy p){
        policyService.savePolicy(p);
    }


    @DeleteMapping("/delete/{id}")
    public void deletePolicyById(@PathVariable int id) {
        policyService.deletePolicy(id);
    }

    @GetMapping("/{id}")
    public Policy getPolicyById(@PathVariable ("id") int id){
        return   policyService.findById(id);
    }



}
