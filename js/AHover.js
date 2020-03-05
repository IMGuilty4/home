/* 
 * AHover plugin
 * Version: 1.0
 * Author: Anar [Joko(Pain)] Latifov
 * Site: a-dream.dev
 * GitHub: 
 * 
 * Description:
 *
 * 
 * 
 */
class Ahover {
    /*
     * @var
     *  $container  - elemets container
     *  $hoverOver  - over elemet
     *  $elements   - container`s child hover detect elements
     *  
     */
    constructor(options = {}) {

        //Default settings
        this.settings = {
            container: null,
            elements: null,
            selected: null,
            hover: {
                type: "solid", //underline, gliph, solid, bordered
                lineHeight: "2px",
                lineColor: "brown",
                dynamicColor: false,
                borderWidth: "1px",
                borderColor: "#212121",
                glyph: null,
                glyphFamily: null,
                animation: "jelly", //jelly, standart
                bgColor: null,
                extraClass: " ",
                timingFunc: "ease",
                transTime: ".5s",
            }
        }

        this._hoverNow = null
        // Getting user`s settings 
            this.settings = {...this.settings, ...options, hover: {...this.settings.hover, ...options.hover}}


        // Setting up container
            this.container = this._stringOrObj(this.settings.container)
            this._containerSetup()

        // Getting all subelements
            this.elements = (this.settings.elements === null ) ? this.container.children : this.container.querySelectorAll(this.settings.elements)
                /* console.log(this.elements); */
                
            this._offset = this.elements[0].offsetLeft
        // Looking for selected element
            this.selected = (this.settings.selected !== null) 
                ? this._stringOrObj(this.settings.selected) : this.elements[0]
            
            

        // Setting up hover element (hoverOver)
            this.hoverOver = document.createElement("div");
            let styles = this._cssBuilder("", this.settings.hover)
            this.hoverOver = this._cssAdd(this.hoverOver, styles)
            this._hoverSetup(this.container, this.hoverOver, this.settings.hover)
         
            this._elementsSetup(this.elements)


        this._setSelected(this.selected)()
        
        
        /* Need TO FIX IT!!!! */
         setTimeout(() => {

                this._onSelected(this.selected)()
            }, 200)
      

    
        
        
    }


    /* Util. methods */
    _stringOrObj = (element) => {
        let obj;
            if (typeof element === "string") {
                obj = document.querySelectorAll(element)[0];
            }
            else if (typeof element === "object") {
                obj = element  
            }
        return obj;
    }

    _cssBuilder = (type, settings) => {
        switch (type) {
            case "solid":
                return {
                    height: "100%",
                    top: "0px",
                    left: "0px",
                    backgroundColor: settings.bgColor,
                }
            case "underline":
                return {
                    height: settings.lineHeight,
                    backgroundColor: settings.bgColor,
                    left: "0px",
                    bottom: "0px",  
                    borderRadius: "10px" 
                }
            case "bordered": 
                return {
                    height: "100%",
                    backgroundColor: settings.bgColor,
                    border: `${settings.borderWidth} solid ${settings.borderColor}`,
                    left: "0px",
                    bottom: "0px",
                }
            case "glyph":
                return {
                    height: "100%",
                    left: "0px",
                    bottom: "0px",    
                }
            default:
                return {
                    display: "inline-block",
                    position: "absolute",
                    zIndex: "1",
                    transition: `all ${settings.transTime} ${settings.timingFunc}`,
                }
        }
    }

    _cssAdd = (element, styles) => {
        Object.assign(element.style, styles)
        return element
    }

    _glyphStyler = (glyph, glyphFamily) => {
        let style;
        if (document.querySelectorAll("style")[0]){
            style = document.querySelectorAll("style")[0]
        }
        else
        {
            style = document.createElement('style');
        }
        let empty = ["unset", "unset"]
        let fam = (glyphFamily) ? glyphFamily.split("|") : empty
        console.log(fam);
        
        let classID = Math.floor(Math.random() * 1001)
        style.innerHTML = `
        ${style.innerHTML}
        .AHover-el.glyph-${classID}::before {
            content: "\\${glyph}";
            font-family: "${fam[0]}";
            font-weight: ${fam[1]};
            position: absolute;
            left: 5px;
            top: 50%;
            transform: translateY(-50%);
        }
        `;
        document.head.appendChild(style);
        return `glyph-${classID}`
    }

    /* ========= */


    /* Container methods */
    _containerSetup = () => {
        this.container.style.cssText = `
            position: relative;
            `

    }
    /* ========= */

    /* Elements methods */

    _elementsSetup = (elements) => {

        let els = elements;

        for (let i = 0; i < els.length; i++) {
            
            els[i].dataset.id = i
            if (!("disabled" in els[i].dataset)){
                if ("hassub" in els[i].dataset){
                    // console.log(els[i].dataset.hussub);
                    this._cssAdd(els[i], {
                        position: "relative"
                    })
                    let subCont = els[i].querySelectorAll(els[i].dataset.hassub)[0]
                        this._subElemetsSetup(subCont)
                }
                els[i].addEventListener("mouseover", this._hoverPos("mouseover", els[i], this.hoverOver));
                els[i].addEventListener("mouseleave", this._hoverPos("mouseleave", els[i], this.hoverOver));
                els[i].addEventListener("click", this._onSelected(els[i]));
            }
        }

    }

