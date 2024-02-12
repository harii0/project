const Doctor = require("../models/Doctor");

async function handleGetDoctor(req, res) {
  try {
    const { userId } = req.params;
    const doctor = await Doctor.findById(userId);
    if (!doctor) {
      res.status(404).json({ message: "Doctor not found" });
      return;
    }
    console.log("Doctor found:", doctor);
    return res.status(200).json({ doctor });
  } catch (error) {
    console.error("Error getting doctor:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function handleApproveDoctor(req, res) {
  try {
    const { userId } = req.params;
    const doctor = await Doctor.findById(userId);
    if (!doctor) {
      res.status(404).json({ message: "Doctor not found" });
      return;
    }
    doctor.role = "doctor";
    doctor.status = "approved";
    await doctor.save();
    console.log("Doctor approved:", doctor);
    return res.status(200).json({ doctor });
  } catch (error) {
    console.error("Error approving doctor:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function handleRejectDoctor(req, res) {
  try {
    const { userId } = req.params;
    // Attempt to find and delete the doctor by their ID
    const doctor = await Doctor.findById(userId);
    if (!doctor) {
      res.status(404).json({ message: "Doctor not found" });
      return;
    }
    doctor.status = "rejected";
    await doctor.save();
    const deletedDoctor = await Doctor.findByIdAndDelete(userId);
    // If no doctor was found (and thus not deleted), return a 404
    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Otherwise, log and return a success message
    console.log("Doctor deleted:", deletedDoctor);
    const message = `Doctor ${deletedDoctor.username} has been successfully deleted.`;
    return res.status(200).json({ message });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Get all doctors
async function handleGetAllDoctors(req, res) {
  try {
    const doctors = await Doctor.find({ role: "doctor", status: "approved" });
    if (!doctors) {
      return res.status(404).json({ message: "No doctors found" });
    }
    const doctorData = doctors.map((doctor) => ({
      id: doctor._id,
      username: doctor.username,
      email: doctor.email,
      status: doctor.rating,
      experience: doctor.experience,
      description: doctor.description,
    }));
    return res.status(200).json({ doctorData });
  } catch (error) {
    console.error("Error getting doctors:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  handleGetDoctor,
  handleApproveDoctor,
  handleRejectDoctor,
  handleGetAllDoctors,
};
