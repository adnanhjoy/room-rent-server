import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendPasswordResetEmail(to: string, resetLink: string): Promise<void> {
    // const mailOptions = {
    //   from: `"Support Team" <${process.env.EMAIL_USER}>`,
    //   to,
    //   subject: 'Password Reset Request',
    //   text: `You requested a password reset. Click this link to reset your password: ${resetLink}. This link will expire in 1 hour.`,
    //   html: `
    //     <p>You requested a password reset.</p>
    //     <p>Click here to reset your password: <a href="${resetLink}">${resetLink}</a></p>
    //     <p>This link will expire in 1 hour.</p>
    //   `,
    // };
    const mailOptions = {
      from: `"Room Rent" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click this link to reset your password: ${resetLink}. This link will expire in 1 hour.`,
      html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset Request</title>
      <style>
          @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
          /* Email client-specific styles */
          body { margin: 0; padding: 0; }
          table { border-collapse: collapse; }
          a { text-decoration: none; }
          .button:hover { background-color: #1d4ed8 !important; }
          @media only screen and (max-width: 600px) {
              .container { padding: 16px !important; }
              .button { padding: 12px 24px !important; }
          }
      </style>
  </head>
  <body style="background-color: #f3f4f6; font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
          <tr>
              <td align="center">
                  <table width="100%" max-width="600px" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                      <!-- Header -->
                      <tr>
                          <td style="background: linear-gradient(to right, #3b82f6, #1e3a8a); padding: 24px; text-align: center;">
                              <img src="https://via.placeholder.com/150x50?text=Your+Logo" alt="Company Logo" style="max-width: 150px; height: auto;">
                          </td>
                      </tr>
                      <!-- Content -->
                      <tr>
                          <td style="padding: 32px; color: #1f2937;">
                              <h1 style="font-size: 24px; font-weight: bold; color: #1e3a8a; margin-bottom: 16px;">Password Reset Request</h1>
                              <p style="font-size: 16px; line-height: 24px; margin-bottom: 16px;">Hello,</p>
                              <p style="font-size: 16px; line-height: 24px; margin-bottom: 16px;">We received a request to reset the password for your account. Click the button below to set a new password.</p>
                              <table width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                      <td align="center" style="padding: 24px 0;">
                                          <a href="${resetLink}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; font-size: 16px; font-weight: 600; padding: 12px 32px; border-radius: 6px; text-decoration: none; transition: background-color 0.2s;" class="button">Reset Your Password</a>
                                      </tr>
                                  </table>
                                  <p style="font-size: 16px; line-height: 24px; margin-bottom: 16px;">This link will expire in 1 hour for your security.</p>
                                  <p style="font-size: 16px; line-height: 24px; margin-bottom: 16px;">If you didn’t request a password reset, please ignore this email or contact our support team at <a href="mailto:support@example.com" style="color: #3b82f6; text-decoration: underline;">support@example.com</a>.</p>
                                  <p style="font-size: 16px; line-height: 24px; margin-bottom: 0;">Best regards,</p>
                                  <p style="font-size: 16px; font-weight: 600; color: #1e3a8a;">The Support Team</p>
                              </td>
                          </tr>
                          <!-- Footer -->
                          <tr>
                              <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
                                  <p style="font-size: 14px; color: #6b7280; margin-bottom: 16px;">© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                                  <table width="100%" cellpadding="0" cellspacing="0">
                                      <tr>
                                          <td align="center">
                                              <a href="https://twitter.com/yourcompany" style="margin: 0 8px;"><img src="https://via.placeholder.com/24x24?text=TW" alt="Twitter" style="width: 24px; height: 24px;"></a>
                                              <a href="https://facebook.com/yourcompany" style="margin: 0 8px;"><img src="https://via.placeholder.com/24x24?text=FB" alt="Facebook" style="width: 24px; height: 24px;"></a>
                                              <a href="https://linkedin.com/company/yourcompany" style="margin: 0 8px;"><img src="https://via.placeholder.com/24x24?text=LI" alt="LinkedIn" style="width: 24px; height: 24px;"></a>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
  </html>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
