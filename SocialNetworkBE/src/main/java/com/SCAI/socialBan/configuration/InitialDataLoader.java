package com.SCAI.socialBan.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.SCAI.socialBan.model.User;
import com.SCAI.socialBan.model.User.Role;
import com.SCAI.socialBan.repository.UserRepository;

@Component
public class InitialDataLoader implements CommandLineRunner {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder; // Utilizzato per crittografare la password

    public InitialDataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Controlla se non c'è già un admin nel database
        if (!userRepository.existsByRole(Role.ADMIN)) {
            // Se non c'è un admin, crea un admin predefinito
            User adminUser = new User();
            adminUser.setEmail("admin@socialBan.com");
            adminUser.setDob("05/11/1606");
            adminUser.setFullName("CHAD_MIN");
            adminUser.setPassword(passwordEncoder.encode("admin1234"));
            adminUser.setImgProfile("https://cdn1.iconfinder.com/data/icons/social-black-buttons/512/anonymous-512.png");
            adminUser.setRole(Role.ADMIN);

            userRepository.save(adminUser);
        }
    }
}
