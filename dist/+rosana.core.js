/**
 * Creates and initializes the main application with a root component.
 */
export const $createApp = function (mainComponent) {
    const app = {
        _rootComponent: mainComponent,
        _plugins: [],
        /**
         * Mounts the main component to a DOM element identified by the selector.
         */
        mount: function (selector) {
            const container = document.querySelector(selector);
            if (!container) {
                console.error(`No element found for selector "${selector}"`);
                return this;
            }
            document.body.style.margin = "0";
            document.body.style.width = "100%";
            container.innerHTML = "";
            const instance = this._rootComponent;
            if (instance && instance.element) {
                container.appendChild(instance.element);
            }
            else {
                console.error("Main component does not have an element property.");
            }
            //@ts-ignore
            if (this.router) {
                //@ts-ignore
                this.router.init();
            }
            return this;
        },
        /**
         * Adds a plugin to the application
         */
        //@ts-ignore
        use: function (plugin) {
            if (plugin && typeof plugin.install === "function") {
                plugin.install(this);
                //@ts-ignore
                this._plugins.push(plugin);
            }
            else {
                console.warn("Plugin is missing install method:", plugin);
            }
            return this;
        },
    };
    return app;
};
