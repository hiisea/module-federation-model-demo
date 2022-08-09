# 关于本Demo

本Demo主要演示相同的业务逻辑`Modle`如何在跨项目、跨UI框架中复用。

`react-team`在开发时将`Model`与`View`分离，并导出`Model`。

`vue-team`使用`react-team`导出的`Model`。

## 运行

- yarn install
- yarn start

`yarn start` 会启动3个server：

## 说明

- mock-server 端口3003，提供API假数据
- react-team-server 端口4003，react-team的独立站点，并且提供`Model`的remote引用
- vue-team-server 端口4001，vue-team的独立站点，它会拉取`react-team-server`提供的`Model`

## module-federation验证

1. yarn start 启动3个server
2. 打开react站点：<http://localhost:4003/>
3. 打开vue站点：<http://localhost:4001/>
4. 打开`react-team/src/modules/article-model/model.ts`，修改：

   ```ts
   @effect()
    public async fetchList(listSearchData?: ListSearch): Promise<void> {
        const listSearch = listSearchData || this.state.listSearch || defaultListSearch;
    ++  listSearch.pageCurrent = 2; //加这句，让首页显示第2页
        const {list, listSummary} = await api.getList(listSearch);
        this.dispatch(this.privateActions.putList(listSearch, list, listSummary));
    }
   ```

5. 刷新vue站点，不需要重新编译，可以看到vue站点默认首页也变成了第2页
