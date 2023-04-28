import { getInstance, singleClass } from "../base/SingleFactory";
import RedDotComponent from "./RedDotComponent";
import RedDotNode from "./RedDotNode";
import RedDotStaticConfig, { EVENT_RED_DOT_REFRESH, RedDotConfigTable } from "./RedDotStaticConfig";



@singleClass
export default class RedDotMgr{
    /** 固定的根结点 */
    nodeRoot : RedDotNode = new RedDotNode("nodeRoot")
    /** 生成的结点表 */
    nodeMap : {[key : string] : RedDotNode} = null

    init(){
        if(this.nodeMap == null) {
            this.nodeMap = this._createWithConfig(RedDotStaticConfig)
            this.nodeMap[this.nodeRoot.name] = this.nodeRoot
        }
    }

    /**
     * 根据配置表创建, 私有方法
     * @param t 配置数据
     * @returns 生成结点表
     */
    private _createWithConfig(t : RedDotConfigTable){
        let map : {[key : string] : RedDotNode} = {}
        for (const nodeName in t) {
            const value = t[nodeName];
            let node = new RedDotNode(nodeName)
            if(value.func){
                node.setCalculateFunc(value.func)
                if(value.param){
                    node.setCalculateParam(value.param)
                }
            }
            map[nodeName] = node
        }

        for (const nodeName in map) {
            let cfg = t[nodeName]
            let parentNode : RedDotNode = null
            if(cfg && typeof cfg.parent == "string" && cfg.parent.length > 0){
                parentNode = map[cfg.parent]
            } else {
                parentNode = this.nodeRoot
            }

            if(parentNode){
                parentNode.addChild(map[nodeName])
            }
        }

        return map
    }

    /** 根据表创建， 会与已有的红点进行查重，如果重复会报错 */
    public createWithConfig(t : RedDotConfigTable){
        this.init()
        for (const key in t) {
            if(this.nodeMap[key] != null) throw "重复"
        }
        let map = this._createWithConfig(t)
        for (const key in map) {
            this.nodeMap[key] = map[key]
        }
    }

    /** 根据红点名称 获取红点逻辑组件 */
    getNodeByName(nodeName : string){
        return this.nodeMap[nodeName]
    }

    /** 重新计算， 这里要抛事件 */
    reCalculate(nodeName : string){
        let node = this.getNodeByName(nodeName)
        if (node) {
            node.clearResult_Children()
            node.clearResult_Parent()
            this.nodeRoot.getResult()
            cc.director.emit(EVENT_RED_DOT_REFRESH)
        }
    }

    /** 这部分应该是界面层的代码， 这就是个demo，图方便， 建议独立一个管理器去操作， 毕竟红点也有各种不同的样式 */
    prefab : cc.Prefab = null
    createRedDot(node : cc.Node, dotName : string, offsetX : number = 0, offsetY : number = 0){
        let newNode = cc.instantiate(this.prefab)
        node.addChild(newNode)
        let com = newNode.getComponent(RedDotComponent)
        com.dotName = dotName
        com.offsetX = offsetX
        com.offsetY = offsetY
    }
}

getInstance(RedDotMgr).init()