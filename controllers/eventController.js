const Event = require('../models/Event');

// Public: Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('userId', 'name email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

// Protected: Create an event
exports.createEvent = async (req, res) => {
  try {
    const { title, location, date, description } = req.body;

    const event = new Event({
      title,
      location,
      date,
      description,
      userId: req.user.userId // from JWT
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create event' });
  }
};

// Protected: Get user's own events
exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.userId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your events' });
  }
};
