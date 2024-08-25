import Doner from "../../models/DonerSchema.js";
import Patient from "../../models/PatientSchema.js";
import Appointment from "../../models/AppointmentSchema.js";

export const UpdateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json({
      message: "Status updated successfully",
      data: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const AddAppointment = async (req, res) => {
  try {
    const { patientId, donorId, date, patientDetails } = req.body;
    console.log(patientDetails, "patientDetails");

    // Create new appointment
    if (!patientId || !donorId) {
      res.status(201).json({
        status: false,
        message: "No record Added",
      });
    }
    const newAppointment = new Appointment({
      patientId: patientId,
      donorId: donorId,
      date,
    });
    const appointment = await newAppointment.save();

    // Update Patient's appointments
    await Patient.findByIdAndUpdate(
      patientId,
      {
        $set: {
          reqbloodGroup: patientDetails.reqbloodGroup,
          amountBlood: patientDetails.amountBlood,
          hospitalName: patientDetails.hospitalName,
        },
        $push: {
          appointments: appointment._id, // Add appointment ID to patient's appointments
        },
      },
      { new: true }
    );

    // Update donor's received appointments
    await Doner.findByIdAndUpdate(donorId, {
      $push: { receivedAppointments: appointment._id },
    });

    res.status(200).json({
      status: true,
      message: "Request send successfully",
      data: appointment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const { id } = req.params; // Assuming patientId is passed as a URL parameter
    const appointments = await Appointment.find({ patientId: id })
      .populate("patientId")
      .populate("donorId")
      .sort({ _id: -1 })
      .exec();

    res.status(200).json({
      status: true,
      data: { appointments },
    });

    // const appointments = await Appointment.find()
    //   .populate("patientId")
    //   .populate("donorId")
    //   .exec()
    //   .sort({ _id: -1 });

    // const filteredAppointments = appointments.filter(
    //   (appointment) => appointment.patientId && appointment.donorId
    // );

    // res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the appointment to get patientId and donorId
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const { patientId, donorId } = appointment;

    // Remove the appointment from the database
    await Appointment.findByIdAndDelete(id);

    // Update Patient's document by removing the appointment reference
    await Patient.findByIdAndUpdate(patientId, {
      $pull: { receivedAppointments: { appointmentId: id } },
    });

    // Update Donor's document by removing the appointment reference
    await Doner.findByIdAndUpdate(donorId, {
      $pull: { receivedAppointments: id },
    });

    res.status(200).json({
      status: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
