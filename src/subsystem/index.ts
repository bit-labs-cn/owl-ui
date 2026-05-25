export {
  registerSubsystems,
  getSubsystems,
  getSubsystemRoutes,
  getExtraViewModules,
  getSubsystemMenuContributions,
  getLoginCustomization
} from "./registry";
export type {
  SubsystemDefinition,
  SubsystemMenuContribution,
  SubsystemLoginCustomization
} from "./types";

import type { SubsystemDefinition } from "./types";

/** 定义一个子系统（提供类型推导和标准化入口） */
export function defineSubsystem(
  definition: SubsystemDefinition
): SubsystemDefinition {
  return definition;
}
