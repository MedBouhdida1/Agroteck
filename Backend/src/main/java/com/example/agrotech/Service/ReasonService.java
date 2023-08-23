package com.example.agrotech.Service;

import com.example.agrotech.Models.Airport;
import com.example.agrotech.Models.Reason;

import java.util.List;

public interface ReasonService {

    Reason ajouterReason(Reason reason);
    Reason modifierReason(Reason reason);
    List<Reason> getActiveTrueReasons();
    void supprimerById(String id);
    boolean reasonExists(String id);
    boolean reasonCodeExists(String reasonCode);
    Reason getReasonById(String id);
    Reason getReasonByReasonCode(String reasonCode);
    List<Reason>SearchReasonByNameAndActive(String reasonName);
    List<Reason>SearchReasonByNameAndArchived(String reasonName);

    List<Reason>getArchivedReasons();

}
