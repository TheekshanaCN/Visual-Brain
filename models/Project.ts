import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description?: string;
  userId: string;
  data: any; // The visual brain graph data
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this project.'],
      maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    description: {
      type: String,
      required: false,
      maxlength: [200, 'Description cannot be more than 200 characters'],
    },
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    data: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Prevent overwriting the model if it's already compiled
const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
