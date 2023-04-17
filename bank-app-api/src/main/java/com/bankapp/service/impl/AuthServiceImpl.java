package com.bankapp.service.impl;

import com.bankapp.controller.dto.UserRegisterDto;
import com.bankapp.model.Customer;
import com.bankapp.repository.CustomerRepository;
import com.bankapp.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthServiceImpl implements AuthService {

}
