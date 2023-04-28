import { getInstance } from "../base/SingleFactory";
import RedDotMgr from "./RedDotMgr";
import { EVENT_RED_DOT_REFRESH } from "./RedDotStaticConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RedDotComponent extends cc.Component {
    // @property({ tooltip: CC_DEV && '红点名称，全局唯一' })
    get dotName() {
        return this._dotName;
    }
    set dotName(v){
        this._dotName = v
        this.refresh()
    }
    private _dotName : string = null;


    get offsetX() {
        return this.node.x;
    }
    set offsetX(v){
        this.node.x = v
    }

    get offsetY() {
        return this.node.y;
    }
    set offsetY(v){
        this.node.y = v
    }

    @property({ type : cc.Label,  tooltip: CC_DEV && '数字文本' })
    numLabel : cc.Label = null

    @property({ type : cc.Sprite, tooltip: CC_DEV && '底图' })
    sprite : cc.Sprite = null

    /** 正常应该直接绑定refresh, 这里是为了区别刷新做了一个动画 */
    protected onLoad(): void {
        cc.director.on(EVENT_RED_DOT_REFRESH, this.doAction.bind(this), this)
        // cc.director.on(EVENT_RED_DOT_REFRESH, this.refresh.bind(this), this)
    }

    protected onDestroy(): void {
        cc.director.off(EVENT_RED_DOT_REFRESH, this.doAction.bind(this), this)
        // cc.director.off(EVENT_RED_DOT_REFRESH, this.refresh.bind(this), this)
    }

    refresh(){
        let redDot = getInstance(RedDotMgr).getNodeByName(this.dotName)
        let show = false, num = 0
        if (redDot) {
            [show, num] = redDot.getResult()
        }
        this.numLabel.string = num.toString()
        this.node.active = show
    }

    doAction(){
        let redDot = getInstance(RedDotMgr).getNodeByName(this.dotName)
        let show = false, num = 0
        if (redDot) {
            [show, num] = redDot.getResult()
        }
        let str = num.toString()

        if (str != this.numLabel.string) {
            this.node.scale = 1
            cc.tween(this.node)
                .to(0.2, {scaleX: 0})
                .call(() => {
                    this.refresh()
                }).to(0.2, {scaleX: 1}).start()
        } else {
            this.refresh()
        }
    }
}
