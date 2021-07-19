import mailgun from "mailgun-js";

const mg = mailgun({apiKey: process.env.API_KEY, domain: process.env.DOMAIN});

const sendMail = async (res, from, to, subject, activationUrl, message) => {
    const html = `
      <div style="padding: 50px 20px; max-width: 700px; margin: auto; border: 10px solid lightgrey;">
      <h2 style="text-align: center;text-transform: uppercase;color: teal; margin-bottom: 2rem;">Welcome</h2>
      <p>Congratulations! You are almost set. Click on the button below to ${message}.</p>
      <a style="  color: white; background: crimson; padding: 10px 20px;margin: 10px;" href=${activationUrl}>Verify your email addres</a>
      <p>If the button doesn't work for any reason, you can click the link below:</p>
      <div>${activationUrl}</div>
      <br>
       <em><strong>NOTE: </strong><span>The link will expire in 30 minutes, please verify to avoid re-entering your details to signup again.</span></em>
      </div>
`

    const data = {
        from,
        to,
        subject,
        html
    };


    try {
        await mg.messages().send(data, function (error, body) {
            console.log(body);
            console.log(error);
        });
    } catch (err) {
        return res.status(500).json({message: "Something went wrong, could not process your request."})
    }
};

export default sendMail;