import IPermission from "@/types/models/permission";
import mongoose, { Schema } from "mongoose";

const model = new Schema<IPermission>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  channelId: { type: String, required: true },
  projectId: { type: String, required: true },
  channelAccess: { type: Boolean, required: true, default: true },
  projectAccess: { type: Boolean, required: true, default: false },
  permissisions: {
    script_view: { type: Boolean, required: true, default: false },
    script_edit: { type: Boolean, required: true, default: false },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const PermissionModel = mongoose.model<IPermission>("Permission", model);

export default PermissionModel;
