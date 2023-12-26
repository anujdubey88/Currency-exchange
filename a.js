const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector(" form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(currcod in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currcod;
        newoption.value=currcod;
        if(select.name==="from" && currcod==="USD"){
            newoption.selected="selected";
        }
        if(select.name==="to" && currcod==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}
const updateflag = (ele)=>{
    let currcod=ele.value;
    let countrycod=countryList[currcod];
    let newsrc=`https://flagsapi.com/${countrycod}/flat/64.png`;
    let img=ele.parentElement.querySelector("img");
    img.src=newsrc;
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value=1;
    }
    const url=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    let finalamt=amtval*rate;
    msg.innerText= `${amtval} ${fromCurr.value} = ${finalamt} ${toCurr.value}`
})