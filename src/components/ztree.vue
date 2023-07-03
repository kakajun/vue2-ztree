<template>
<div class="qbomTree">
  <div class="ztree" :id="ztreeId"></div>
</div>

</template>

<script>
import $ from "jquery";
require("@ztree/ztree_v3/js/jquery.ztree.all");

export default {
  props: {
    setting: {
      type: Object,
      require: false,
      default: function () {
        return {};
      },
    },
    nodes: {
      type: Array,
      require: true,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      ztreeId: "qbomTree",
      ztreeObj: null,
      list: [],
      ztreeSetting: {
        view: {
          showLine: false,
          showIcon: false,
        },
        callback: {
          onAsyncError: (...arg) => {
            this.$emit("onAsyncError", ...arg);
          },
          onAsyncSuccess: (...arg) => {
            this.$emit("onAsyncSuccess", ...arg);
          },
          onCheck: (...arg) => {
            this.$emit("onCheck", ...arg);
          },
          onClick: (...arg) => {
            this.$emit("onClick", ...arg);
          },
          onCollapse: (...arg) => {
            this.$emit("onCollapse", ...arg);
          },
          onDblClick: (...arg) => {
            this.$emit("onDblClick", ...arg);
          },
          onDrag: (...arg) => {
            this.$emit("onDrag", ...arg);
          },
          onDragMove: (...arg) => {
            this.$emit("onDragMove", ...arg);
          },
          onDrop: (...arg) => {
            this.$emit("onDrop", ...arg);
          },
          onExpand: (...arg) => {
            this.$emit("onExpand", ...arg);
          },
          onMouseDown: (...arg) => {
            this.$emit("onMouseDown", ...arg);
          },
          onMouseUp: (...arg) => {
            this.$emit("onMouseUp", ...arg);
          },
          onRemove: (...arg) => {
            this.$emit("onRemove", ...arg);
          },
          onRename: (...arg) => {
            this.$emit("onRename", ...arg);
          },
          onRightClick: (...arg) => {
            this.$emit("onRightClick", ...arg);
          },
        },
      },
    };
  },
  watch: {
    nodes: {
      handler: function (nodes) {
        this.list = nodes;
        // update tree
        if (this.ztreeObj) {
          this.ztreeObj.destroy();
        }
        this.$nextTick(() => {
          this.ztreeObj = $.fn.zTree.init(
            $("#" + this.ztreeId),
            Object.assign({}, this.ztreeSetting, this.setting),
            this.list
          );
          this.$emit("onCreated", this.ztreeObj);
        });
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
@import url("./fmeatree.scss");
@import url('./zTreeStyle.css');
.qbomTree {
  .ztree li span.button.ico_open {
    width: 0;
  }
  .ztree #qbomTree_1 {
    &::before {
      left: -200px;
    }
    &::after {
      left: -200px;
    }
  }

  .ztree li ul.line {
    background: none;
  }
  .ztree li[treenode] {
    position: relative;
    padding: 5px;
    &::before {
      position: absolute;
      top: 2px;
      right: auto;
      bottom: 0;
      left: -9px;
      width: 1px;
      height: 100%;
      border-left: 1px solid #e3e3e3;
      content: '';
    }
    &::after {
      position: absolute;
      top: 13px;
      right: auto;
      bottom: 0;
      left: -8px;
      width: 15px;
      height: 20px;
      border-top: 1px solid #e3e3e3;
      border-width: 1px;
      content: '';
    }
  }
  .ztree li[treenode]:last-child {
    position: relative;
    &::before {
      position: absolute;
      top: -14px;
      right: auto;
      bottom: 0;
      left: -9px;
      width: 1px;
      height: 100%;
      border-left: 1px solid #e3e3e3;
      content: '';
    }
    &::after {
      position: absolute;
      top: 13px;
      right: auto;
      bottom: 0;
      left: -8px;
      width: 15px;
      height: 20px;
      border-top: 1px solid #e3e3e3;
      border-width: 1px;
      content: '';
    }
  }

  .ztree li span.button.ico_close {
    width: 0;
  }
  .ztree li span.button.bottom_docu,
  .ztree li span.button.center_docu {
    width: 0;
  }
  .node_name {
    padding: 0 4px;
    border-radius: 3px;
  }
  .ztree li a {
    background: transparent;
    .node_name {
      position: relative;
      top: -1px;
      display: inline-block;
      height: 20px;
      padding: 0 3px;
      line-height: 20px;
    }
  }
  .ztree li a.curSelectedNode {
    background: transparent;
    .node_name {
      position: relative;
      top: -1px;
      display: inline-block;
      height: 20px;
      padding: 0 3px;
      line-height: 20px;
     color: #164e88;
      background: #e4f1fc;
    }
  }
}
</style>
