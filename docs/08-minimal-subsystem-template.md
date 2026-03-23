# 最小前端子系统模板

本篇给出一个**可直接复制**的独立前端子系统包骨架。目标：新建一个 npm 包，依赖 `@bit-labs.cn/owl-ui`，导出 `defineSubsystem()`，由宿主在 `createFlexAdmin({ subsystems: [cmsSubsystem] })` 中注册；包内包含一个标准 CRUD 页（以文章为例），后端菜单的 path/component 需与该包的 `viewModulesPathPrefix` 一致。

## 适用场景

- 新建独立业务子系统（如 CMS、设备管理），与 owl-admin-ui **平级**，不是往 owl-admin-ui 里加页面。
- 宿主应用安装该包后，通过 `createFlexAdmin({ subsystems: [yourSubsystem] })` 注册；菜单可由后端下发或通过 `menuContributions` 挂到已有父菜单下。

## 最小目录结构

```text
cms-ui/
├── package.json
├── src/
│   ├── index.ts
│   ├── routes/
│   │   └── index.ts
│   ├── api/
│   │   └── article.ts
│   └── views/
│       └── article/
│           ├── index.vue
│           ├── useArticleList.ts
│           ├── columns.tsx
│           ├── ArticleForm.vue
│           └── types.ts
```

## package.json

```json
{
  "name": "@your-org/cms-ui",
  "version": "1.0.0",
  "type": "module",
  "main": "src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./*": "./src/*"
  },
  "peerDependencies": {
    "@bit-labs.cn/owl-ui": "^1.0.0"
  },
  "engines": {
    "node": "^18.18.0 || ^20.9.0 || >=22.0.0",
    "pnpm": ">=9"
  }
}
```

说明：若宿主使用 workspace，可加 `"@bit-labs.cn/owl-ui": "workspace:*"` 在 dependencies。构建由宿主或本包自己的 vite 配置负责，此处仅包入口。

## src/index.ts

```ts
import { defineSubsystem } from "@bit-labs.cn/owl-ui";
import routes from "./routes";

export default defineSubsystem({
  name: "cms",
  routes,
  viewModulesPathPrefix: "/cms",
  viewModules: import.meta.glob("./views/**/*.{vue,tsx}"),
  menuContributions: [
    {
      targetMenuName: "SystemRbac",
      menus: [
        {
          path: "/cms/article/index",
          name: "CmsArticle",
          component: "/cms/article/index",
          meta: { title: "文章管理", icon: "ep:document", rank: 30, showLink: true }
        }
      ]
    }
  ]
});
```

说明：`viewModulesPathPrefix: "/cms"` 与后端菜单的 path/component 前缀一致时，动态路由才能解析到 `./views/article/index.vue`。若菜单完全由后端返回，可省略 `menuContributions`，只需后端配置 path 为 `/cms/article/index`、name 为 `CmsArticle`。

## src/routes/index.ts

可选。若子系统有需要直接挂在根下的静态路由（如独立首页），可在此声明；否则可导出空数组。

```ts
const Layout = () => import("@bit-labs.cn/owl-ui/layout/index.vue");

export default [
  {
    path: "/",
    name: "CmsRoot",
    component: Layout,
    redirect: "/cms/article/index",
    meta: { title: "内容管理", icon: "ep:folder", rank: 20 },
    children: []
  }
] satisfies RouteConfigsTable[];
```

若不需要静态路由，可简化为：

```ts
export default [] satisfies RouteConfigsTable[];
```

## src/api/article.ts

```ts
import { http } from "@bit-labs.cn/owl-ui/utils/http";

export type ResultTable = { list?: any[]; total?: number; pageSize?: number; currentPage?: number };

export const articleAPI = {
  getList: (params?: object) =>
    http.request<ResultTable>("get", "/api/v1/articles", { params }, { silentMessage: true }),
  create: (data?: object) => http.request("post", "/api/v1/articles", { data }),
  update: (data?: object) => http.request("put", `/api/v1/articles/${(data as any)?.id}`, { data }),
  delete: (id: string | number) => http.request("delete", `/api/v1/articles/${id}`)
};
```

URL 与后端 route 注册路径一致。

## src/views/article/types.ts

```ts
export interface ArticleFormData {
  id?: string;
  title: string;
  content: string;
  status: number;
}
```

字段名与后端 JSON tag 一致；状态与后端常量一致（如 1 启用 2 禁用）。

## src/views/article/useArticleList.ts

```ts
import { reactive, ref, onMounted, toRaw } from "vue";
import type { PaginationProps } from "@pureadmin/table";
import { articleAPI } from "../../api/article";

export function useArticleList() {
  const form = reactive({ title: "", status: "" });
  const dataList = ref([]);
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  async function onSearch() {
    loading.value = true;
    const payload: any = toRaw(form);
    payload.page = pagination.currentPage;
    payload.pageSize = pagination.pageSize;
    const { data } = await articleAPI.getList(payload);
    dataList.value = data?.list ?? [];
    pagination.total = data?.total ?? 0;
    pagination.currentPage = data?.currentPage ?? pagination.currentPage;
    loading.value = false;
  }

  function resetForm(formEl: any) {
    formEl?.resetFields();
    onSearch();
  }

  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    pagination.currentPage = 1;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
  }

  onMounted(() => onSearch());

  return { form, dataList, loading, pagination, onSearch, resetForm, handleSizeChange, handleCurrentChange };
}
```

