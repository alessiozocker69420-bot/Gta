(function(){
"use strict";
function parts(ms){var s=Math.max(0,Math.floor(ms/1000));return{d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),s:s%60,done:ms<=0};}
function pad(n,l){n=String(n);while(n.length<l)n="0"+n;return n;}
function tick(now){document.querySelectorAll(".cd[data-t]").forEach(function(el){
var p=parts(new Date(el.dataset.t).getTime()-now);
if(p.done){el.innerHTML='<strong>Jetzt verfügbar!</strong>';return;}
var v={d:p.d,h:pad(p.h,2),m:pad(p.m,2),s:pad(p.s,2)};
Object.keys(v).forEach(function(k){var b=el.querySelector('[data-u="'+k+'"]');if(b&&b.textContent!==String(v[k])){b.textContent=v[k];b.classList.remove("tick");void b.offsetWidth;b.classList.add("tick");}});});}
if(typeof window!=="undefined"){
tick(Date.now());setInterval(function(){tick(Date.now());},1000);
window.addEventListener("load",function(){document.getElementById("loader").classList.add("off");});
setTimeout(function(){var l=document.getElementById("loader");if(l)l.classList.add("off");},2500);
document.querySelectorAll(".arrow").forEach(function(a){a.addEventListener("click",function(){
var p=document.getElementById(a.getAttribute("aria-controls")),o=a.getAttribute("aria-expanded")==="true";
a.setAttribute("aria-expanded",String(!o));p.hidden=o;if(!o)p.scrollIntoView({behavior:"smooth",block:"start"});});});
document.querySelectorAll(".trailer button").forEach(function(b){b.addEventListener("click",function(){
var f=document.createElement("iframe");f.src="https://www.youtube-nocookie.com/embed/"+b.dataset.id+"?autoplay=1&rel=0";
f.title=b.dataset.title;f.allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen";f.allowFullscreen=true;b.replaceWith(f);});});}
if(typeof module!=="undefined")module.exports={parts:parts};
})();
(function(){
if(typeof document==="undefined")return;
document.querySelectorAll(".hero").forEach(function(h){var d=document.createElement("div");d.className="bg";d.style.backgroundImage=getComputedStyle(h).getPropertyValue("--bg-img")||"";h.prepend(d);});
document.querySelector("#gta .bg").style.backgroundImage="url(assets/hero-gta.svg)";
document.querySelector("#doom .bg").style.backgroundImage="url(assets/hero-doom.svg)";
var bar=document.getElementById("bar"),bgs=document.querySelectorAll(".hero .bg"),nl=document.querySelectorAll(".nl"),secs=[document.getElementById("gta"),document.getElementById("doom")];
var red=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function onScroll(){var y=window.scrollY,H=document.documentElement.scrollHeight-innerHeight;bar.style.width=(H>0?y/H*100:0)+"%";
if(!red)bgs.forEach(function(b){var r=b.parentNode.getBoundingClientRect();b.style.transform="translateY("+(-r.top*.15)+"px)";});
var cur=-1;secs.forEach(function(s,i){var r=s.getBoundingClientRect();if(r.top<innerHeight*.5)cur=i;});
nl.forEach(function(n,i){n.classList.toggle("on",i===cur);});}
addEventListener("scroll",onScroll,{passive:true});onScroll();
})();
