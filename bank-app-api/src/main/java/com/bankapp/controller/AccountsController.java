package com.bankapp.controller;

import com.bankapp.model.Accounts;
import com.bankapp.model.Customer;
import com.bankapp.service.AccountService;
import com.bankapp.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("accounts")
public class AccountsController {

    private final CustomerService customerService;
    private final AccountService accountService;

    public AccountsController(CustomerService customerService, AccountService accountService) {
        this.customerService = customerService;
        this.accountService = accountService;
    }

    @GetMapping("/customer/{email}")
    public ResponseEntity<?> findAccountByCustomerEmail(@PathVariable String email) {
        Customer customer = this.customerService.findByEmail(email);
        return ResponseEntity.ok(accountService.findByCustomerId(customer.getCustomerId()));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Accounts account) {
        this.accountService.save(account);
    }
}
