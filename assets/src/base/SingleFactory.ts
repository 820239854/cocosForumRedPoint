/** 为类添加单例对象 */
export function singleClass(target: any) {
    // target is class constructor
    target.prototype.constructor.instance = new target();
}

interface InstanceClass<T> {
    new(): T;
}

/** 获取单例 */
export function getInstance<T>(cls: InstanceClass<T>): T {
    return cls.prototype.constructor.instance;
}

// 示例
@singleClass
class Person {
    tid: string = "12"
    constructor() { }
}

class People {
    tid: string = "12"
    constructor() { }
}

getInstance<Person>(Person);