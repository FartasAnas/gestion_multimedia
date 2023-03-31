package stage.dcm.api.servicesImp;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import stage.dcm.api.entities.User;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;

@Service @Transactional @RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserServices userServices;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user= userServices.getUserByEmail(email.toLowerCase());
        if(user == null){
            throw new UsernameNotFoundException("User not found");
        }
        Collection<SimpleGrantedAuthority> authorities =new ArrayList<>();
        user.getRoles().forEach(role ->
                authorities.add(new SimpleGrantedAuthority(role.getName()))
        );
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }
}
