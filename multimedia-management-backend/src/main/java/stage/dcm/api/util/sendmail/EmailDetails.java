package stage.dcm.api.util.sendmail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class EmailDetails {
    private String email;
    private String password;

    public String MessageConstructor(){
        return "\nBonjour Madame, Monsieur," +
                "\nNous avons bien reçu votre demande de réinitialisation de mot de passe pour votre compte chez nous et nous sommes heureux de vous aider à retrouver l'accès à votre compte." +

                "\n\nComme demandé, nous avons réinitialisé votre mot de passe et votre nouveau mot de passe est :"+
                "\n\t"+"Email : "+this.email +
                "\n\t"+"Mot de passe : "+this.password +

                "\n\nLors de votre prochaine connexion, vous serez redirigé(e) vers la page de modification de mot de passe. Nous vous recommandons de choisir un nouveau mot de passe sûr et facile à retenir pour assurer la sécurité de votre compte."+
                "\n\nMerci de votre confiance en nos services."+
                "\n\nCordialement,";

    }
}
