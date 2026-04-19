const Request = require("../models/Request");
const { detectUrgency, categorizeRequest, suggestTags, generateAISummary } = require("../utils/aiHelpers");

// CREATE with AI features
exports.createRequest = async (req, res) => {
  try {
    const { title, description, category, tags, urgency } = req.body;

    // AI auto-detection if not provided
    const finalUrgency = urgency || detectUrgency(description);
    const finalCategory = category || categorizeRequest(title, description);
    const suggestedTags = tags && tags.length > 0 ? tags : suggestTags(title, description);

    const request = await Request.create({
      title,
      description,
      category: finalCategory,
      tags: suggestedTags,
      urgency: finalUrgency,
      user: req.user.id,
    });

    res.json(request);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET ALL with filters
exports.getRequests = async (req, res) => {
  const { category, urgency, skills, location } = req.query;

  let filter = {};

  if (category) filter.category = category;
  if (urgency) filter.urgency = urgency;
  if (location) filter.location = new RegExp(location, 'i');
  if (skills) {
    const skillArray = skills.split(',').map(s => s.trim());
    filter.tags = { $in: skillArray };
  }

  const requests = await Request.find(filter).populate("user", "name location");

  res.json(requests);
};

// MARK SOLVED
exports.markSolved = async (req, res) => {
  await Request.findByIdAndUpdate(req.params.id, {
    status: "solved",
  });

  res.json({ msg: "Marked as solved" });
};

// GET STATS
exports.getStats = async (req, res) => {
  const total = await Request.countDocuments({ user: req.user.id });
  const solved = await Request.countDocuments({
    user: req.user.id,
    status: "solved",
  });
  const pending = total - solved;

  res.json({ total, solved, pending });
};


exports.getSingleRequest = async (req, res) => {
  const request = await Request.findById(req.params.id)
    .populate("user", "name");

  // Add AI summary
  const aiSummary = generateAISummary(request);

  res.json({
    ...request.toObject(),
    aiSummary
  });
};