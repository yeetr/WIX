(function(){
    let scale = 0.65;
    let se = document.querySelector(".scale");
    var wa = ""+Math.round(scale*100);
    wa.replace("0.", "")
    wa.replace(".", "")
    wa += "%";
    se.innerText = wa;
    let app = document.getElementById("app");
    app.style.padding = "0px";
    app.style.color = "#000000";
    app.style.top = "0";
    app.style.left = "0";
    app.style.background = "white";
    let selected = app;
    var oposX = 0;
    var oposY = 0;
    const vals = document.querySelectorAll(".pv");
    const colors = document.querySelectorAll(".boxe");
    const coloris = document.querySelectorAll(".c");
    selected.classList.add("selected");
    vals[0].value = selected.style.padding;
    vals[1].value = selected.style.color;
    vals[2].value = selected.style.left;
    vals[3].value = selected.style.top;
    vals[4].value = selected.style.fontSize;
    vals[5].value = selected.style.background;
    setInterval(() => {
        selected.style.padding = vals[0].value;
        selected.style.color = vals[1].value;
        selected.style.left = vals[2].value;
        selected.style.top = vals[3].value;
        selected.style.fontSize = vals[4].value;
        selected.style.background = vals[5].value;
    })

    const scaleUp = () => {
        if (scale > 4.95) return;
        oposX = 0;
        oposY = 0;
        scale+=0.05;
        app.style.transform = `scale(${scale})`;
        var w = ""+Math.round(scale*100);
        w.replace("0.", "")
        w.replace(".", "")
        w+= "%";
        se.innerText = w;
    }
    const scaleDown = () => {
        if (scale < 0.1) return;        
        oposX = 0;
        oposY = 0;
        scale-=0.05;
        app.style.transform = `scale(${scale})`;
        var w = ""+Math.round(scale*100);
        w.replace("0.", "")
        w.replace(".", "")
        w+= "%";
        se.innerText = w;
    }
    
    addEventListener("wheel", (e) => {
        if (e.wheelDelta >=0 && e.shiftKey) scaleUp()
        if (e.wheelDelta < 0 && e.shiftKey) scaleDown()
    });

    addEventListener("mousedown", (e) => {
        let posx = e.pageX;
        let posy = e.pageY;
    
        if (e.button == 1) {
            document.body.style.cursor = "grab";
            const handlemove = (ev) => {
                app.style.transform = `translateX(${(ev.pageX-posx+oposX)}px) translateY(${(ev.pageY-posy+oposY)}px) scale(${scale})`
    
            }
            addEventListener("mousemove", handlemove); 
            
            onmouseup = (eve) => {
                if (eve.button == 1) {
                    document.body.style.cursor = "default";
                    oposX = parseInt(getComputedStyle(app, null).transform.split(", ")[4]);
                    oposY = parseInt(getComputedStyle(app, null).transform.split(", ")[5]);
                    removeEventListener("mousemove", handlemove);
                }
            }
    
        }
    })
    const elements = document.querySelectorAll(".ec");
    elements.forEach((e, i) => {
        e.addEventListener("click", () => {
            const ele = app.appendChild(document.createElement((`${e.children[0].nodeName}`)));
            ele.innerText = e.innerText;
            ele.style.position = "absolute";
            ele.style.margin = "0";
            ele.style.color = "#000000";
            ele.style.padding = "0";
            ele.addEventListener("mousedown", (event) => {
                if (event.button == 0) {
                    selected.classList.remove("selected");
                    ele.classList.add("selected");
                    selected = ele;

                    vals[0].value = selected.style.padding;
                    vals[1].value = selected.style.color;
                    vals[2].value = selected.style.left;
                    vals[3].value = selected.style.top;
                    vals[4].value = selected.style.fontSize;
                    vals[5].value = selected.style.background;
                    if (event.shiftKey) {
                        const move = (e) => {
                            ele.style.userSelect = "none"
                            document.body.style.cursor = "none"
                            ele.style.left = Math.round((e.pageX-ele.clientWidth/2)/20)*20+"px"
                            ele.style.top = Math.round((e.pageY-ele.clientHeight/2)/10)*10+"px"
                            vals[2].value = selected.style.left;
                            vals[3].value = selected.style.top;
                        }
                        addEventListener("mousemove", move)
                        onmouseup = () => {
                            ele.style.userSelect = "auto"
                            document.body.style.cursor = "default"
                            removeEventListener("mousemove", move)
                        };
                    };
                };
                ele.addEventListener("dblclick", (e) => {
                    if (e.shiftKey) return;
                    ele.setAttribute("contenteditable", true);
                })
                setInterval(() => {
                    if (selected != ele) ele.removeAttribute("contenteditable");
                }, 1000);
            });
        });
    });

    colors.forEach((color, i) => {
        colors[0].style.background = "#3dcfff"
        colors[1].style.background = "#191919"
        colors[2].style.background = "#faffd1"
        colors[3].style.background = "#ff3d3d"
        coloris[i].value = color.style.background;
        coloris[i].onchange = () => {
            color.style.background = coloris[i].value;
        }
        color.addEventListener("click", (e) => {
            if (selected == app && i !== 2) {
                const colorbox = app.appendChild(document.createElement("div"));
                colorbox.style.background = color.style.background;
                colorbox.style.width = "100px";
                colorbox.style.height = "100px";
                colorbox.style.position = "absolute";
                colorbox.addEventListener("mousedown", (event) => {
                    if (event.button !== 0) return;
                    selected.classList.remove("selected");
                    colorbox.classList.add("selected");
                    selected = colorbox;
                    vals[0].value = colorbox.style.padding;
                    vals[1].value = colorbox.style.color;
                    vals[2].value = colorbox.style.left;
                    vals[3].value = colorbox.style.top;
                    vals[4].value = colorbox.style.fontSize;
                    vals[5].value = colorbox.style.background;
                    if (event.shiftKey) {
                        const move = (e) => {
                            colorbox.style.userSelect = "none"
                            document.body.style.cursor = "none"
                            colorbox.style.left = Math.round((e.pageX-colorbox.clientWidth/2)/20)*20+"px"
                            colorbox.style.top = Math.round((e.pageY-colorbox.clientHeight/2)/10)*10+"px"
                            vals[2].value = selected.style.left;
                            vals[3].value = selected.style.top;
                        }
                        addEventListener("mousemove", move)
                        onmouseup = () => {
                            colorbox.style.userSelect = "auto"
                            document.body.style.cursor = "default"
                            removeEventListener("mousemove", move)
                        };
                    };
                });
            } else if (i == 2) {
                vals[5].value = color.style.background;
            } else if(selected != app) {
                vals[1].value = color.style.background;
            }
        })
    })
    

    app.addEventListener("mousedown", (e) => {
        selected.classList.remove("selected");
        selected = app;
        selected.classList.add("selected");
        vals[0].value = selected.style.padding;
        vals[1].value = selected.style.color;
        vals[2].value = selected.style.left;
        vals[4].value = selected.style.fontSize;
        vals[5].value = selected.style.background;
    }, true);
})();
