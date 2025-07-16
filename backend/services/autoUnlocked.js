import SalesModel from "../models/sales.model.js";
import { io } from "../server.mjs";
const TIME = () => new Date(Date.now() - 1 * 1000);

export const startAutoUnlock = () => {
  setInterval(async () => {
    const expiredLock = await SalesModel.updateMany(
      { isLocked: true, lockedAt: { $lt: TIME() } },
      { $set: { isLocked: false, lockedBy: null, lockedAt: null } }
    );

    if (expiredLock.modifiedCount > 0) {
      io.emit("contentUpdated");
      console.log(`Unlocked ${expiredLock.modifiedCount} expired items`);
    }
  }, 30000);
};
