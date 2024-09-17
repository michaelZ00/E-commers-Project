const { transporter } = require("../middleware/malier");
const path = require("path"); // Import the path module

module.exports = {
  postContactUs: async (req, res) => {
    try {
      const { name, email, subject, description } = req.body;
      const files = req.files
        ? req.files.map((file) => ({
            filename: file.originalname,
            path: file.path,
            contentType: file.mimetype,
          }))
        : [];

      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Subject:", subject);
      console.log("Description:", description);
      console.log("Files:", files);

      
      const mailOptions = {
        from: email,
        to: process.env.MAILER_AUTH_USER_NAME,
        subject: `${subject}`,
        html: `<p>${description}</p>`,
        attachments: files,
      };

      await transporter.sendMail(mailOptions);

      // Create a new complaint document

      return res.status(201).json({
        message: "contact us submitted successfully",
        success: true,
        // contactUs,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "An error occurred while submitting the message",
        success: false,
        error: error.message,
      });
    }
  },
};
