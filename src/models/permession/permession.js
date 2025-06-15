const mongoose = require("mongoose");

const permissionSchema = mongoose.Schema({
  addMovies: {
    type: Boolean,
    default: false,
  },
  addSongs: {
    type: Boolean,
    default: false,
  },
  actionReport: {
    type: Boolean,
    default: false,
  },
  actionOnAssistance: {
    type: Boolean,
    default: false,
  },
  viewDashboard: {
    type: Boolean,
    default: false,
  },
  onUserAction: {
    type: Boolean,
    default: false,
  },
  deleteUser: {
    type: Boolean,
    default: false,
  },
  editUser: {
    type: Boolean,
    default: false,
  },
  viewLogs: {
    type: Boolean,
    default: false,
  },
  accessSettings: {
    type: Boolean,
    default: false,
  },
  manageRoles: {
    type: Boolean,
    default: false,
  },
  createNotifications: {
    type: Boolean,
    default: false,
  },
  viewAnalytics: {
    type: Boolean,
    default: false,
  },
  banUser: {
    type: Boolean,
    default: false,
  },
  unbanUser: {
    type: Boolean,
    default: false,
  },
  uploadMedia: {
    type: Boolean,
    default: false,
  },
  deleteMedia: {
    type: Boolean,
    default: false,
  },
  manageCategories: {
    type: Boolean,
    default: false,
  },
  approveContent: {
    type: Boolean,
    default: false,
  },
});

module.exports = {
  Permission: mongoose.model("Permission", permissionSchema),
  permissionSchema, // export schema separately
};
