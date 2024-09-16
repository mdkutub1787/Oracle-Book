package com.kutub.InsuranceManagement.service;

import com.kutub.InsuranceManagement.entity.Bill;
import com.kutub.InsuranceManagement.entity.Receipt;
import com.kutub.InsuranceManagement.repository.BillRepository;
import com.kutub.InsuranceManagement.repository.ReceiptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceiptService {

    @Autowired
    private ReceiptRepository receiptRepository;
    @Autowired
    private BillRepository billRepository;


    public List<Receipt> getAllReceipt() {
        return receiptRepository.findAll();
    }


    public void saveReceipt(Receipt r) {
        Bill bill = billRepository.findById(r.getBill().getId())
                .orElseThrow(
                        () -> new RuntimeException("Bill not found " + r.getBill().getId())
                );
        r.setBill(bill);
        receiptRepository.save(r);
    }


    public Receipt findById(int id) {
        return receiptRepository.findById(id).get();
    }



    public void updateReceipt(Receipt r, int id) {
        receiptRepository.save(r);

    }



    public void deleteReceipt(int id) {
        receiptRepository.deleteById(id);
    }


//    public List<Receipt> findByPolicyHolderName(String policyholder) {
//        return receiptRepository.findReceiptByPolicyholder(policyholder);
//    }
//
//    public List<Receipt> findReceiptsByPolicyholder(String policyholder) {
//        return receiptRepository.findReceiptByPolicyholder(policyholder);
//    }
//
//    public List<Receipt> findReceiptsByBillId(int billid) {
//        return receiptRepository.findReceiptByBillId(billid);
//    }
}
