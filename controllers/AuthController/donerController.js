import Doner from "../../models/DonerSchema.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const getAllDoner = async (req, res) => {
  try {
    const getAllDoner = await Doner.find()
      .select("-password")
      .sort({ _id: -1 });

    res.status(200).json({
      status: true,
      message: "Successfully found all Doner",
      data: getAllDoner,
    });
  } catch (error) {
    res.status(404).json({ status: false, message: "Doners Not found" });
  }
};

export const getSingleDoner = async (req, res) => {
  const id = req.params.id;
  try {
    const getSingleDoner = await Doner.findById(id).populate({
      path: "receivedAppointments",
      populate: {
        path: "patientId", // populate both patient and donor details within each appointment
      },
    });
    res.status(200).json({
      status: true,
      message: "Doner found Successfully",
      data: getSingleDoner,
    });
  } catch (error) {
    res.status(404).json({ status: false, message: "Doner Not found" });
  }
};

export const updateSingleDoner = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
    }
    const updateSingleDoner = await Doner.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Doner update Successfully",
      result: updateSingleDoner,
    });
  } catch (error) {
    res.status(404).json({ status: false, message: "Doner Not update" });
  }
};

export const deleteDoner = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteDoner = await Doner.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Doner delete Successfully",
    });
  } catch (error) {
    res.status(404).json({ status: false, message: "Doner Not delete" });
  }
};

export const sendEmail = async (req, res) => {
  // const { donerEmail, patientDetails, donerBloodGroup } = req.body;
  // var transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   auth: {
  //     user: process.env.ADMIN_EMAIL,
  //     pass: process.env.ADMIN_PASSWORD,
  //   },
  //   service: "Gmail",
  //   tls: { rejectUnauthorized: false },
  // });
  // var mailOptions = {
  //   from: `"Blood Seekers" <${patientDetails.email}>`,
  //   to: donerEmail,
  //   subject: "New Patient Request",
  //   html: `
  //   <table>
  //     <tr>
  //       <th style="background-color: #d20005;color:#fff;">Patient</th>
  //     <th style="background-color: #d20005;color:#fff;">Details</th>
  //     </tr>
  //     <tr width="70%">
  //       <td>Name</td>
  //       <td>${patientDetails.name}</td>
  //     </tr>
  //     <tr>
  //       <td>Email</td>
  //       <td>${patientDetails.email}</td>
  //     </tr>
  //      <tr>
  //       <td>Phone</td>
  //       <td>${patientDetails.phone}</td>
  //     </tr>
  //     <tr>
  //       <td>Amount of blood required</td>
  //       <td>${patientDetails.amountBlood}</td>
  //     </tr>
  //     <tr>
  //       <td>Required Blood Group</td>
  //       <td>${patientDetails.reqbloodGroup}</td>
  //     </tr>
  //     <tr>
  //     <td>Hospital Name</td>
  //     <td>${patientDetails.hospitalName}</td>
  //   </tr>
  //   </table>
  //   <head>
  //   <style>
  //   table {
  //     border-collapse: collapse;
  //     width: 70%;
  //     border: 1px solid black;
  //   }
  //   table, th, td {
  //     padding: 8px;
  //     text-align: left;
  //     border: 1px solid #DDD;
  //   }
  //   </style>
  //   </head>
  //   <body>
  //   </body>
  //       `,
  // };
  // try {
  //   // Email send karein
  //   transporter.sendMail(mailOptions);
  //   res.status(200).json({ message: "Message sent successfully" });
  // } catch (error) {
  //   console.error("Error sending email:", error);
  //   res.status(500).json({ error: "Failed to send a message to user" });
  // }
};

export const getDonorAppointments = async (req, res) => {
  try {
    const { donorId } = req.params;
    const donor = await Donor.findById(donorId)
      .select("-password")
      .populate("receivedAppointments")
      .populate("patientDetails");

    if (!donor) {
      return res.status(404).json({ error: "Donor not found" });
    }
    res.status(200).json(donor.receivedAppointments, donor.patientDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
