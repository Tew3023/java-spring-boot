package com.example.server;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ServerApplication {

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:3000") // ระบุพอร์ตของ Frontend
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowedHeaders("*")
						.allowCredentials(true);
			}
		};
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors() // ใช้การตั้งค่า CORS จาก WebMvcConfigurer
				.and()
				.csrf().disable() // ปิด CSRF เพื่อให้การพัฒนาสะดวกขึ้น (อย่าปิดใน Production หากไม่จำเป็น)
				.authorizeRequests()
				.anyRequest().permitAll(); // อนุญาตทุกคำขอ (แก้ไขตามความต้องการของคุณ)
		return http.build();
	}

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner() {
		return runner -> {
			System.out.println("Your server is working!");
		};
	}
}
