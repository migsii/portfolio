import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPortfolio extends Document {
  about: {
    name: string;
    title: string;
    description: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
  };
  skills: Array<{ category: string; items: string }>;
  experience: Array<{
    role: string;
    company: string;
    location: string;
    period: string;
    current: boolean;
    bullets: string[];
  }>;
  projects: Array<{
    title: string;
    type: string;
    description: string;
    tags: string[];
  }>;
  education: Array<{
    degree: string;
    school: string;
    location: string;
    period: string;
    featured: boolean;
  }>;
}

const PortfolioSchema = new Schema<IPortfolio>({
  about: {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    github: { type: String, required: true },
    linkedin: { type: String, required: true },
  },
  skills: [{ category: String, items: String }],
  experience: [
    {
      role: String,
      company: String,
      location: String,
      period: String,
      current: Boolean,
      bullets: [String],
    },
  ],
  projects: [
    { title: String, type: String, description: String, tags: [String] },
  ],
  education: [
    {
      degree: String,
      school: String,
      location: String,
      period: String,
      featured: Boolean,
    },
  ],
});

const Portfolio: Model<IPortfolio> =
  mongoose.models.Portfolio ||
  mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);
export default Portfolio;
