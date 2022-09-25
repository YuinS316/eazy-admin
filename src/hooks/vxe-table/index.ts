import { App } from "vue";
import { VXETable, Column, Table, Grid, Colgroup, Pager } from "vxe-table";

function useTable(app: App) {
  app.use(Column).use(Table).use(Grid).use(Colgroup).use(Pager);
}

export default useTable;
