import {BinaryNode, fromParentTo, hasLChild, hasRChild} from './BinaryNode';
import  {Stack} from '../Stack.js';

class BinaryTree {
    constructor() {
        this._size = 0;
        this._root = undefined;
    }
    /**
     * 更新节点的高度
     *
     * 实际情况中节点很难发现后代节点发生变化，所以返回来用如下策略来更新：
     * 一旦有节点加入或者离开树，则更新该节点的所有祖先节点的高度，二者是等效的
     * @param {BinaryNode} x
     */
    updateHeight(x) {
        const lTreeHeight = x.lChild.height;
        const rTreeHeight = x.rChild.height;
        x.height = 1 + Math.max(lTreeHeight, rTreeHeight);
        return x.height;
    }

    /**
     * 更新x节点以及其祖先节点的高度
     * @param {BinaryNode} x
     */
    updateHeightAbove(x) {
        this.updateHeight(x);
        let parent = x.parent;
        while (parent) {
            /**
             * 一旦发现再逐层向上更新的过程中，祖先节点高度未发生变化，则可以终止
             * 就渐进意义而言，算法的复杂度并没有下降数量级
             */
            const originHeight = parent.height;
            const newHeight = this.updateHeight(parent);
            if (originHeight === newHeight) {
                break;
            }
            parent = parent.parent;
        }
    }

    size() {
        return this._size;
    }

    empty() {
        return !this._root;
    }

    root() {
        return this._root;
    }

    insertAsRoot(e) {
        this._size = 1;
        this._root = new BinaryNode(e, null);
        return this._root;
    }

    /**
     * 将e作为左孩子插入
     * @param {BinaryNode} x 父亲节点
     * @param {*} e 待插入节点的数据
     */
    insertAsLC(x, e) {
        this._size++;
        x.insertAsLC(e);
        this.updateHeightAbove(x);
        return x.lChild;
    }

    /**
     * 将e作为右孩子插入
     * @param {BinaryNode} x
     * @param {*} e
     * @returns
     */
    insertAsRC(x, e) {
        this._size++;
        x.insertAsRC(e);
        this.updateHeightAbove(x);
        return x.rChild;
    }

    /**
     * 将tree参数代表的树作为x节点的左子树接入，tree置空
     * @param {BinaryNode} x
     * @param {BinaryTree} tree
     */
    attachAsLC(x, tree) {
        this._size += tree.size();

        const root = tree.root();
        root.parent = x;
        x.lChild = root;
        this.updateHeightAbove(x);

        tree = null;

        return x;
    }

    attachAsRC(x, tree) {
        this._size += tree.size();

        const root = tree.root();
        root.parent = x;
        x.rChild = root;
        this.updateHeightAbove(x);

        tree = null;

        return x;
    }
    /**
     * 删除合法位置的x节点以及其后端，返回被删除节点的数目
     * @param {BinaryNode} x
     */
    remove(x) {
        fromParentTo(x) = null;
        this.updateHeightAbove(x.parent);
        const size = this.removeAt(x);
        this._size -= size;
        return size;
    }

    /**
     * 递归地移除节点
     * @param {BinaryNode} x
     */
    removeAt(x) {
        if (!x) return 0;
        let size = 1 + this.removeAt(x.lChild) + this.removeAt(x.rChild);
        x = null;
        return size;
    }

    /**
     * 删除x节点以及其子树，并将该子树重新封装，返回给调用者
     * @param {BinaryNode} x
     * @returns {BinaryTree}
     */
    secede(x) {
        fromParentTo(x) = null;
        this.updateHeightAbove(x.parent);

        const newTree = new BinaryTree();
        newTree._root = x;
        x.parent = null;
        newTree._size = x.size();

        this._size -= newTree.size();
        return newTree;
    }

    travLevel(callback) {}

    /**
     * 定义节点以及其左右孩子表示为V、L、R，以V节点访问顺序而言，有先序、中序、后续遍历方式
     * 先序遍历：VLR
     * @param {BinaryNode} x
     * @param {Function} callback
     */
    travPre(x, callback) {
        if (!x) {
            return;
        }
        callback(x);
        this.travPre(x.lChild, callback);
        this.travPre(x.rChild, callback);
    }

    /**
     * 中序遍历：LVR
     * @param {BinaryNode} x
     * @param {Function} callback
     */
    travIn(x, callback) {
        if (!x) {
            return;
        }
        this.travIn(x.lChild, callback);
        callback(x);
        this.travIn(x.rChild, callback);
    }

    /**
     * 后序遍历：LRV
     * @param {BinaryNode} x
     * @param {Function} callback
     */
    travPost(x, callback) {
        if (!x) {
            return;
        }
        this.travPost(x.lChild, callback);
        this.travPost(x.rChild, callback);
        callback(x);
    }

    /**
     * 迭代版本的先序遍历，将尾递归转化为迭代式
     * @param {BinaryNode} x
     * @param {Function} callback
     */
    travPreInter(x, callback) {
        const s = new Stack();
        let node;
        if (x) {
            s.push(x);
        }

        while (!s.empyty()) {
            node = s.pop();
            callback(node);

            // 注意栈的顺序（后进先出），要先右孩子，后左孩子
            if (hasRChild(node)) {
                s.push(node.rChild)
            }
            if (hasLChild(node)) {
                s.push(node.lChild);
            }
        }
    }


    /**
     * 用最左侧通路的方法（leftmost path）来访问
     * 先序遍历的过程：先沿着树最左侧通路自顶向下访问节点，而后再自底向上依次访问数的右子树
     *
     * preorder(T) = visit(T0), visit(T1) ... visit(Td)
     * preorder(Td), ... preorder(T1), preorder(T0)
     *
     * @param {BinaryNode} x 被访问的节点
     * @param {Function} callback
     */
    travPreIter2(x, callback) {
        const stack = new Stack();

        /**
         * 最左通路直接向下，沿途优先访问节点
         * @param {BinaryNode} node
         */
        const visitAlongLeftBranch = (node) => {
            while(node) {
                callback(node);
                // 避免空的右孩子入栈
                if (node.rChild) {
                    stack.push(node.rChild);
                }
                node = node.lChild;
            }
        };

        let node = x;
        while(true) {
            visitAlongLeftBranch(node);
            if (stack.empyty()) {
                break;
            }
            node = stack.pop();
        }
    }

    /**
     * 中序遍历的迭代算法，思路依然是最左侧通路算法的思路
     * inorder(T) = visit(Ld), inorder(Td), ... visit(L1), inorder(T1)
     * visit(L0), inorder(T0)
     * @param {BinaryNode} x
     * @param {Function} callback
     */
    travInIter(x, callback) {
        const stack = new Stack();

        /**
         *
         * @param {BinaryNode} node
         */
        const goAlongLeftBranch = (node) => {
            while(node) {
                stack.push(node);
                node = node.lChild;
            }
        }

        let node = x;
        while(true) {
            goAlongLeftBranch(node);
            if (stack.empyty()) {
                break;
            }
            node = stack.pop();
            callback(node);
            node = node.rChild;
        }
    }
}


export {BinaryTree}
