package com.example.account.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class Session {
    private String id;
    private String username;
    private String userId;
    private String ipAddress;
    private long start;
    private long lastAccess;
    private Map<String, String> clients;
}
