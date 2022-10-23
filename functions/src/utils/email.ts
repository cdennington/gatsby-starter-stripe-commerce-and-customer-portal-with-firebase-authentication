import * as functions from 'firebase-functions';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as SibApiV3Sdk from 'sib-api-v3-sdk';

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = `${functions.config().keys.send_in_blue_api_key}`;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

const htmlEmail = (heading: string, body: string, btnText: string, btnLink: string) => `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <title>
        Shop
    </title>
    <meta
        http-equiv="Content-Type"
        content="text/html; charset=UTF-8" />
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0" />
    <meta
        name="format-detection"
        content="telephone=no" />
    <meta
        name="format-detection"
        content="date=no" />
    <meta
        name="format-detection"
        content="address=no" />
    <meta
        name="format-detection"
        content="email=no" />
    <style
        type="text/css">
        #outlook a {
            padding: 0;
        }

        .ExternalClass {
            width: 100% !important;
        }

        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
            line-height: 100%;
        }

        .ExternalClass img[class^=Emoji] {
            display: inline !important;
            height: 10px !important;
            width: 10px !important;
        }

        .applelinks a {
            color: #464646;
            text-decoration: none;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        body {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: none;
        }

        table {
            *border-collapse: expression('collapse', cellSpacing='0');
        }

        p {
            margin: 0;
            padding: 0;
            margin-bottom: 15px;
        }

        a {
            color: #ff1364;
            text-decoration: none;
        }

        .button a {
            color: #ff1364;
            display: block;
            text-decoration: none;
        }

        @media screen and (max-width: 635px) {

            .row,
            .content {
                height: auto !important;
                width: 100% !important;
            }

            .no-padding {
                padding-left: 0 !important;
                padding-right: 0 !important;
            }

            .mobile-no-border {
                border-right: 0 !important;
            }

            .mobile-img {
                height: auto !important;
                width: 100% !important;
            }

            .mobile-hide {
                display: none !important;
            }

            .mobile-show {
                display: block !important;
            }

            .col {
                float: left !important;
                width: 100% !important;
            }

            .col .block {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }

            .mobile-bottom-padding {
                padding-bottom: 30px !important;
            }
        }
    </style>
    <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
        table {
            border-collapse: collapse !important !important;
        }
    </style>
    <![endif]-->
    <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
</head>

<body
    style="background-color: #f1f1f1; margin: 0; padding: 0px; text-align: left;">
    <table
        cellpadding="0"
        cellspacing="0"
        border="0"
        width="100%"
        style="border: 0; background-color: #f1f1f1; width: 100%;">
        <tr>
            <td
                style="padding: 0;">
                <table
                    width="635"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    align="center"
                    valign="top"
                    style="border: 0; margin: 0 auto;">
                    <tr>
                        <td
                            style="padding: 0; background-color: rgb(255, 255, 255);">
                            <table
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                width="100%"
                                style="border: 0;">
                                <tr>
                                    <td width="635"
                                        valign="top"
                                        style="padding: 0; background-color: #fafdff;">
                                        <!-- Image Block -->
                                        <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            border="0"
                                            width="100%"
                                            style="border: 0;">
                                            <tr>
                                                <td align="center"
                                                    style="padding: 40px 35px; line-height: 0px; font-size: 0px; margin: 0;">
                                                    <a href="${functions.config().keys.domain}"
                                                        style="display: block;">
                                                        <img border="0"
                                                            width="100"
                                                            align="center"
                                                            src=""
                                                            alt="Logo"
                                                            style="border: 0; display: block; outline: none; text-decoration: none;" />
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    ${heading !== null && (
    `<tr>
                            <td
                                style="padding: 0; background-color: rgb(255, 255, 255);">
                                <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    width="100%"
                                    style="border: 0;">
                                    <tr>
                                        <td width="635"
                                            valign="top"
                                            style="padding: 0; background-color: rgb(255, 255, 255);">
                                            <!-- Image Block -->
                                            <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                border="0"
                                                width="100%"
                                                style="border: 0;">
                                                <tr>
                                                    <td style="padding: 25px 35px 20px; font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; color: #3a3d3f; font-size: 30px; line-height: 40px; margin: 0;font-weight: bold;">
                                                        ${heading}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>`
  )}
                    <tr>
                        <td
                            style="padding: 0; background-color: rgb(255, 255, 255);">
                            <table
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                width="100%"
                                style="border: 0;">
                                <tr>
                                    <td width="635"
                                        valign="top"
                                        style="padding: 0 20px; background-color: rgb(255, 255, 255);">
                                        <!-- Image Block -->
                                        <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            border="0"
                                            width="100%"
                                            style="border: 0;">
                                            <tr>
                                                <td width="100%"
                                                    valign="top"
                                                    style="font-weight:normal;padding: 0 15px;margin: 0;">
                                                    <table
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        border="0"
                                                        width="100%"
                                                        style="border: 0;">
                                                        ${body !== null && (`
                                                        <tr>
                                                            <td style="padding: 0;margin: 0;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; color: #000000; font-size: 12px; line-height: 16px;">
                                                                ${body}
                                                            </td>
                                                        </tr>
                                                        `)}
                                                        ${btnLink !== null && btnText !== null && (
    `<tr>
                                                            <td align="center"
                                                                width="100%"
                                                                style="padding: 0 0 30px;margin: 0;">
                                                                <table
                                                                    cellpadding="0"
                                                                    cellspacing="0"
                                                                    border="0"
                                                                    width="100%"
                                                                    style="border: 0;">
                                                                    <tr>
                                                                        <td width="100%"
                                                                            style="background-color:#ff1364;color:#ffffff;display:inline-block;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;line-height:17px;text-align:center;text-decoration:none;-webkit-text-size-adjust:none;padding: 10px 0; margin: 0;">
                                                                            <a href="${btnLink}"
                                                                                style="color: #ffffff; font-size: 13px; line-height: 17px; margin: 0;text-decoration: none;">
                                                                                ${btnText}
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>`
  )}
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td width="600"
                            valign="top"
                            style="padding: 0; background-color: #fafdff;">
                            <!-- Text Block -->
                            <table
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                width="100%"
                                style="border: 0; background-color: #fafdff;">
                                <tr>
                                    <td style="padding: 10px 130px;text-align:center;font-family: Arial,'Helvetica Neue',Helvetica,sans-serif; color: #3a3d3f; font-size: 8px; line-height: 10px; margin: 0;">
                                        You
                                        are
                                        receiving
                                        this
                                        email
                                        because
                                        you
                                        are
                                        a
                                        current
                                        customer
                                        of
                                        Shop.
                                        Please
                                        <a href="https://shop.com/"
                                            style="color: #3a3d3f; font-size: 8px; line-height: 10px; margin: 0;text-decoration: underline;">visit
                                            our
                                            website</a>
                                        to
                                        view
                                        our
                                        our
                                        privacy
                                        policy.
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
</html>`;

const sendEmail = (
  to: string,
  nameTo: string | null | undefined,
  subject: string,
  heading: string,
  body: string,
  btnText: string,
  btnLink: string,
) => {
  const sender = { name: 'Shop', email: 'no-reply@shop.com' };

  sendSmtpEmail.subject = `${subject}`;
  sendSmtpEmail.htmlContent = htmlEmail(heading, body, btnText, btnLink);
  sendSmtpEmail.sender = sender;
  sendSmtpEmail.to = [{ email: `${to}`, name: `${nameTo}` }];
  sendSmtpEmail.replyTo = sender;

  apiInstance.sendTransacEmail(sendSmtpEmail).then(() => {
    console.warn('email sent');
  }, (error: Record<string, unknown>) => {
    console.error(error);
  });
};

export default sendEmail;