## src/views/article/columns.tsx

```tsx
export function createColumns(): TableColumnList {
  return [
    { label: "ID", prop: "id", width: 80 },
    { label: "标题", prop: "title", minWidth: 160 },
    { label: "状态", prop: "status", minWidth: 100 },
    { label: "创建时间", prop: "createdAt", minWidth: 160 },
    { label: "操作", fixed: "right", width: 160, slot: "operation" }
  ];
}
```

## src/views/article/ArticleForm.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import type { ArticleFormData } from "./types";

const props = defineProps<{ formInline: ArticleFormData }>();
const ruleFormRef = ref();
const newFormInline = ref<ArticleFormData>({
  id: props.formInline?.id,
  title: props.formInline?.title ?? "",
  content: props.formInline?.content ?? "",
  status: props.formInline?.status ?? 1
});

const rules = { title: [{ required: true, message: "请输入标题", trigger: "blur" }] };

function getRef() {
  return ruleFormRef.value;
}
defineExpose({ getRef, getFormData: () => newFormInline.value });
</script>

<template>
  <el-form ref="ruleFormRef" :model="newFormInline" :rules="rules" label-width="80px">
    <el-form-item label="标题" prop="title">
      <el-input v-model="newFormInline.title" placeholder="请输入标题" clearable />
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input v-model="newFormInline.content" type="textarea" placeholder="请输入内容" />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-radio-group v-model="newFormInline.status">
        <el-radio :value="1">启用</el-radio>
        <el-radio :value="2">禁用</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>
```

## src/views/article/index.vue

页面 name 必须与后端菜单项 name 一致（如 `CmsArticle`），否则多标签/keep-alive 异常。

```vue
<script setup lang="ts">
import { ref, h } from "vue";
import { useArticleList } from "./useArticleList";
import { createColumns } from "./columns";
import ArticleForm from "./ArticleForm.vue";
import type { ArticleFormData } from "./types";
import { articleAPI } from "../../api/article";
import { addDialog } from "@bit-labs.cn/owl-ui/components/ReDialog";
import { PureTableBar } from "@bit-labs.cn/owl-ui/components/RePureTableBar";

defineOptions({ name: "CmsArticle" });

const formRef = ref();
const articleFormRef = ref();
const { form, loading, dataList, pagination, onSearch, resetForm, handleSizeChange, handleCurrentChange } = useArticleList();
const columns = createColumns();

function openDialog(title = "新增", row?: ArticleFormData) {
  addDialog({
    title: `${title}文章`,
    props: {
      formInline: {
        id: row?.id,
        title: row?.title ?? "",
        content: row?.content ?? "",
        status: row?.status ?? 1
      }
    },
    width: "500px",
    contentRenderer: ({ options }) => h(ArticleForm, { ref: articleFormRef, formInline: options.props.formInline }),
    beforeSure: (done) => {
      const FormRef = articleFormRef.value.getRef();
      const curData = articleFormRef.value.getFormData() as ArticleFormData;
      FormRef.validate((valid: boolean) => {
        if (valid) {
          (curData.id ? articleAPI.update(curData) : articleAPI.create(curData)).then(() => {
            done();
            onSearch();
          });
        }
      });
    }
  });
}

function handleDelete(row: { id: string | number }) {
  articleAPI.delete(row.id).then(() => onSearch());
}
</script>

<template>
  <div class="main">
    <el-form ref="formRef" :inline="true" :model="form" class="search-form">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="标题" clearable class="!w-[180px]" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="resetForm(formRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <PureTableBar :columns="columns" @refresh="onSearch">
      <template #buttons>
        <el-button type="primary" @click="openDialog()">新增</el-button>
      </template>
      <template #tableSlot="{ row }">
        <el-button link type="primary" @click="openDialog('编辑', row)">编辑</el-button>
        <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
      </template>
    </PureTableBar>
    <pure-table :data="dataList" :columns="columns" :pagination="pagination" :loading="loading" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <template #operation="{ row }">
        <el-button link type="primary" @click="openDialog('编辑', row)">编辑</el-button>
        <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
      </template>
    </pure-table>
  </div>
</template>
```

说明：若宿主未安装 `@pureadmin/table`，需在包中声明依赖或使用 owl-ui 提供的表格组件；此处与 owl-admin-ui 的 position 模式保持一致，便于复制。

## 宿主接入

宿主应用（如集成后台 + CMS 的 SPA）中：

```ts
import { createFlexAdmin } from "@bit-labs.cn/owl-ui";
import cmsSubsystem from "@your-org/cms-ui";

const app = await createFlexAdmin({ subsystems: [cmsSubsystem] });
app.mount("#app");
```

后端需提供 `/api/v1/articles` 接口，且菜单接口返回的菜单项中，对应本页的项 `name` 为 `CmsArticle`、path 或 component 为 `/cms/article/index`（与 `viewModulesPathPrefix` + 视图路径一致）。

## 完成定义

- 按本文复制后，得到一个独立的前端子系统包，可被宿主通过 `createFlexAdmin({ subsystems: [sub] })` 注册。
- 后端菜单的 path/component 与包内 `viewModulesPathPrefix` 及 `views/` 路径一致时，动态路由可正确解析到页面。
