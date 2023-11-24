/**
 * IOC容器和依赖注入是一起聊的，是OOP开发模式中非常关键的一环
 *
 * 理念：一个A类如果以来另外的一个B类，不应该由A类去new B类，这样A类需要去处理B类的整个生命周期，如创建，销毁等
 * 这种情况下，依赖注入模式应运而生，其理念是：A类只需要去声明自己需要B类，由ICO容器去管理所有的类以及其生命周期
 *
 *
 * 比如说Vue中，其实也是依赖注入模式的体现，我们声明了一个组件，Vue框架会管理所有的组件，开发的时候只需要import组件即可
 */

class IOCContainer {
    constructor() {
        this.instanceMap = new Map();
        this.configMap = new Map();
    }

    register(classCons, option = {}) {
        if (
            typeof classCons === 'function' &&
            (classCons.name !== '' || classCons.name !== 'anonymous')
        ) {
            const lazy = option.lazy ?? true;
            const single = option.single ?? true;
            const functionName = classCons.name;
            this.configMap.set(functionName, {
                cons: classCons,
                lazy,
                single
            });

            if (!lazy) {
                this.instanceMap.set(functionName, new classCons());
            }
            return;
        }
        throw new Error('please check class constructor!');
    }

    get(name) {
        if (!this.configMap.has(name)) {
            throw new Error('please check function name!');
        }
        const config = this.configMap.get(name);
        // 多例的情况下直接返回了实例类
        if (!config.single) {
            return new config.cons();
        }
        // 单例下的缓存
        if (this.instanceMap.has(name)) {
            return this.instanceMap.get(name);
        }

        // 创建并返回
        const ins = new config.cons();
        this.instanceMap.set(name, ins);
        return ins;
    }

    clear() {
        this.instanceMap.clear();
    }
}
