import type { TableColumnList } from "@pureadmin/table";

/** 列表分页参数（支持 currentPage 或 page） */
export type TablePaginationInput = {
  page?: number;
  currentPage?: number;
  pageSize: number;
};

function resolvePage(pagination: TablePaginationInput): number {
  return pagination.page ?? pagination.currentPage ?? 1;
}

/** 计算行序号：(page-1)*pageSize + 行下标 + 1；无分页时从 1 递增 */
export function paginatedRowIndex(
  rowIndex: number,
  pagination?: TablePaginationInput
): number {
  if (!pagination) return rowIndex + 1;
  return (resolvePage(pagination) - 1) * pagination.pageSize + rowIndex + 1;
}

/** pure-table 序号列 */
export function tableIndexColumn(
  pagination?: TablePaginationInput,
  width = 60
): TableColumnList[number] {
  return {
    label: "序号",
    width,
    align: "center",
    cellRenderer: ({ index }: { index: number }) =>
      String(paginatedRowIndex(index, pagination))
  };
}

/** el-table 序号列 index 回调（配合 type="index"） */
export function elTableIndexMethod(pagination?: TablePaginationInput) {
  return (rowIndex: number) => paginatedRowIndex(rowIndex, pagination);
}
