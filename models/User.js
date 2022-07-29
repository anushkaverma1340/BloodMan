const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  availability: {
    Apositive: {
      type: Number,
      default: 0
    },
    Anegative: {
      type: Number,
      default: 0
    },
    Bpositive: {
      type: Number,
      default: 0
    },
    Bnegative: {
      type: Number,
      default: 0
    },
    ABpositive: {
      type: Number,
      default: 0
    },
    ABnegative: {
      type: Number,
      default: 0
    },
    Opositive: {
      type: Number,
      default: 0
    },
    Onegative: {
      type: Number,
      default: 0
    }
  },
  donatedBy: {
    type: [{
      donorName: {
        type: String,
        required: true
      },
      donorContactNumber: {
        type: String,
        required: true
      },
      donorEmail: {
        type: String,
        required: true
      },
      donorAddress: {
        type: String,
        required: true
      },
      donorBloodGroup: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      }
    }],
    default: []
  },
  receivedBy: {
    type: [{
      receiverName: {
        type: String,
        required: true
      },
      receiverContactNumber: {
        type: String,
        required: true
      },
      receiverEmail: {
        type: String,
        required: true
      },
      receiverAddress: {
        type: String,
        required: true
      },
      receiverBloodGroup: {
        type: String,
        required: true
      },
      receivedAmount: {
        type: Number,
        required: true
      },
      date: {
        type: String,
        required: true
      }
    }],
    default: [],
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
