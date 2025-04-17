package com.annadata;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AnnadataApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnnadataApplication.class, args);
	}

}
