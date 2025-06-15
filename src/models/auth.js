const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { permissionSchema } = require("./permession/permession");

const authSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      index: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      index: true,
      minlength: 2,
      maxlength: 50,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password must be strong (min 8 characters, with uppercase, lowercase, numbers, and symbols)."
          );
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ZxwCJ0PDLfFEpF09-lMCMhFMtCFoTVUJ0Q&s",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL: " + value);
        }
      },
    },
    image: {},
    about: {
      type: String,
      default: "This is a default about section.",
    },
    skills: {
      type: [String],
    },
    mobileNumber: {
      type: String,
      validate(value) {
        if (!validator.isMobilePhone(value, "any", { strictMode: false })) {
          throw new Error("Invalid mobile number: " + value);
        }
      },
    },
    // In your authSchema
    posts: [
      {
        trendingMovie: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TrendingMovie",
        },
        oldMovie: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "OldMovie",
        },
        southMovie: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SouthMovie",
        },
        hindiMovie: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "HindiMovie",
        },
        regularPost: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    reels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reel",
      },
    ],
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    likedReels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reel",
      },
    ],
    commentsOnPosts: [
      {
        postId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
          required: true,
        },
        comment: {
          type: String,
          required: true,
          trim: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    commentsOnReels: [
      {
        reelId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Reel",
          required: true,
        },
        comment: {
          type: String,
          required: true,
          trim: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    savedReels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reel",
      },
    ],
    watchLater: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reel",
      },
    ],

    likedComments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    dislikedComments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // ---------------------- New Admin & Assistant Fields ----------------------
    role: {
      type: String,
      enum: ["user", "admin", "assistant"],
      default: "user",
    },
    permissions: permissionSchema,
  },
  {
    timestamps: true,
  }
);

// const User = mongoose.model('User' , userSchema )

// module.exports = User

authSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("role")) {
    if (this.role === "admin") {
      this.permissions = Object.fromEntries(
        Object.keys(permissionSchema.obj).map((key) => [key, true])
      );
    } else if (this.role === "assistant") {
      this.permissions = {
        addMovies: true,
        addSongs: true,
        actionOnAssistance: true,
        viewDashboard: true,
        uploadMedia: true,
        approveContent: true,
      };
    } else {
      this.permissions = {
        viewDashboard: true,
      };
    }
  }
  next();
});

authSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "ENTERTENMENT$720", {
    expiresIn: "7d",
  });
  return token;
};

authSchema.methods.validatePassword = async function (passwordInputUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(passwordInputUser, passwordHash);
  return isPasswordValid;
};

// const User = mongoose.model("User", authSchema);

// module.exports = User;

module.exports = mongoose.model("User", authSchema);
