package com.example.gateway;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.CrossOrigin;


@EnableDiscoveryClient
@SpringBootApplication
@CrossOrigin()
@OpenAPIDefinition(info = @Info(title = "API Gateway", version = "1.0", description = "Documentation API Gateway v1.0"))
public class GatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}

	@Bean
	public RouteLocator routeLocator(RouteLocatorBuilder builder) {
		return builder
				.routes()
				.route(r -> r.path("/notes-service/v3/api-docs").and().method(HttpMethod.GET).uri("lb://notes"))
				.route(r -> r.path("/body-service/v3/api-docs").and().method(HttpMethod.GET).uri("lb://body"))
				.route(r -> r.path("/account-service/v3/api-docs").and().method(HttpMethod.GET).uri("lb://account"))
				.route(r -> r.path("/nutrition-service/v3/api-docs").and().method(HttpMethod.GET).uri("lb://nutrition"))
    .build();
	}



}
