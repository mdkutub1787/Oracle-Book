package com.kutub.InsuranceManagement.restcontroller;

import com.kutub.InsuranceManagement.entity.MoneyReceipt;
import com.kutub.InsuranceManagement.entity.Receipt;
import com.kutub.InsuranceManagement.service.MoneyReceiptService;
import com.kutub.InsuranceManagement.service.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/moneyreceipt")
@CrossOrigin("*")

public class MoneyReceiptController {


    @Autowired
    private MoneyReceiptService moneyReceiptService;

    // Get all Receipt
    @GetMapping("/")
    public List<MoneyReceipt> getAllMoneyReceipt() {
        return moneyReceiptService.getAllMoneyReceipt();
    }


    // Create a new Receipt
    @PostMapping("/save")
    public void saveMoneyReceipt(@RequestBody MoneyReceipt mr) {
        moneyReceiptService.saveMoneyReceipt(mr);
    }

    // Update a Receipt by ID
    @PutMapping("/update/{id}")
    public  void updateMoneyReceipt(@RequestBody MoneyReceipt mr){
        moneyReceiptService.saveMoneyReceipt(mr);
    }

    // Delete a Receipt by ID
    @DeleteMapping("/delete/{id}")
    public void deleteMoneyReceiptById(@PathVariable int id) {
        moneyReceiptService.deleteMoneyReceipt(id);
    }

    @GetMapping("/{id}")
    public MoneyReceipt getMoneyReceiptById(@PathVariable ("id") int id){
        return   moneyReceiptService.findById(id);
    }

}
