<template>
  <div id="app" class="flex-col">
    <h1 class="T">
      vue2-ztree
    </h1>

    <div class="wrap flex-1">
      <div class="c">
        <tree
          :setting="setting"
          :nodes="nodes"
          @onClick="onClick"
          @onCheck="onCheck"
          @onCreated="handleCreated"
        />
      </div>
    </div>

    <div class="toolbar">
      <button class="btn" type="button" @click="update">更新数据</button>
    </div>

    <footer class="foot">
      <p>
        © 2019 - 3019 Author
        <a href="https://refined-x.com/" target="_blank">前端路上</a>
      </p>
    </footer>
  </div>
</template>

<script>
const bigData = require("@/mock/big-tree.json");
const simpleData = [
  { id: 1, pid: 0, name: "随意勾选 1", open: true, iconSkin:"pIcon01" },
  { id: 11, pid: 1, name: "随意勾选 1-1", open: true, iconSkin:"pIcon02"},
  { id: 111, pid: 11, name: "随意勾选 1-1-1" , iconSkin:"icon03"},
  { id: 112, pid: 11, name: "随意勾选 1-1-2" , iconSkin:"icon04"},
  { id: 12, pid: 1, name: "随意勾选 1-2", open: true, iconSkin:"pIcon01" },
  { id: 121, pid: 12, name: "随意勾选 1-2-1" , iconSkin:"icon06"},
  { id: 122, pid: 12, name: "随意勾选 1-2-2" },
  { id: 2, pid: 0, name: "随意勾选 2", checked: true, open: true },
  { id: 21, pid: 2, name: "随意勾选 2-1" },
  { id: 22, pid: 2, name: "随意勾选 2-2", open: true },
  { id: 221, pid: 22, name: "随意勾选 2-2-1", checked: true },
  { id: 222, pid: 22, name: "随意勾选 2-2-2" },
  { id: 23, pid: 2, name: "随意勾选 2-3" }
];
const dataQueue = [bigData.data, simpleData];
import tree from './components/ztree.vue';
export default {
  name: "app",
  components: {
    tree 
  },
  data() {
    return {
      showIndex: 1,
      ztreeObj: null,
      setting: {
        check: {
          // enable: true
        },
        data: {
          simpleData: {
            enable: true,
            pIdKey: "pid"
          }
        },
        view: {
          showLine: false,
          showIcon: true,
          addHoverDom: this.addHoverDom,
          removeHoverDom: this.removeHoverDom,
        }
      }
    };
  },
  computed: {
    nodes: function() {
      return dataQueue[this.showIndex];
    }
  },
  methods: {
    addHoverDom(treeid, treeNode) {
      const item = document.getElementById(`${treeNode.tId}_a`);
      if(item && !item.querySelector('.tree_extra_btn')){
        const btn = document.createElement('sapn');
        btn.id = `${treeid}_${treeNode.id}_btn`;
        btn.classList.add('tree_extra_btn');
        btn.innerText = '删除';
        btn.addEventListener('click', (e) => {
          e.stopPropagation()
          this.clickRemove(treeNode)
        })
        item.appendChild(btn);
      }

    },
    removeHoverDom(treeid, treeNode) {
      const item = document.getElementById(`${treeNode.tId}_a`);
      if(item){
        const btn = item.querySelector('.tree_extra_btn');
        if(btn){
          item.removeChild(btn)
        }
      }
    },
    clickRemove(treeNode) {
      console.log('remove', treeNode)
      this.ztreeObj && this.ztreeObj.removeNode(treeNode)
    },
    onClick: function(evt, treeId, treeNode) {
      // 点击事件
      console.log(evt.type, treeNode);
    },
    onCheck: function(evt, treeId, treeNode) {
      // 选中事件
      console.log(evt.type, treeNode);
    },
    handleCreated: function(ztreeObj) {
      this.ztreeObj = ztreeObj;
      // onCreated 中操作ztreeObj对象展开第一个节点
      ztreeObj.expandNode(ztreeObj.getNodes()[0], true);
    },
    update: function() {
      // 更新示例数据
      this.showIndex = this.showIndex === 0 ? 1 : 0;
    }
  }
};
</script>
<style type="text/css">
.ztree li span.button.pIcon01_ico_open{margin-right:2px; background: url(./components/img/diy/1_open.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
.ztree li span.button.pIcon01_ico_close{margin-right:2px; background: url(./components/img/diy/1_close.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
.ztree li span.button.pIcon02_ico_open, .ztree li span.button.pIcon02_ico_close{margin-right:2px; background: url(./components/img/diy/2.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
.ztree li span.button.icon01_ico_docu{margin-right:2px; background: url(./components/img/diy/3.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
.ztree li span.button.icon02_ico_docu{margin-right:2px; background: url(./components/img/diy/4.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
.ztree li span.button.icon03_ico_docu{margin-right:2px; background: url(./components/img/diy/5.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
.ztree li span.button.icon04_ico_docu{margin-right:2px; background: url(./components/img/diy/6.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
.ztree li span.button.icon05_ico_docu{margin-right:2px; background: url(./components/img/diy/7.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
.ztree li span.button.icon06_ico_docu{margin-right:2px; background: url(./components/img/diy/8.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
	</style>
<style>
html,body{height: 100%;}
body {
  margin: 0;
}
/* 自定义按钮样式 */
.tree_extra_btn{
  display: inline-block;
  padding: 0 3px;
  color: red;
}

/* flex栅格 */
.flex-col {
  overflow: hidden;
  display: -ms-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  -ms-flex-direction: column;
}

.flex-row {
  overflow: hidden;
  display: -ms-box;
  display: -ms-flexbox;
  display: flex;
}

.flex-1 {
  -ms-flex: 1;
  flex: 1;
  min-width: 0;
}

.flex-2 {
  -ms-flex: 2;
  flex: 2;
  min-width: 0;
}

.flex-3 {
  -ms-flex: 3;
  flex: 3;
  min-width: 0;
}

.flex-4 {
  -ms-flex: 4;
  flex: 4;
  min-width: 0;
}

.align-stretch {
  -ms-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
}

.align-center {
  -ms-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.justify-center {
  -ms-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.wrap{
  overflow: hidden;
}
.c {
  width: 600px;
  height: 100%;
  overflow: auto;
  margin: auto;
}
.T {
  font-size: 34px;
  margin: 0 0 30px;
  height: 170px;
  line-height: 260px;
  overflow: hidden;
  background:url(./assets/logo.png) center no-repeat;
}
.toolbar {
  margin: 20px auto;
}
.toolbar .btn {
  padding: 0.5em 1em;
  outline: none;
  border-radius: 4px;
}

.foot {
  margin-top: 30px;
  background: #333;
  padding: 24px;
  overflow: hidden;
  color: #999;
  font-size: 14px;
  text-align: center;
}

.foot a {
  color: #fff;
  margin: 0 0.5em;
}
</style>
