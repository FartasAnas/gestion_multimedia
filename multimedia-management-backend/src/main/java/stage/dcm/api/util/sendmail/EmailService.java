package stage.dcm.api.util.sendmail;

import javax.mail.MessagingException;

public interface EmailService {
    String sendSimpleMail(EmailDetails details);

    // Method
    // To send an email with attachment
    String sendMailWithAttachment(EmailDetails details) throws MessagingException;
}
