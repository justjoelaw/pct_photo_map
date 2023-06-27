import mongoose from 'mongoose';

const trailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Trail = mongoose.model('Trail', trailSchema, 'Trail');

export { Trail };
