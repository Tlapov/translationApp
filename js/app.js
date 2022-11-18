import countries from "./contries.js"

class app {
    constructor(){
        this.countryList = countries.State()
        this.select = document.querySelectorAll("select")
        this.select.forEach( (tag, id) => {
            for(let country in this.countryList){
                let selected = id == 0 ? country == "en-GB" ? "selected" : "" : country == "hr-HR" ? "selected" : "";
                let option = `<option ${selected} value="${country}">${this.countryList[country]}</option>`;
                tag.insertAdjacentHTML("beforeend", option)

            }
        })
        this.textareaFrom = document.querySelector(".textareaFrom")
        this.textareaTo = document.querySelector(".textareaTo")
        this.btn = document.querySelector("button").addEventListener("click", () => {
            this.translate()
        })
        this.changeIcon = document.querySelector(".changeIcon").addEventListener("click", () => {
            this.change()
        });
        this.icons = document.querySelectorAll(".icons i").forEach( (i) => {
            i.addEventListener("click", (e) => {
                this.copyandVolume(e)
            })
        })
    }
    translate(){
        let text = this.textareaFrom.value
        let option1 = this.select[0].value
        let option2 = this.select[1].value
        console.log(text)
        if(!text) return;
        this.textareaTo.setAttribute("placeholder", "prijevod u tijeku....")

        let restApi = `https://api.mymemory.translated.net/get?q=${text}&langpair=${option1}|${option2}`
        fetch(restApi).then(res => res.json()).then(data => {
            this.textareaTo.value = data.responseData.translatedText
        })
    }
    change(){
        let text = this.textareaFrom.value
        let option = this.select[0].value
        this.textareaFrom.value = this.textareaTo.value
        this.textareaTo.value = text
        this.select[0].value = this.select[1].value
        this.select[1].value = option
    }
    copyandVolume(e){
        let targetElement = e.target
        if(targetElement.classList.contains("fa-copy")){
            if(targetElement.id == "iconsFrom"){
                navigator.clipboard.writeText(this.textareaFrom.value)
            }
            else{
                navigator.clipboard.writeText(this.textareaTo.value)
            }
        }else{
            let speak;
            if(targetElement.id == "iconsFrom"){
                speak = new SpeechSynthesisUtterance(this.textareaFrom.value)
                speak.lang = this.select[0].value 
            }else{
                speak = new SpeechSynthesisUtterance(this.textareaTo.value)
                speak.lang = this.select[1].value 
            }
            speechSynthesis.speak(speak)
        }
    }

}

let TransletedApp = new app()



