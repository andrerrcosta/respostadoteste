import { Px } from "./formatters.module";

export class FakeProcess {

    message = "Processing";
    image = undefined;

    constructor(message, image) {
        this.message = message;
        this.image = image;
    }

    process() {

        let body = document.getElementsByTagName("body")[0];

        let loader = document.createElement("div");
        loader.id = "fake-process"
        loader.style.position = "absolute";
        loader.style.top = Px(window.scrollY);
        loader.style.left = "50%";
        loader.style.width = "60%";
        loader.style.height = Px(innerHeight - innerHeight / 2);
        loader.style.background = "#fff";
        loader.style.transform = "translate(-50%, 50%)";
        loader.style.border = "1px solid #e5e5e5";
        loader.style.borderRadius = Px(15);
        loader.style.boxShadow = "0px 1px 15px 1px rgba(69, 65, 78, 0.08)";
        loader.style.zIndex = "30";
        loader.style.minWidth = Px(250);
        loader.style.minHeight = Px(250);
        loader.style.display = "flex";
        loader.style.flexDirection = "column";
        loader.style.justifyContent = "center";
        loader.style.alignItems = "center";
        loader.innerText = this.message;

        let img = document.createElement("img");
        img.src = this.image;
        img.style.width = Px(60);
        img.style.height = Px(60);
        img.style.margin = Px(15);

        loader.appendChild(img);

        body.style.overflow = "hidden";

        // console.log("appending");

        body.appendChild(loader);
    }

    onSuccess(message) {
        setTimeout(() => {


            let loader = document.getElementById("fake-process");
            loader.innerText = message;

            let button = document.createElement("div");
            button.style.cssText = "background: blue; border-radius: 5px; margin: 5px; padding: 7px 14px; color: white; cursor: pointer";
            button.innerText = "Fechar";
            button.addEventListener("click", () => {
                loader.outerHTML = "";
                let body = document.getElementsByTagName("body")[0];
                body.style.overflow = "unset";
            });

            loader.appendChild(button);
        }, 3000);

    }

    onError(message) {
        setTimeout(() => {
            let loader = document.getElementById("fake-process");
            loader.innerText = message;
            let button = document.createElement("div");
            button.style.cssText = "background: blue; border-radius: 5px; margin: 5px; padding: 7px 14px; color: white; cursor: pointer";
            button.innerText = "Fechar";
            button.addEventListener("click", () => {
                loader.outerHTML = "";
                let body = document.getElementsByTagName("body")[0];
                body.style.overflow = "unset";
            });
            loader.appendChild(button);
        }, 3000);
    }

    /**
     * Creating fake sender
     */

}