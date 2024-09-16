package com.kutub.InsuranceManagement.restcontroller;

import com.kutub.InsuranceManagement.entity.Receipt;
import com.kutub.InsuranceManagement.service.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/receipt")
@CrossOrigin("*")
public class ReceiptController {

    @Autowired
    private ReceiptService receiptService ;

    // Get all Receipt
    @GetMapping("/")
    public List<Receipt> getAllReceipt() {
        return receiptService.getAllReceipt();
    }


    // Create a new Receipt
    @PostMapping("/save")
    public void saveReceipt(@RequestBody Receipt r) {
        receiptService.saveReceipt(r);
    }

    // Update a Receipt by ID
    @PutMapping("/update/{id}")
    public  void updateReceipt(@RequestBody Receipt r){
        receiptService.saveReceipt(r);
    }

    // Delete a Receipt by ID
    @DeleteMapping("/delete/{id}")
    public void deleteReceiptById(@PathVariable int id) {
        receiptService.deleteReceipt(id);
    }

    @GetMapping("/{id}")
    public Receipt getReceiptById(@PathVariable ("id") int id){
        return   receiptService.findById(id);
    }


}
