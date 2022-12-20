import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Branch',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    criticalWorkFunctions: [
      {
        function: {
          type: String,
          required: true,
        },
        keyTasks: [String],
      },
    ],
    skillsAndCompetencies: {
      technicalSkills: [
        {
          skill: {
            type: String,
            required: true,
          },
          level: {
            type: Number,
            required: true,
          },
        },
      ],
      genericSkills: [
        {
          skill: {
            type: String,
            required: true,
          },
          level: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);

export default Job;
