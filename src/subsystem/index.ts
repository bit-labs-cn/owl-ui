export {
  registerSubsystems,
  getSubsystems,
  getSubsystemRoutes,
  getExtraViewModules,
  getSubsystemMenuContributions
} from "./registry";
export type {
  SubsystemDefinition,
  SubsystemMenuContribution
} from "./types";

import type { SubsystemDefinition } from "./types";

/** 定义一个子系统（提供类型推导和标准化入口） */
export function defineSubsystem(
  definition: SubsystemDefinition
): SubsystemDefinition {
  return definition;
}
