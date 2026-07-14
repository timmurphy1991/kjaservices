document.addEventListener('DOMContentLoaded',()=>{

/*---FADE-IN/SLIDE-IN✅---*/

const observer=new IntersectionObserver(e=>{
e.forEach(t=>{
if(t.isIntersecting){
t.target.classList.add('visible');
observer.unobserve(t.target);
}
});
},{threshold:.3});

document.querySelectorAll('.slide-in,.fade-in,.banner-overlay')
.forEach(e=>observer.observe(e));

/*---VIDEO✅---*/

const banner=document.querySelector('.banner-video');
if(banner)setTimeout(()=>banner.classList.add('loaded'),600);

window.addEventListener('load',()=>{
const v=document.querySelector('.banner-video-native');
if(v)v.load();
});

/*---MOBILE_MENU✅---*/

const toggle=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('.mobile-menu');

toggle?.addEventListener('click',()=>{
toggle.classList.toggle('active');
mobileMenu.classList.toggle('active');
document.body.classList.toggle('menu-open');
});

document.querySelectorAll('.mobile-menu a').forEach(e=>{
e.addEventListener('click',()=>{
toggle?.classList.remove('active');
mobileMenu?.classList.remove('active');
document.body.classList.remove('menu-open');
});
});

document.querySelectorAll('.mobile-dropdown').forEach(drop=>{
drop.querySelector('.mobile-title')?.addEventListener('click',()=>{
document.querySelectorAll('.mobile-dropdown')
.forEach(d=>d!==drop&&d.classList.remove('active'));
drop.classList.toggle('active');
});
});

/*---HEADER✅---*/

const header=document.querySelector('.site-header');
const hero=document.querySelector('.banner');

function updateHeader(){
if(!header)return;
header.classList.toggle('scrolled',window.scrollY>90);
if(hero){
const h=hero.offsetHeight;
header.classList.toggle('is-overlay',window.scrollY<h-90);
}
}

updateHeader();
window.addEventListener('scroll',()=>requestAnimationFrame(updateHeader));

/*---CAROUSEL✅---*/

const slider=document.querySelector('.carousel');
const slides=document.querySelectorAll('.slide');
const next=document.querySelector('.next');
const prev=document.querySelector('.prev');

if(!slider||!slides.length)return;

let i=0,w=0,g=0,auto=null,resume=null;

function size(){
g=parseFloat(getComputedStyle(slider).gap)||0;
w=slides[0].offsetWidth+g;
move(i,false);
}

function move(n,a=true){
i=(n+slides.length)%slides.length;
const x=Math.round(i*w);
slider.style.transition=a?"transform .6s ease":"none";
slider.style.transform=`translate3d(-${x}px,0,0)`;
slides.forEach(s=>s.classList.remove('active'));
slides[i].classList.add('active');
}

function start(){
if(auto)return;
auto=setInterval(()=>move(i+1),3000);
}

function stop(){
clearInterval(auto);
auto=null;
}

function pause(){
stop();
clearTimeout(resume);
resume=setTimeout(start,6000);
}

function inView(){
const r=slider.getBoundingClientRect();
if(r.top<window.innerHeight*.9&&r.bottom>0){
start();
window.removeEventListener('scroll',inView);
}
}

window.addEventListener('scroll',inView);
inView();

next?.addEventListener('click',()=>{move(i+1);pause();});
prev?.addEventListener('click',()=>{move(i-1);pause();});

let t;
window.addEventListener('resize',()=>{
clearTimeout(t);
t=setTimeout(size,100);
});

size();
move(0,false);

});

/*---TESTIMONIALS✅---*/

const testimonialsSection=document.querySelector(".testimonials");

