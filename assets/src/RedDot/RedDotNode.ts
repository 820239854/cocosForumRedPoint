import { RedDotCalculateFunc } from "./RedDotStaticConfig"

/** 红点树的一个结点 */
export default class RedDotNode {
    name : string = null    // 结点名称
    parent : RedDotNode = null
    children : Map<string, RedDotNode> = new Map()

    showRedPoint    : boolean = null
    redPointCount   : number = null
    calculateFunc   : RedDotCalculateFunc = null
    calculateParam  : any = null

    
    constructor(name : string) {
        this.name = name
    }

    getDepth() : number{
        if (this.parent) {
            return this.parent.getDepth() + 1
        } else {
            return 0
        }
    }

    /** 设置父结点 */
    setParent(parent : RedDotNode){
        let old = this.parent
        if(old){
            old.removeChild(this)
        }
        this.parent = parent
    }

    /** 增加子结点 */
    addChild(node : RedDotNode){
        if(node){
            if(!this.children.has(node.name)) {
                node.setParent(this)
                this.children.set(node.name, node)
            } else {
                // console.error("重复")
            }
        }
    }

    /** 移除子结点 */
    removeChild(node : RedDotNode){
        if(node && this.children.has(node.name)){
            this.children.delete(node.name)
        }
    }

    /** 设置红点计算方法 */
    setCalculateFunc(func : RedDotCalculateFunc){
        if(typeof func == "function"){
            this.calculateFunc = func
        }
    }

    /** 设置红点计算方法需要的参数 */
    setCalculateParam(param : any){
        if(typeof param != "undefined" && param != null){
            this.calculateParam = param
        }
    }

    /** 清除计算结果 */
    clearResult(){
        this.showRedPoint = null
        this.redPointCount = null
    }

    /** 清除所有子结点的计算结果 */
    clearResult_Children(){
        this.clearResult()
        this.children.forEach(child => {
            child.clearResult_Children()
        })
    }

    /** 清除所有父结点的计算结果 */
    clearResult_Parent(){
        this.clearResult()
        let parent = this.parent
        if(parent){
            parent.clearResult_Parent()
        }
    }

    /** 获取计算结果 */
    getResult() : [boolean, number]{
        if(this.showRedPoint == null || this.redPointCount == null){
            if(typeof this.calculateFunc == "function"){
                [this.showRedPoint, this.redPointCount] = this.calculateFunc(this.calculateParam)
            } else {
                let num = 0
                this.children.forEach(child => {
                    let [temp_show, temp_num] = child.getResult()
                    if(temp_show){
                        num += temp_num
                    }
                })
                this.showRedPoint = num > 0
                this.redPointCount = num 
            }
        }

        return [this.showRedPoint, this.redPointCount]
    }
}


