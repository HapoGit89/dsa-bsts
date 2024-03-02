class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
  

    // If the tree is empty, insert at the root
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    // Otherwise, find the correct spot for the new node.
    var current = this.root;
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = new Node(val);
          return this;
        } else {
          current = current.left;
        }
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = new Node(val);
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }

  

 

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current=this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    if(val<current.val){
      if (!current.left){
        current.left = new Node(val)
        return this
      }
      else{
       this.insertRecursively(val, current.left)
      }
      }
    
      if(val>current.val){
        if (!current.right){
          current.right = new Node(val)
          return this
        }
        else{
         this.insertRecursively(val, current.right)
        }
        }

  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root
    while (true) {
      if (current.val == val) {
        return current
      }
      if (val < current.val) {
       if(current.left) {
          current = current.left;
        }
        else {
          return undefined
        }
      } else if (val > current.val) {
        if (current.val === val) {
         return current
        } else if (current.right) {
          current = current.right;
        }
        else{
          return undefined}

      }
    }

  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current=this.root) {
    if (this.root===null) {return undefined}
    if (val < current.val){
      if (current.left === null) {return undefined}
      else{return this.findRecursively(val,current.left)}
      
    }
    if (val > current.val){
      if (current.right === null) {return undefined}
      else{return this.findRecursively(val,current.right)}
    }
    return current
   
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(node=this.root, array=[]) {
    array.push(node.val)
    if(node.left){this.dfsPreOrder(node.left, array)}
    if(node.right){this.dfsPreOrder(node.right, array)}
    return array
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(node=this.root, array=[]) {
  
    if(node.left){this.dfsInOrder(node.left, array)}
    array.push(node.val)
    if(node.right){this.dfsInOrder(node.right, array)}
    return array


  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(node=this.root, array=[]) {
    if(node.left){this.dfsPostOrder(node.left, array)}
    if(node.right){this.dfsPostOrder(node.right, array)}
    array.push(node.val)
    return array

  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let array = []
    let q = [this.root]
    while (q.length >0){
      let current = q.shift()
      array.push(current.val)
      if(current.left) q.push(current.left)
      if(current.right) q.push(current.right)
    }
  return array
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
   
    // first find node and parent node
    let current = this.root
    let parent = null
    while (true) {
      if (current.val == val) {
        break
      }
      if (val < current.val) {
       if(current.left) {
        parent = current
          current = current.left;
        }
        else {
          break
        }
      } else if (val > current.val) {
        if (current.val === val) {
         break
        } else if (current.right) {
          parent = current
          current = current.right;
        }
        else{
          break}
      }
    }
    // case 1: node doesnt have children
    if(!current.left && !current.right){
      parent.left && parent.left.val === val ? parent.left = null : parent.right = null
      return current
    }

    // case 2: node has one child
    if((current.right && !current.left) || (!current.right && current.left)){
      if(current.left && current.left.val === val)
      {parent.left && parent.left.val === val ? parent.left = current.left : parent.right = current.left}
      else {
        {parent.left && parent.left.val === val ? parent.left = current.right : parent.right = current.right}
      }
      return current
    }

    else{

    // case 3: node has two children
    const bstArr = this.dfsInOrder()  // convert bst to array
    const succval = bstArr[bstArr.indexOf(val)+1]
    const succNode = this.find(succval)  // find succ node
    let node = new Node(val, this.find(val).left, this.find(val).right)
    
    
    // find parent of succNode
    current = this.root
    parent = null
    succNode.val
    
    while (true) {
      
      if (current.val == succNode.val) {
        break
      }
      if (succNode.val < current.val) {
       if(current.left) {
        parent = current
          current = current.left;
        }
        else {
          break
        }
      } else if (succNode.val > current.val) {
        if (current.val === succNode.val) {
         break
        } else if (current.right) {
          parent = current
          current = current.right;
        }
        else{
          break}
      }
    }

    this.find(val).val = succNode.val
    current = succNode

    if(parent.left && parent.left.val===current.val)
    {parent.left = current.right}
    else{
      parent.right = current.right
    }
    return node
    }
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

let binarySearchTree = new BinarySearchTree();
binarySearchTree
.insert(22)
.insert(49)
.insert(85)
.insert(66)
.insert(95)
.insert(90)
.insert(100)
.insert(88)
.insert(93)
.insert(89);

console.log(binarySearchTree.remove(85))
console.log(binarySearchTree.root.right.right.val)





module.exports = BinarySearchTree;
