import Blood from "../../models/BloodInventorySchema.js";

export const getAllRecord = async (req, res) => {
  try {
    const getAllRecord = await Blood.find();

    if (getAllRecord.length == []) {
      return res
        .status(201)
        .json({ status: true, message: "Record Not Added" });
    }
    res.status(200).json({
      status: true,
      message: "Successfully found all Records",
      data: getAllRecord,
    });
  } catch (error) {
    res
      .status(404)
      .json({ status: false, message: "Records Not found", error });
  }
};

export const addInventoryRecord = async (req, res) => {
  try {
    const newInventory = new Blood(req.body);
    res.status(200).json({
      status: true,
      message: "New Record Add Successfully",
      data: newInventory,
    });
    await newInventory.save();
  } catch (error) {
    res
      .status(404)
      .json({ status: false, message: "Records Not found", error });
  }
};

export const getSingleRecord = async (req, res) => {
  const id = req.params.id;
  try {
    const getSingleRecord = await Blood.findById(id);
    res.status(200).json({
      status: true,
      message: "Record found Successfully",
      data: getSingleRecord,
    });
  } catch (error) {
    res.status(404).json({ status: false, message: "No Record found", error });
  }
};

export const updateSingleRecord = async (req, res) => {
  try {
    const id = req.params.id;

    const updateSingleRecord = await Blood.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Record update Successfully",
      data: updateSingleRecord,
    });
  } catch (error) {
    res.status(404).json({ status: false, message: "Record Not update" });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteRecord = await Blood.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Record Delete Successfully",
    });
  } catch (error) {
    res
      .status(404)
      .json({ status: false, message: "Record Not Deleted", error });
  }
};
