import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface DemoRequestData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

export async function sendDemoRequestNotification(
  demoData: DemoRequestData
): Promise<boolean> {
  try {
    const emailHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">Nouvelle Demande de Démo - Paycode DRC</h1>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-top: none;">
              <h2 style="color: #1e40af; margin-top: 0;">Informations du Client</h2>
              
              <div style="background: white; padding: 15px; border-radius: 6px; margin: 15px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <p style="margin: 5px 0;"><strong>Nom:</strong> ${demoData.name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${demoData.email}" style="color: #1e40af;">${demoData.email}</a></p>
                <p style="margin: 5px 0;"><strong>Entreprise:</strong> ${demoData.company}</p>
                <p style="margin: 5px 0;"><strong>Téléphone:</strong> <a href="tel:${demoData.phone}" style="color: #1e40af;">${demoData.phone}</a></p>
              </div>
              
              <div style="background: white; padding: 15px; border-radius: 6px; margin: 15px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h3 style="color: #1e40af; margin-top: 0;">Message:</h3>
                <p style="background: #f1f5f9; padding: 10px; border-left: 4px solid #1e40af; margin: 0;">${demoData.message}</p>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 6px; border-left: 4px solid #1e40af;">
                <p style="margin: 0; font-size: 14px; color: #1e40af;">
                  <strong>Action requise:</strong> Veuillez contacter ce client dans les plus brefs délais pour planifier une démonstration de nos solutions Paycode DRC.
                </p>
              </div>
            </div>
            
            <div style="background: #1e40af; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; font-size: 12px;">© 2025 Paycode Fintech Congo - Agrégateur de Paiements Agréé</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
Nouvelle Demande de Démo - Paycode DRC

Informations du Client:
- Nom: ${demoData.name}
- Email: ${demoData.email}
- Entreprise: ${demoData.company}
- Téléphone: ${demoData.phone}

Message:
${demoData.message}

Action requise: Veuillez contacter ce client dans les plus brefs délais pour planifier une démonstration de nos solutions Paycode DRC.

© 2025 Paycode Fintech Congo - Agrégateur de Paiements Agréé
    `;

    await mailService.send({
      to: 'Ahmad.Diallo@paycode.com',
      from: 'noreply@paycode.com',
      subject: `🚀 Nouvelle Demande de Démo - ${demoData.company} (${demoData.name})`,
      text: emailText,
      html: emailHtml,
    });

    console.log(`Demo request notification sent successfully for ${demoData.name} from ${demoData.company}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}