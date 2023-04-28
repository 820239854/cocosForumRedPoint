
/** 红点计算函数的类型 */
export type RedDotCalculateFunc = (param ?: any) => [boolean, number]

/** 红点配置项结构体 */
export interface RedDotConfigItem {
    parent : string
    func ?: RedDotCalculateFunc
    param ?: any
    des ?: string
}

export type RedDotConfigTable = {[key : string] : RedDotConfigItem}

/** 红点的静态配置 */
let RedDotStaticConfig : RedDotConfigTable = {
     child1     : {parent : null}
    ,child1_1   : {parent : "child1"}
    ,child1_2   : {parent : "child1"} //
    ,child1_3   : {parent : "child1"}
    ,child1_4   : {parent : "child1"} //

    ,child1_1_1 : {parent : "child1_1"} //
    ,child1_1_2 : {parent : "child1_1"} //
    ,child1_1_3 : {parent : "child1_1"} //

    ,child1_3_1 : {parent : "child1_3"} //
    ,child1_3_2 : {parent : "child1_3"} //

    ,child2     : {parent : null}
    ,child2_1   : {parent : "child2"} //
    ,child2_2   : {parent : "child2"}
    ,child2_3   : {parent : "child2"} //

    ,child2_2_1 : {parent : "child2_2"} //
    ,child2_2_2 : {parent : "child2_2"} //
}

export let EVENT_RED_DOT_REFRESH = "event_red_dot_refresh"

export default RedDotStaticConfig