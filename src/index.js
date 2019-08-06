import '../src/index.css'
import '../src/iconFont/iconFont.css'

//事件的跨浏览器兼容
function addEvent(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler);
  } else if (element.attachEvent) {
    element.attachEvent('on' + type, handler);
  } else {
    element['on' + type] = handler;
  }
}

function Node(data) {

  this.data = data;

  this.parent = null;

  this.children = [];

  this.rootDOM = document.getElementById('tree-area');

  this.selfDOM = null;

}

Node.prototype = {

  render: function (arrow, visibility, setHightlight, deHightLight) {
    if (arrow) {
      if (this.isLeaf()) {
        this.selfDOM.getElementsByClassName('icon-down')[0].className = 'iconfont icon-down invisible';
      }
      if (this.isFolded()) {
        this.selfDOM.getElementsByClassName('icon-down')[0].className = 'iconfont icon-down visible';
      }
    }
    //TODO:: 待完成
    if (visibility) {

    }
  },

  isLeaf: function () {
    return this.children.length == 0;
  },

  isFolded: function () {
    if (this.isLeaf()) return false; // 叶结点返回false
    return true;
  },

  //展开/收拢
  toggleFold: function () {
    let i = 0,
      len = this.children.length;
    if (this.isLeaf()) return this;
    for (; i < len; i++) {
      this.children[i].render(false, true);
    }
    this.render(true, false);
    return this;
  },

  //生成树的DOM
  setDOM: function (treeName, parent, self, link) {
    let ul = document.createElement('ul'),
      li = document.createElement('li'),
      span = document.createElement('span'),
      //添加图标
      addIcon = document.createElement('i'),
      //删除图标
      removeIcon = document.createElement('i'),
      //展开图标
      unfoldIcon = document.createElement('i'),
      //折叠图标
      foldIcon = document.createElement('i');

    foldIcon.setAttribute('class', 'iconfont icon-enter invisible');
    unfoldIcon.setAttribute('class', 'iconfont icon-down invisible');
    addIcon.setAttribute('class', 'iconfont icon-add invisible');
    removeIcon.setAttribute('class', 'iconfont icon-close invisible');
    if (link) {
      span.setAttribute('link-data', link);
      span.setAttribute('class', 'link');
    }
    span.innerHTML = treeName;

    li.appendChild(span);
    li.insertBefore(unfoldIcon, span);
    li.insertBefore(foldIcon, span);
    li.appendChild(addIcon);
    li.appendChild(removeIcon);
    ul.appendChild(li);

    if (!parent) {
      ul.setAttribute('id', 'ul-root');
      this.rootDOM.appendChild(ul);
      this.selfDOM = ul;
    } else {
      parent.selfDOM.appendChild(ul);
      self.selfDOM = ul;
    }
  },

  //删除DOM
  delDOM: function (parent, index) {
    parent.selfDOM.removeChild(parent.children[index].selfDOM);
  },

  bind: function () {
    let rootEle = document.getElementById('tree-area'),
      target = null;
    addEvent(rootEle, 'click', function (e) {
      target = e.target;
      e.stopPropagation() || (window.event.cancelBubble = true); //阻止事件冒泡兼容
      //图标展开状态
      if (target.className.indexOf('icon-down') !== -1) {
        target.className = 'iconfont icon-down invisible';
        target.parentNode.getElementsByClassName('icon-enter')[0].className = 'iconfont icon-enter visible';
        for (let i = 1; i < target.parentNode.parentNode.children.length; i++) {
          target.parentNode.parentNode.children[i].style = 'display:none;'
        }
      }
      //图标折叠状态
      if (target.className.indexOf('icon-enter') !== -1) {
        target.className = 'iconfont icon-enter invisible';
        target.parentNode.getElementsByClassName('icon-down')[0].className = 'iconfont icon-down visible';
        for (let i = 1; i < target.parentNode.parentNode.children.length; i++) {
          target.parentNode.parentNode.children[i].style = 'display:block;'
        }
      }
      //有链接
      if (target.attributes['link-data']) {
        window.open(target.attributes['link-data'].nodeValue);
      }
    })
  }
}

function Tree(data) {

  this._root = new Node(data);

  this._root.setDOM(data);

  this._root.bind();
}

Tree.prototype = {

  //深度首次遍历
  traverseDF: function (callback) {
    (function recurse(currentNode) {
      for (let i = 0; i < currentNode.children.length; i++) {
        recurse(currentNode.children[i]);
      }
      callback(currentNode);
    })(this._root);
  },

  //广度首次遍历
  traverseBF: function (callback) {
    let queue = [];

    queue.push(this._root);
    let currentNode = queue.shift();
    while (currentNode) {
      for (let i = 0; i < currentNode.children.length; i++) {
        queue.push(currentNode.children[i]);
      }
      callback(currentNode);
      currentNode = queue.shift();
    }
  },

  contains: function (callback, traversal) {
    traversal.call(this, callback);
  },

  add: function (data, toData, tvaversal, link) {
    let child = new Node(data),
      parent = null,
      callback = function (node) {
        if (node.data === toData) {
          parent = node;
        }
      };
    this.contains(callback, tvaversal);
    if (parent) {
      parent.children.push(child);
      child.parent = parent;
      this._root.setDOM(data, parent, child, link);
      parent.render(true);
    } else {
      throw new Error('不存在父节点');
    }
  },

  remove: function (data, formData, tvaversal) {
    let parent = null,
      index,
      callback = function (node) {
        if (node.data === formData) {
          parent = node;
        }
      };
    this.contains(callback, tvaversal);
    if (parent) {
      index = this.getIndex(data, parent);
      if (index === undefined) {
        throw new Error('没有找到想要删除的元素');
      } else {
        this._root.delDOM(parent, index);
        parent.children.splice(index, 1);
      }

    } else {
      throw new Error('父节点不存在');
    }
  },

  getIndex: function (data, parent) {
    let i = 0,
      len = parent.children.length,
      index;
    for (; i < len; i++) {
      if (data === parent.children[i].data) {
        index = i;
      }
    }
    return index;
  }
}

let root = new Tree('前端开发');
root.add('demo', '前端开发', root.traverseBF);
root.add('JS', '前端开发', root.traverseBF);
root.add('CSS', '前端开发', root.traverseBF);
root.add('UI', '前端开发', root.traverseBF);
root.add('HTML', '前端开发', root.traverseBF);
root.add('轮播图构造模式', 'demo', root.traverseBF, './carousel1.html');
root.add('轮播图模块化封装', 'demo', root.traverseBF, './carousel2.html');
root.add('轮播图模块化封装2', 'demo', root.traverseBF, './carousel3.html');
// root.add('懒加载', 'project', root.traverseBF, './project/lazyload/index.html');
root.add('瀑布流+懒加载', 'demo', root.traverseBF, './waterFall.html');
root.add('AngularJS', 'JS', root.traverseBF);
root.add('React', 'JS', root.traverseBF);
root.add('ExtJS', 'JS', root.traverseBF);
root.add('NodeJS', 'JS', root.traverseBF);
root.add('TypeScript', 'JS', root.traverseBF);
root.add('CSS2.0', 'CSS', root.traverseBF);
root.add('CSS3.0', 'CSS', root.traverseBF);
root.add('SASS', 'CSS', root.traverseBF);
root.add('bootstrap', 'UI', root.traverseBF);