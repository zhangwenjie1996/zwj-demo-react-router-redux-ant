export default class IteratorTree {
    constructor() {
    }

    //遍历树父子节点,返回该节点与其子节点集合
    static getTreeIDs(treeNodes, selID) {
        //父子节点集合
        let selectTreeID = [];
        if (!treeNodes || !treeNodes.length) return;
        var stack = [];
        //先将第一层节点放入栈
        for (var i = 0, len = treeNodes.length; i < len; i++) {
            stack.push(treeNodes[i]);
        }
        var item;
        var issave = false;
        while (stack.length) {
            item = stack.shift();
            if (issave == false && item.key == selID) {
                stack = [];
                issave = true;
                if (item.children != [] && item.children.length > 0) {
                    stack = stack.concat(item.children);
                }
                selectTreeID.push(Number(item.key));
            } else {
                if (item.children && item.children.length) {
                    stack = stack.concat(item.children);
                }
                if (issave) {
                    selectTreeID.push(Number(item.key));
                }
            }
        }
        return selectTreeID;
    };

    //遍历树节点,根据节点ID,返回节点名字
    static getTreeName(treeNodes, selID) {
        if (!treeNodes || !treeNodes.length) return;
        var stack = [];
        //先将第一层节点放入栈
        for (var i = 0, len = treeNodes.length; i < len; i++) {
            stack.push(treeNodes[i]);
        }
        var item;
        while (stack.length) {
            item = stack.shift();
            if (item.key == selID) {
                return item.title;
            } else {
                if (item.children && item.children.length) {
                    stack = stack.concat(item.children);
                }
            }
        }
        return null;
    };

    //遍历树节点,判断是否有根结点
    static hasChidren(treeNodes, selID) {
        if (!treeNodes || !treeNodes.length) return;
        var stack = [];
        //先将第一层节点放入栈
        for (var i = 0, len = treeNodes.length; i < len; i++) {
            stack.push(treeNodes[i]);
        }
        var item;
        while (stack.length) {
            item = stack.shift();
            if (item.key == selID) {
                if (item.children.length > 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (item.children && item.children.length) {
                    stack = stack.concat(item.children);
                }
            }
        }
        return false;
    };

    //遍历树节点,根据节点ID,返回节点备注信息
    static getTreeDescription(treeNodes, selID) {
        if (!treeNodes || !treeNodes.length) return;
        var stack = [];
        //先将第一层节点放入栈
        for (var i = 0, len = treeNodes.length; i < len; i++) {
            stack.push(treeNodes[i]);
        }
        var item;
        while (stack.length) {
            item = stack.shift();
            if (item.key == selID) {
                return item.description;
            } else {
                if (item.children && item.children.length) {
                    stack = stack.concat(item.children);
                }
            }
        }
        return null;
    };


    //遍历树节点,返回全部节点ID
    static getAllTreeID(treeNodes) {
        //父子节点集合
        let selectTreeID = [];
        if (!treeNodes || !treeNodes.length) return;
        var stack = [];
        //先将第一层节点放入栈
        for (var i = 0, len = treeNodes.length; i < len; i++) {
            stack.push(treeNodes[i]);
        }
        var item;
        var issave = false;
        while (stack.length) {
            item = stack.shift();
            if (item.children != [] && item.children.length > 0) {
                stack = stack.concat(item.children);
            }
            selectTreeID.push(Number(item.key));
        }
        return selectTreeID;
    };
//-------------------------- treedata数据中没有key字段有id字段 --------------------------------------------------
    //遍历树节点,判断是否为顶级节点
    static isTopTreeNode(treeNodes, selID) {
        for (var i = 0, len = treeNodes.length; i < len; i++) {
            if(treeNodes[i].id == selID){
                return true
            }
        }
        return false;
    };
    //遍历树节点,返回全部节点ID
    static getAllTreeIDByID(treeNodes) {
        //父子节点集合
        let selectTreeID = [];
        if (!treeNodes || !treeNodes.length) return;
        var stack = [];
        //先将第一层节点放入栈
        for (var i = 0, len = treeNodes.length; i < len; i++) {
            stack.push(treeNodes[i]);
        }
        var item;
        var issave = false;
        while (stack.length) {
            item = stack.shift();
            if (item.children != [] && item.children.length > 0) {
                stack = stack.concat(item.children);
            }
            selectTreeID.push(Number(item.id));
        }
        return selectTreeID;
    };
    //遍历树节点,返回全部节点ID
    static getAllStringTreeIDByID(treeNodes) {
        //父子节点集合
        let selectTreeID = [];
        if (!treeNodes || !treeNodes.length) return;
        var stack = [];
        //先将第一层节点放入栈
        for (var i = 0, len = treeNodes.length; i < len; i++) {
            stack.push(treeNodes[i]);
        }
        var item;
        var issave = false;
        while (stack.length) {
            item = stack.shift();
            if (item.children != [] && item.children.length > 0) {
                stack = stack.concat(item.children);
            }
            selectTreeID.push(item.id+"");
        }
        return selectTreeID;
    };

    //遍历树父子节点,返回该节点与其子节点集合
    static getTreeIDsByID(treeNodes, selID) {
        //父子节点集合
        let selectTreeID = [];
        if (!treeNodes || !treeNodes.length) return;
        var stack = [];
        //先将第一层节点放入栈
        for (var i = 0, len = treeNodes.length; i < len; i++) {
            stack.push(treeNodes[i]);
        }
        var item;
        var issave = false;
        while (stack.length) {
            item = stack.shift();
            if (issave == false && item.id == selID) {
                stack = [];
                issave = true;
                if (item.children != [] && item.children.length > 0) {
                    stack = stack.concat(item.children);
                }
                selectTreeID.push(Number(item.id));
            } else {
                if (item.children && item.children.length) {
                    stack = stack.concat(item.children);
                }
                if (issave) {
                    selectTreeID.push(Number(item.id));
                }
            }
        }
        return selectTreeID;
    };

    //遍历树节点,根据节点ID,返回节点
    static getDataByID(treeNodes, selID) {
        if (!treeNodes || !treeNodes.length) return;
        var stack = [];
        //先将第一层节点放入栈
        for (var i = 0, len = treeNodes.length; i < len; i++) {
            stack.push(treeNodes[i]);
        }
        var item;
        while (stack.length) {
            item = stack.shift();
            if (item.id == selID) {
                return item;
            } else {
                if (item.children && item.children.length) {
                    stack = stack.concat(item.children);
                }
            }
        }
        return null;
    };

}