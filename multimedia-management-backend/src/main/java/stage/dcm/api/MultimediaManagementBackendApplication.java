package stage.dcm.api;

import ma.indh.minio.service.MinioService;
import ma.indh.minio.service.impl.MinioServiceImpl;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import stage.dcm.api.entities.Role;
import stage.dcm.api.entities.User;
import stage.dcm.api.services.RoleServices;
import stage.dcm.api.services.UserServices;

import java.util.ArrayList;

@SpringBootApplication
public class MultimediaManagementBackendApplication {
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://172.16.16.244:4200","http://localhost:4200","http://192.168.0.106:4200")
						.allowedMethods("*")
						.allowedHeaders("*")
						.exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "Access-Control-Allow-Headers", "Access-Control-Allow-Methods")
						.allowCredentials(true);
			}
		};
	}
	@Bean
	PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

	@Bean
	CommandLineRunner run(UserServices appUserService, RoleServices roleService){
		return args -> {
			try {
				roleService.saveRole(new Role(null,"ADMIN"));
				roleService.saveRole(new Role(null,"USER"));

				appUserService.saveUser(new User(null,"fartasanas","fartas@gmail.com","1234","fartas","anas",new ArrayList<>(),new ArrayList<>()));


				appUserService.addRoleToUser("fartasanas","ADMIN");

			}
			catch (Exception e){
				System.out.println("Duplicated Default Values");
			}

		};
	}

	public static void main(String[] args) {
		SpringApplication.run(MultimediaManagementBackendApplication.class, args);
	}


}
