export async function formHandle(form, FormItem, methodType='POST', ID){
    const { callBack, formName } = form;
    let url;
    let options;
    let WebUrl = ''
    if(process.env.REACT_APP_CALLBACK_PREFIX){
         WebUrl = process.env.REACT_APP_CALLBACK_PREFIX;
    }
    console.log(process.env)
    if(methodType === 'POST'){
        let forms = new FormData(FormItem);
        forms.append('Token', localStorage.getItem('Token'));
        forms.append(formName, '');

        options = {
            method: methodType,
            body: forms
        }
        
    }else{
        let FormOut = {};
        for (let i = 0; i < FormItem.length; i++) {
            const item = FormItem[i];            
            FormOut[item.name] = item.value;
        }

        const token = localStorage.getItem('Token');
        FormOut['Token'] = token;

        options = {
            method: methodType,
            headers:{
            'Content-Type': '"application/x-form-urlencoded"'
            },
            body: JSON.stringify(FormOut)
        }
    }
    
    if(ID){
         url = WebUrl+callBack+'/'+ID
    }else{
         url = WebUrl+callBack
    }
    const res = await fetch(url, options);
    
    const Response = await res.json();
    return Response
    
}