    _subElemetsSetup = (subCont) => {
        this._cssAdd(subCont, {
            position: "absolute",
            right: "0px",
            bottom: "-100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start"

        })
        let subEls = subCont.children
        for (let subI = 0; subI < subEls.length; subI++) {
            console.log(subEls[subI]);
            
            
        }
    }


    /* ========= */

    /* Selected methods*/
        /* Private */
    _getSelected = () => {
        return this.selected
    }

    _setSelected = (el) => () => {
        this.elements.forEach((els) => {
           if (els.dataset.id === el.dataset.id) {
               
            els.classList.add("AHover-selected")
            this.selected = el;
              
           }
           else{
            els.classList.remove("AHover-selected")
           }

        });

        
    }

    _getSelectedData = (selected) => {
        let obj = {
            y: selected.offsetTop,
            x: selected.offsetLeft,
            width: selected.offsetWidth,
            height: selected.offsetheight
        }    
        return obj
    }

    _onSelected = (el) => () => {
        this._setSelected(el)()
        this._hoverPos("select", el, this.hoverOver)()
    }
        /* Public */
    getSelected = () => {
        return this._getSelected()
    }

    setSelected = (el) => {
         this._onSelected(el)()
    }
    /* ========= */

    /* HoverOver methods */
        /* Private */
    _hoverSetup(container, hoverOver, settings) {
            let {y, x, width, height} = this._getSelectedData(this._getSelected())
                hoverOver.classList.add("AHover-el");
                if(settings.type) {
                    let styles = this._cssBuilder(settings.type, settings)
                    this._cssAdd(hoverOver, styles)
                    if (settings.type === "glyph") {
                        
                        
                        hoverOver.classList.add(this._glyphStyler(settings.glyph, settings.glyphFamily))
                    }
                }
                    this._cssAdd(hoverOver, {
                        width: `${width}px`,
                        height: `${height}px`,
                        transform: `translate(${x}px, ${y}px)` 
                    })
                    this._hoverExtraClasses(hoverOver, settings);
            container.appendChild(hoverOver)
    }

    _hoverExtraClasses = (hoverOver, settings) => {
        if (settings.extraClass.indexOf(" ") && settings.extraClass !== null) {
            let clasess = settings.extraClass.split(" ");
            clasess.forEach((c) => {
                hoverOver.classList.add(c); 
            })
        }
        else if (!settings.extraClass.indexOf(" ") && settings.extraClass !== null) {
            hoverOver.classList.add(extraClasses)
        }
    } 

    _setHoverNow = (el) => {
        this.elements.forEach((els) => {
            if (el.dataset.id === els.dataset.id) {
                els.classList.add("AHover-now")
                this._hoverNow = els;
            }
            else {
                els.classList.remove("AHover-now")
            }
        });
    }

    _getHoverNow = () => {
        return this._hoverNow;
    }

    _setHoverPrev = (el) => {
        this.elements.forEach((els) => {
            if (el.dataset.id === els.dataset.id) {
                els.classList.add("AHover-prev")
                this._hoverPrev = els;
            }
            else {
                els.classList.remove("AHover-prev")
            }
        });
    }

    _getHoverPrev = () => {
        return this._hoverPrev;
    }

    _hoverPos = (mode, el, hoverOver) => () => {

        if (mode === "mouseover"){
            this._setHoverNow(el)
            let color = (this.settings.hover.dynamicColor && el.dataset.color) ? el.dataset.color : this.settings.hover.bgColor;
            let height = (this.settings.hover.type !== "underline") ? el.offsetHeight : this.settings.hover.lineHeight
            let {x, y} = { x: el.offsetLeft, y: el.offsetTop}
            this._cssAdd(hoverOver, {
                backgroundColor: color,
                transform: `translate(${x}px, ${y}px)`,
                width: `${el.offsetWidth}px`,
                height: `${height}px`
            })

        }
        else if (mode === "mouseleave" || mode === "select") {
            this._setHoverNow(this._getSelected())
            this._setHoverPrev(el)
            let selected = this._getSelected()
            let {y, x, width, height} = this._getSelectedData(selected)
            let color = (this.settings.hover.dynamicColor && selected.dataset.color) ? selected.dataset.color : this.settings.hover.bgColor;
            height = (this.settings.hover.type !== "underline") ? height : this.settings.hover.lineHeight  
            this._cssAdd(hoverOver, {
                backgroundColor: color,
                transform: `translate(${x}px, ${y}px)`,
                width: `${width}px`,
                height: `${height}px`
            })

        }
        
    }

        /* Public */
    getHoverEl = () => {
        return this.hoverOver;
    }



    /* ========= */

}