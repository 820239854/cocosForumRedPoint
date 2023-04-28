import { getInstance } from "./base/SingleFactory";
import RedDotMgr from "./RedDot/RedDotMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class OneNode extends cc.Component {

    @property(cc.Label)
    dotNameLabel: cc.Label = null;

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    dotName : string = null
    setDotName(dotName : string){
        this.dotName = dotName
        this.dotNameLabel.string = dotName
        getInstance(RedDotMgr).createRedDot(this.node, this.dotName, 50, 30)
    }

    protected onLoad(): void {
        this.sprite.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this)
    }

    onClick(){
        cc.director.emit("test", this.dotName)
    }
}