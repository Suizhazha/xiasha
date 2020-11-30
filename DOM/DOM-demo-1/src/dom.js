window.dom = {

  create(string) {
    //template可以容纳所有元素，包括div,td
    //const container = document.createElement('div'),使用div的话，td元素就不能显示，td只能被包裹在table中。
    const container = document.createElement('template')
    //trim防止字符串出现空格
    container.innerHTML = string.trim()
    return container.content.firstChild
  },
  //想法链接：https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
  after(node, newNode) {
    node.parentNode.insertBefore(newNode, node.nextSibling)
  },
  before(node, newNode) {
    node.parentNode.insertBefore(newNode, node)
  },
  append(parent, newNode) {
    parent.appendChild(newNode)
  },
  //先将新父节点插入到节点前面，当兄弟节点，再将节点变成新节点的儿子
  wrap(node, newParent) {
    dom.before(node, newParent)
    dom.append(newParent, node)
  },
  remove(node) {
    node.parentNode.removeChild(node)
    return node
  },
  //保留原节点的引用，存在数组中
  empty(node) {
    const arr = []
    // 因为删除节点时，数组会自动更新长度，所以用while
    let x = node.firstChild
    while (x) {
      arr.push(dom.remove(node.firstChild))
      x = node.firstChild
    }
    return arr
  },
  //读写属性
  attr(node, name, value) {//重载
    if (arguments.length === 3) {
      node.setAttribute(name, value)
    } else if (arguments.length === 2) {
      return node.getAttribute(name)
    }
  },
  text(node, string) {
    if (arguments.length === 2) {
      if ('innerText' in node) {
        node.innerText = string
      }
    } else if (arguments.length === 1) {
      if ('innerText' in node) {
        return node.innerText
      }
    }

  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string
    } else if (arguments.length === 1) {
      return node.innerHTML
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div, 'color', 'red')
      node.style[name] = value
    } else if (arguments.length === 2) {
      if (typeof name === 'string') {
        // dom.style(div, 'color')
        return node.style[name]
      } else if (name instanceof Object) {
        // dom.style(div, {color: 'red'})
        const object = name
        for (let key in object) {
          node.style[key] = object[key]
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className)
    },
    remove(node, className) {
      node.classList.remove(className)
    },
    has(node, className) {
      return node.classList.contains(className)
    }
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn)
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn)
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector)
  },
  parent(node) {
    return node.parentNode
  },
  children(node) {
    return node.children
  },
  siblings(node) {
    return Array.from(node.parentNode.children)
      .filter(n => n !== node)
  },
  next(node) {
    let x = node.nextSibling
    while (x && x.nodeType === 3) {
      x = x.nextSibling
    }
    return x
  },
  previous(node) {
    let x = node.previousSibling
    while (x && x.nodeType === 3) {
      x = x.previousSibling
    }
    return x
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i])
    }
  },
  index(node) {
    const list = dom.children(node.parentNode)
    let i
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break
      }
    }
    return i
  }


}