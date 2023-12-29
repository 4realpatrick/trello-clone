import { ACTION, AuditLog } from "@prisma/client";

export const generateLogMessage = (log: AuditLog) => {
  const {
    action,
    entityTitle,
    entityTitleFrom,
    entityType,
    entityDesc,
    entityDescFrom,
    copyFrom,
    copyTo,
    createFrom,
    deleteFrom,
    moveFrom,
    moveTo,
  } = log;
  switch (action) {
    case ACTION.CREATE:
      if (entityType === "BOARD") {
        return `created ${entityType.toLocaleLowerCase()} "${entityTitle}" at organization "${createFrom}"`;
      } else if (entityType === "LIST") {
        return `created ${entityType.toLocaleLowerCase()} "${entityTitle}" at board "${createFrom}"`;
      } else {
        return `created ${entityType.toLocaleLowerCase()} "${entityTitle}" at list "${createFrom}"`;
      }
    case ACTION.UPDATE:
      let updateResult = "";
      if (entityTitle !== entityTitleFrom) {
        updateResult += `update card name from "${entityTitleFrom}" to "${entityTitle}"`;
      } else if (entityDesc !== entityDescFrom) {
        updateResult += `update description from "${
          entityDescFrom || ""
        }" to "${entityDesc}"`;
      }
      return updateResult;
    case ACTION.DELETE:
      if (entityType === "BOARD") {
        return `delete ${entityType.toLocaleLowerCase()} "${entityTitle}" at organization "${createFrom}"`;
      } else if (entityType === "LIST") {
        return `delete ${entityType.toLocaleLowerCase()} "${entityTitle}" at board "${createFrom}"`;
      } else {
        return `delete ${entityType.toLocaleLowerCase()} "${entityTitle}" at list "${createFrom}"`;
      }
    case ACTION.COPY:
    case ACTION.MOVE:

    default:
      return `unknown action ${entityType.toLocaleLowerCase()} "${entityTitle}`;
  }
};
