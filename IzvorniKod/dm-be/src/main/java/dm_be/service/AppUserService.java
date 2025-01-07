package dm_be.service;

import dm_be.domain.*;
import dm_be.dto.*;
import java.util.*;

public interface AppUserService {
    List<AppUser> getAllUsers();
    void addAppUser(AppUserRequestDTO AppUser);
    AppUser getUserById(Long id);

    /*
    //goverment + hum_org
    List<Report> getAllReports();

    //samo goverment
    void updateReport(Long id);
    void deleteReport(Long id);
    */
}
