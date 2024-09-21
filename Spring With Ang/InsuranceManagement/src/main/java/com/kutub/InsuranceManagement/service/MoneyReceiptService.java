package com.kutub.InsuranceManagement.service;

import com.kutub.InsuranceManagement.entity.Bill;
import com.kutub.InsuranceManagement.entity.MoneyReceipt;
import com.kutub.InsuranceManagement.entity.Receipt;
import com.kutub.InsuranceManagement.repository.MoneyReceiptRepository;
import com.kutub.InsuranceManagement.repository.ReceiptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MoneyReceiptService {

    @Autowired
    private MoneyReceiptRepository moneyReceiptRepository;
    @Autowired
    private ReceiptRepository receiptRepository ;

    public List<MoneyReceipt> getAllMoneyReceipt() {
        return  moneyReceiptRepository.findAll();
    }

    public void saveMoneyReceipt(MoneyReceipt mr) {
        Receipt receipt = receiptRepository.findById(mr.getReceipt().getId())
                .orElseThrow(
                        () -> new RuntimeException("Receipt not found " + mr.getReceipt().getId())
                );
        mr.setReceipt(receipt);
        moneyReceiptRepository.save(mr);
    }


    public MoneyReceipt findById(int id) {
        return moneyReceiptRepository.findById(id).get();
    }

    public void deleteMoneyReceipt(int id) {
        moneyReceiptRepository.deleteById(id);
    }
}
