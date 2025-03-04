import { Document } from "mongoose";

interface IPermission extends Document {
  userId: mongoose.Types.ObjectId;
  channelId: string;
  projectId: string;
  channelAccess: boolean;
  projectAccess: boolean;
  permissisions: {
    script_view: boolean;
    script_edit: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export default IPermission;
