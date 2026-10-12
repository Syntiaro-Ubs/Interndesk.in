import { Notification } from '../models/index.js';

export const getNotifications = async (req, res) => {
  try {
    const userEmail = req.headers['x-user-email'];
    const where = {};

    if (userEmail) {
      where.userEmail = userEmail.toLowerCase();
    }

    const list = await Notification.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    return res.json(list);
  } catch (err) {
    console.error('getNotifications error:', err);
    return res.status(500).json({ error: err.message || 'Failed to fetch notifications' });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notif = await Notification.findByPk(id);
    if (notif) {
      notif.isRead = true;
      await notif.save();
    }
    return res.json({ success: true, message: 'Notification marked as read' });
  } catch (err) {
    console.error('markNotificationRead error:', err);
    return res.status(500).json({ error: err.message || 'Failed to mark notification as read' });
  }
};
