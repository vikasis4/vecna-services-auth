const otpTemplate = (otp: any) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vecna OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f7fc;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 500px;
                margin: 40px auto;
                background: #ffffff;
                border-radius: 10px;
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                padding: 20px;
                text-align: center;
            }
            .logo {
                width: 120px;
                margin-bottom: 20px;
            }
            .title {
                font-size: 22px;
                font-weight: bold;
                color: #004AAD;
                margin-bottom: 10px;
            }
            .message {
                font-size: 16px;
                color: #333;
                margin-bottom: 20px;
            }
            .otp {
                font-size: 26px;
                font-weight: bold;
                color: #004AAD;
                padding: 10px 20px;
                background: #eaf2ff;
                display: inline-block;
                border-radius: 5px;
                margin: 10px 0;
            }
            .note {
                font-size: 14px;
                color: #666;
                margin-top: 20px;
            }
            .footer {
                font-size: 12px;
                color: #888;
                margin-top: 30px;
            }
        </style>
    </head>
    <body>

        <div class="container">
            <img class="logo" src="https://i.ibb.co/KcLPr4hx/logo.png" alt="Vecna Logo">
            
            <p class="title">OTP Verification</p>
            
            <p class="message">Use the following OTP to verify your identity. This OTP is valid for <strong>5 minutes</strong>.</p>
            
            <p class="otp">${otp}</p> <!-- Injecting Dynamic OTP Here -->
            
            <p class="note">If you did not request this OTP, please ignore this email or contact our support team.</p>
            
            <p class="footer">Vecna | Secure & Reliable Authentication</p>
        </div>

    </body>
    </html>`;
export default otpTemplate