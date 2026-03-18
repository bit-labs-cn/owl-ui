/**
 公共类型定义
 定义普通的结果数据
 不分页的数据
 分页结果数据
 ... more
 */

type Result = {
  success: boolean;
  msg?: string;
  code?: number;
  data?: Array<any>;
};

type ResultList = {
  success: boolean;
  msg?: string;
  code?: number;
  data?: {
    /** 列表数据 */
    list: Array<any>;
  };
};

type ResultTable = {
  success: boolean;
  msg?: string;
  code?: number;
  data?: {
    /** 列表数据 */
    list: Array<any>;
  };
  /** 总条目数 */
  total?: number;
  /** 每页显示条目个数 */
  pageSize?: number;
  /** 当前页数 */
  currentPage?: number;
};
