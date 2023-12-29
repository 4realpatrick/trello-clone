import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "./db";

interface IProps {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
  createFrom?: string;
  copyFrom?: string;
  copyTo?: string;
  deleteFrom?: string;
  updateFrom?: string;
  moveFrom?: string;
  moveTo?: string;
}

export const createAuditLog = async (props: IProps) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();
    if (!user || !orgId) {
      throw new Error("User not found");
    }
    await db.auditLog.create({
      data: {
        ...props,
        orgId,
        userId: user.id,
        userImage: user.imageUrl,
        userName:
          user.firstName || user.lastName
            ? user.firstName || "" + " " + user.lastName || ""
            : user.username || "",
      },
    });
  } catch (error) {
    console.log("Internal Error Found in createAuditLog", error);
  }
};