if(testimonialsSection){

const testimonials=testimonialsSection.querySelectorAll(".testimonial"),
progress=testimonialsSection.querySelector(".slider-bar"),
prev=testimonialsSection.querySelector(".testimonial-prev"),
next=testimonialsSection.querySelector(".testimonial-next");

let current=0,
interval,
started=false;

const delay=15000;

function restartProgress(){
progress.style.animation="none";
progress.offsetHeight;
progress.style.animation=`progress ${delay/1000}s linear forwards`;
}

function showSlide(index){
testimonials.forEach(slide=>slide.classList.remove("active"));
testimonials[index].classList.add("active");
restartProgress();
}

function startInterval(){
clearInterval(interval);
interval=setInterval(()=>{
current=(current+1)%testimonials.length;
showSlide(current);
},delay);
}

function goTo(index){
current=(index+testimonials.length)%testimonials.length;
showSlide(current);
startInterval();
}

function startTestimonials(){
if(started)return;
started=true;
showSlide(current);
startInterval();
}

next?.addEventListener("click",()=>goTo(current+1));
prev?.addEventListener("click",()=>goTo(current-1));

new IntersectionObserver(entries=>{
if(entries[0].isIntersecting){
startTestimonials();
}
},{threshold:.5}).observe(testimonialsSection);

}

/*---FLOATING_CONTACT✅---*/

window.addEventListener('scroll',()=>document.querySelector('.floating-contact').classList.toggle('visible',window.scrollY>50));

/*---❗❗❗NON_HOME❗❗❗---*/

/*---RANDOMISER✅---*/

document.addEventListener('DOMContentLoaded',()=>{
const images=[
"images/randomiser/01.webp",
"images/randomiser/02.webp",
"images/randomiser/03.webp",
"images/randomiser/04.webp",
"images/randomiser/05.webp",
"images/randomiser/06.webp"
],
el=document.getElementById('crittallRandomImage');
if(!el)return;
const src=images[Math.floor(Math.random()*images.length)],
img=new Image;
img.src=src;
img.onload=()=>{
el.src=src;
el.classList.add('loaded')
}
})

/*---CRITTALL_FEATURE✅---*/

const cards=document.querySelectorAll(".crittall-feature-card");
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.intersectionRatio>.45){entry.target.classList.add("visible")}
else{entry.target.classList.remove("visible")}
});
},{threshold:[0,.25,.5,.75]});
cards.forEach(card=>observer.observe(card));

/*---SEO_RANDOMISER✅---*/

document.addEventListener('DOMContentLoaded',()=>{
const seoImages=[
"images/seo/randomiser/01.webp",
"images/seo/randomiser/02.webp",
"images/seo/randomiser/03.webp",
"images/seo/randomiser/04.webp",
"images/seo/randomiser/05.webp",
"images/seo/randomiser/06.webp"
];
const el=document.getElementById('seoRandomImage');
if(!el)return;
const src=seoImages[Math.floor(Math.random()*seoImages.length)];
const img=new Image();
img.src=src;
img.onload=()=>{
el.src=src;
el.classList.add('loaded');
};
});

/*---DOOR_DESIGNER✅---*/

const grid=document.getElementById("designerGrid"),
buttons=document.querySelectorAll(".filter-btn"),
subFiltersContainer=document.getElementById("subFilters");

