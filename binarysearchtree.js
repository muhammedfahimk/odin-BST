// thisisatesttoseemywillpower
class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  class Tree {
    constructor(arr) {
      this.root = this.buildTree(arr);
    }
    buildTree(array) {
      const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);
  
      const innerbuild = (arr) => {
        if (arr.length === 0) {
          return null;
        }
        const mid = Math.floor(arr.length / 2);
        const node = new Node(arr[mid]);
  
        node.left = innerbuild(arr.slice(0, mid));
        node.right = innerbuild(arr.slice(mid + 1));
        return node;
      };
      return innerbuild(uniqueSortedArray);
    }
    insert(value) {
      const newnode = new Node(value);
      if (!this.root) {
        this.root = newnode;
        return;
      }
  
      let current = this.root;
      while (true) {
        if (value < current.data) {
          if (!current.left) {
            current.left = newnode;
            return;
          }
          current = current.left;
        } else {
          if (!current.right) {
            current.right = newnode;
            return;
          }
          current = current.right;
        }
      }
    }
    deleteItem(value) {
      const deletenode = (node, value) => {
        if (!node) {
          return null;
        }
        if (node.data === value) {
          if (!node.left) {
            return node.right;
          }
          if (!node.right) {
            return node.left;
          }
          if (!node.right && !node.left) {
            return null;
          }
          let tempnode = node.right;
          while (tempnode.left) {
            tempnode = tempnode.left;
          }
          node.data = tempnode.data;
          node.right = deletenode(node.right, tempnode.data);
          return node;
        } else if (value < node.data) {
          node.left = deletenode(node.left, value);
          return node;
        } else {
          node.right = deletenode(node.right, value);
          return node;
        }
      };
      this.root = deletenode(this.root, value);
    }
    find(value) {
      let current = this.root;
      while (current) {
        if (current.data === value) {
          return current;
        } else if (value < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
      return null;
    }
    levelOrder(callback) {
      const queue = [];
      const result = [];
      if (!this.root) {
        return result;
      }
      queue.push(this.root);
      while (queue.length > 0) {
        const node = queue.shift();
        result.push(node.data);
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
        if (callback) {
          callback(node);
        }
      }
      return result;
    }
    inOrder(callback) {
      const traverse = (node) => {
        if (node) {
          traverse(node.left);
          callback(node);
          traverse(node.right);
        }
      };
      traverse(this.root);
    }
  
    preOrder(callback) {
      const traverse = (node) => {
        if (node) {
          callback(node);
          traverse(node.left);
          traverse(node.right);
        }
      };
      traverse(this.root);
    }
    postOrder(callback) {
      const traverse = (node) => {
        if (node) {
          traverse(node.left);
          traverse(node.right);
          callback(node);
        }
      };
      traverse(this.root);
    }
    height(node) {
      if (!node) {
        return -1;
      }
      const leftheight = this.height(node.left);
      const rightheight = this.height(node.right);
  
      return Math.max(leftheight, rightheight) + 1;
    }
  
    depth(node) {
      let depth = 0;
      let current = this.root;
      while (current !== node) {
        depth++;
        if (node.data < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
      return depth;
    }
  
    isBalanced(node = this.root) {
      if (!node) {
        return true;
      }
      const leftheight = this.height(node.left);
      const rightheight = this.height(node.right);
      if (Math.abs(leftheight - rightheight) > 1) {
        return false;
      }
      if (!this.isBalanced(node.left)) {
        return false;
      }
      if (!this.isBalanced(node.right)) {
        return false;
      }
      return true;
    }
  
    rebalance() {
      const nodes = [];
      this.inOrder((node) => nodes.push(node.data));
  
      this.root = this.buildTree(nodes);
    }
  }
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  
  const getRandomNumbers = (count) => {
    const numbers = [];
    while (numbers.length < count) {
      const random = Math.floor(Math.random() * 100);
      if (!numbers.includes(random)) {
        numbers.push(random);
      }
    }
    return numbers;
  };
  
  const numbers = getRandomNumbers(8);
  const tree = new Tree(numbers);
  
  console.log("Initial tree:");
  prettyPrint(tree.root);
  console.log("Is balanced:", tree.isBalanced());
  tree.insert(101);
  tree.insert(102);
  tree.insert(103);
  console.log("Unbalanced tree:");
  prettyPrint(tree.root);
  console.log("Is balanced:", tree.isBalanced());
  tree.rebalance();
  
  console.log("Rebalanced tree:");
  prettyPrint(tree.root);
  
  console.log("Is balanced:", tree.isBalanced());
  console.log("Level Order:", tree.levelOrder().join(", "));
  console.log("Pre Order:");
  tree.preOrder((node) => console.log(node.data));
  console.log("Post Order:");
  tree.postOrder((node) => console.log(node.data));
  console.log("In Order:");
  tree.inOrder((node) => console.log(node.data));

  tree.deleteItem(103)
  prettyPrint(tree.root);
