let bags= 5;
let balls= 6;
let arr=[9,4,6,2,3];
let narr=[];
for(let i=0;i<arr.length;i++)
{
    if(arr[i]<6)
    {
   narr.push(arr[i])
    }
}
let sum=0;
for(let i=0;i<narr.length;i++){
     let t= 6-narr[i];
     sum=sum+t;
}
console.log(sum);