if(grid){
let activeCategory="single",activeVariant="all";

const letters="ABCDEFGHIJKLMNOP".split(""),
screens=Array.from({length:10},(_,i)=>`S${i+1}`),
isKickPanel=l=>"IJKLMNOP".includes(l);

const createItem=(category,variant,name,img,subtitle="")=>{
const div=document.createElement("div");
div.className="item";
div.dataset.category=category;
div.dataset.variant=variant;
div.innerHTML=`<div class="img-wrap"><img src="${img}" alt="${name}" loading="lazy"></div><span>${name}</span>${subtitle?`<small>${subtitle}</small>`:""}`;
return div;
};

letters.forEach(l=>{
const variant=isKickPanel(l)?"kick":"nokick";
grid.appendChild(createItem(
"single",variant,`Single Door ${l}`,
`images/door_designer/single_doors/${l}.png`,
variant==="kick"?"Kick Panel":""
));
});

letters.forEach(l=>{
const variant=isKickPanel(l)?"kick":"nokick";
grid.appendChild(createItem(
"double",variant,`Double Door ${l}`,
`images/door_designer/double_doors/${l}.png`,
variant==="kick"?"Kick Panel":""
));
});

screens.forEach((s,i)=>{
const variant=i<5?"single":"double";
grid.appendChild(createItem(
"screens",variant,`Screen ${s}`,
`images/door_designer/screens/${s}.png`,
variant==="single"?"Single Door":"Double Door"
));
});

const items=grid.querySelectorAll(".item");

const buildSubFilters=category=>{
subFiltersContainer.innerHTML="";
let options=[];

if(category==="single"||category==="double"){
options=[
{label:"All",value:"all"},
{label:"Without Kick Panel",value:"nokick"},
{label:"With Kick Panel",value:"kick"}
];
}

if(category==="screens"){
options=[
{label:"All",value:"all"},
{label:"Single Doors",value:"single"},
{label:"Double Doors",value:"double"}
];
}

options.forEach((opt,i)=>{
const btn=document.createElement("button");
btn.className="sub-filter-btn"+(i===0?" active":"");
btn.dataset.variant=opt.value;
btn.textContent=opt.label;

btn.addEventListener("click",()=>{
document.querySelectorAll(".sub-filter-btn")
.forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
activeVariant=opt.value;
applyFilter();
});

subFiltersContainer.appendChild(btn);
});

activeVariant="all";
};

const applyFilter=()=>{
grid.classList.remove("show");

setTimeout(()=>{
items.forEach(item=>{
const matchCategory=item.dataset.category===activeCategory;
const matchVariant=activeVariant==="all"||item.dataset.variant===activeVariant;
item.style.display=(matchCategory&&matchVariant)?"block":"none";
});

grid.classList.toggle("screens-view",activeCategory==="screens");
grid.classList.add("show");
},120);
};

buttons.forEach(btn=>{
btn.addEventListener("click",()=>{
buttons.forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
activeCategory=btn.dataset.filter;
buildSubFilters(activeCategory);
applyFilter();
});
});

buildSubFilters("single");
applyFilter();
grid.classList.add("show");
}

/*---PROJECTS✅---*/

const projects=document.querySelectorAll('.project'),
lightbox=document.querySelector('.lightbox');

if(lightbox&&projects.length){

const lightboxImg=lightbox.querySelector('img'),
lightboxTitle=lightbox.querySelector('.lightbox-title'),
closeBtn=lightbox.querySelector('.lightbox-close'),
prevBtn=lightbox.querySelector('.lightbox-prev'),
nextBtn=lightbox.querySelector('.lightbox-next');

let currentIndex=0;

const openLightbox=i=>{
const p=projects[i],img=p.querySelector('img');
lightboxImg.src=img.dataset.full;
lightboxTitle.textContent=p.querySelector('.project-title').textContent;
lightbox.classList.add('active');
document.body.style.overflow='hidden';
currentIndex=i;
},

closeLightbox=()=>{
lightbox.classList.remove('active');
document.body.style.overflow='';
},

showNext=()=>openLightbox((currentIndex+1)%projects.length),

showPrev=()=>openLightbox((currentIndex-1+projects.length)%projects.length);

projects.forEach((p,i)=>p.addEventListener('click',()=>openLightbox(i)));

closeBtn?.addEventListener('click',closeLightbox);
nextBtn?.addEventListener('click',showNext);
prevBtn?.addEventListener('click',showPrev);

lightbox.addEventListener('click',e=>e.target===lightbox&&closeLightbox());

document.addEventListener('keydown',e=>{
if(e.key==='Escape')closeLightbox();
if(e.key==='ArrowRight')showNext();
if(e.key==='ArrowLeft')showPrev();
});

}