export { subsystemRegistry } from "./registry";
export type { SubsystemRegistry } from "./registry";
export type {
  SubsystemDefinition,
  SubsystemMenuContribution,
  SubsystemLoginCustomization
} from "./types";

import type { SubsystemDefinition } from "./types";

/** 定义一个子系统，方便类型推导。本身不保存状态。 */
export function defineSubsystem(
  definition: SubsystemDefinition
): SubsystemDefinition {
  return definition;
}
