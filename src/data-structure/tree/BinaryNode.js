import {randomInt} from '../utils'


/**
 * 树等价于连通无环图，由一组顶点（vertex）和若干连接的边组成（edge），可以指定某一个特定的节点为根节点
 *
 * 约定 沿着节点（v）到根节点（r）的唯一通路经过的边的数目成为v的深度，记作depth(v)， depth(root) = 0
 *
 * 当且仅当v节点为根节点的时候  v.parent == NULL;
 * 当且仅当v.lChild == NULL && v.rChild == NULL，v为叶子节点
 *
 *
 */
class BinaryNode {
    constructor(e, parent) {
        this.data = e;
        this.parent = parent;
        this.lChild = undefined;
        this.rChild = undefined;
        // 数的高度
        this.height = undefined;
        // Null Path Length （左式堆）
        this.npl = undefined;
        this.color = undefined;
    }

    size() {}

    insertAsLC(e) {
        this.lChild = new BinaryNode(e, this);
    }

    insertAsRC(e) {
        this.rChild = new BinaryNode(e, this);
    }

    /**
     * 中序遍历的本质：为所有的节点赋予一个次序，从而将半线性的二叉树转化为线性结构
     * 一旦二叉树确定了便利策略，二叉树便可以定义前驱和后继关系，没有前驱（后继）节点成为首（末）节点
     *
     * 中序遍历的后继节点
     */
    succ() {
        let node = this;

        // 右子树的最左子节点或者右节点
        if (hasRChild(node)) {
            node = node.rChild;
            while(hasLChild(node)) {
                node = node.lChild;
            }
            return node;
        }
        // 其直接后继应该  包含当前节点且为左子树的最低祖先
        else {
            while(isRChild(node)) {
                node = node.parent;
            }
            node = node.parent;
            return node;
        }
    }

    /**
     * 子树层次遍历
     */
    travLevel() {}

    /**
     * 子树先序遍历
     */
    travPre() {}

    /**
     * 子树中序遍历
     */
    travIn_I1() {}

    /**
     * 子树中序遍历
     */
    travIn_I2() {}

    /**
     * 子树中序遍历
     */
    travIn_I3() {}

    /**
     * 子树中序遍历
     */
    travIn_I4() {}

    /**
     * 子树中序遍历
     */
    travIn_R() {}

    /**
     * 子树后序遍历
     */
    travPost() {}

    /**
     * 中序遍历算法的统一入口
     * @param {Function} callback
     */
    travIn(callback) {
        switch (randomInt(5) % 5) {
            case 0:
                this.travIn_I1(this, callback); // 迭代1
                break;
            case 1:
                this.travIn_I2(this, callback); // 迭代2
                break;
            case 2:
                this.travIn_I3(this, callback); // 迭代3
                break;
            case 3:
                this.travIn_I4(this, callback); // 迭代4
                break;
            case 4:
                this.travIn_R(this, callback); // 递归版
                break;
        }
    }
}

/**
 *
 * @param {BinaryNode} v
 * @returns {Boolean}
 */
function IsRoot(v) {
    return v.parent === null;
}

/**
 *
 * @param {BinaryNode} v
 * @returns {Boolean}
 */
function isLChild(v) {
    return !IsRoot(v) && v.parent.lChild === v;
}

/**
 *
 * @param {BinaryNode} v
 * @returns {Boolean}
 */
function isRChild(v) {
    return !IsRoot(v) && v.paren.rChild === v;
}

/**
 *
 * @param {BinaryNode} v
 * @returns {Boolean}
 */
function hasLChild(v) {
    return v.lChild !== null;
}

/**
 *
 * @param {BinaryNode} v
 * @returns {Boolean}
 */
function hasRChild(v) {
    return v.rChild !== null;
}

/**
 *
 * @param {BinaryNode} v
 * @returns {Boolean}
 */
function hasChild(v) {
    return hasLChild(v) || hasRChild(v);
}

/**
 *
 * @param {BinaryNode} v
 * @returns {Boolean}
 */
function hasBothChild(v) {
    return hasLChild(v) && hasRChild(v);
}

/**
 *
 * @param {BinaryNode} v
 * @returns {Boolean}
 */
function isLeaf(v) {
    return !hasChild(v);
}

/**
 *
 * @param {BinaryNode} v
 * @returns {Boolean}
 */
function hasParent(v) {
    return !IsRoot(v);
}

/**
 * 返回p节点的兄弟节点
 *
 * @param {BinaryNode} p
 * @returns {BinaryNode}
 */
function sibling(p) {
    return isLChild(p) ? p.parent.rChild : p.parent.lChild;
}

/**
 *
 * @param {BinaryNode} p
 * @returns {BinaryNode}
 */
function uncle(p) {
    return (sibling(p.parent));
}

function fromParentTo(p) {
    if (IsRoot(p)) {
        return p;
    }

    return isLChild(p) ? p.parent.lChild : p.parent.rChild;
}


export {BinaryNode, fromParentTo, hasLChild, hasRChild};
