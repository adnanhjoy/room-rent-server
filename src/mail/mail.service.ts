import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendPasswordResetEmail(to: string, resetLink: string): Promise<void> {
    const mailOptions = {
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click this link to reset your password: ${resetLink}. This link will expire in 1 hour.`,
      html: `
        <p>You requested a password reset.</p>
        <p>Click here to reset your password: <a href="${resetLink}">${resetLink}</a></p>
        <p>This link will expire in 1 hour.</p>
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
