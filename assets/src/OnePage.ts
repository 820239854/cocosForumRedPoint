import { getInstance } from "./base/SingleFactory";
import OneNode from "./OneNode";
import RedDotMgr from "./RedDot/RedDotMgr";

const { ccclass, property } = cc._decorator;

let colorConfig = [
    "#ff0000",
    "#E3CF57",
    "#ffa500",
    "#800080",
    "#0000ff",
    "#00ff00",
]

@ccclass
export default class OnePage extends cc.Component {
    @property(cc.ScrollView)
    scrollview: cc.ScrollView = null;
    @property(cc.Prefab)
    oneNodePrefab: cc.Prefab = null;

    dotName: string = "";

    setDotName(dotName: string) {
        this.dotName = dotName
        let depth = getInstance(RedDotMgr).getNodeByName(dotName).getDepth()
        this.scrollview.node.color = new cc.Color().fromHEX(colorConfig[depth])
        this.initScrollView()
    }

    initScrollView() {
        let redDot = getInstance(RedDotMgr).getNodeByName(this.dotName)
        if (!redDot) {
            console.error("没找到节点")
            return
        }
        redDot.children.forEach(child => {
            let newNode = cc.instantiate(this.oneNodePrefab)
            newNode.getComponent(OneNode).setDotName(child.name)
            this.scrollview.content.addChild(newNode)
        })
    }

}
