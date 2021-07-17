


let str =  prompt("Question")
let arr = [];
    for( let i=0;i<str.length;i++)
    {
        if(str[i]=='(' )
        {
            arr.push('(');
        }
        else if (str[i]==')')
        {
          arr.push(')');
        }

    }
      
        console.log(arr);
        for( let i=0;i< arr.length;i++)
        {
            if(arr[i]!=arr[i+1])
            {
               arr.pop();
               arr.pop();
            }
            

        }
        if(arr.length!=0)
        {
     while(arr.length!=0)    {   
for (let i = 0; i < arr.length; i++) {
    if (arr[i] != arr[i + 1]) {
        arr.pop();
        arr.pop();
    }
}
     }
        }
        if(arr.length!=0) {{
            console.log(true);
        }}

        
        if(arr.length!=0)
        {
            return 1;
        }
        else{
            return 0;
        }
    