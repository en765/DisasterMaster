package dm_be.service;

import dm_be.domain.*;
import dm_be.dto.*;
import java.util.*;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;

public interface AppUserService {
    List<AppUser> getAllUsers();
    AppUser addAppUser(AppUserRequestDTO AppUser);
    AppUser getUserByEmail(String email);

    // New method to subscribe a user
    AppUser subscribeUser(Long userId);
    //AppUser getCurrentUser(Authentication authentication);
    //AppUser getUserById(Long id);

    /*
    //goverment + hum_org
    List<Report> getAllReports();

    //samo goverment
    void updateReport(Long id);
    void deleteReport(Long id);
    */
}
