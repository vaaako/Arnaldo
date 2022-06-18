v=0
e=0
a=0
c=0
ad=0
cr=0
for(let i=0; i<=100; i++) {
    let rand = Math.floor(Math.random() * 185) + 1;
    if(rand<=5)
        v++
    if(rand<=15)
        e++
    if(rand<=30)
        a++
    if(rand<=47)
        c++
    if(rand<=70)
        ad++
    else
        cr++
}
console.log(v)
console.log(e)
console.log(a)
console.log(c)
console.log(ad)
console.log(cr)