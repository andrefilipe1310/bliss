

//o any é pra deixar em geral, pra usar com diferentes tipos de array
export function AlphabeticaSortArray (data: Array<any>):Array<any> | String{

    //verifica se tem os atributos
    const hasNameOrTitleProp = data.every(item => 'name' in item || 'title' in item);

    if (hasNameOrTitleProp){
        //o any é pra deixar em geral, pra usar com diferentes tipos de array
        const newData = data.sort((a:any, b:any) =>  a.name.localeCompare(b.name) || a.title.localeCompare(b.title) )
        return newData
    }
    else{
        return "error: nome ou título não especificado"
    }
}

export function formatNumberToR$(value: number):String {
    return value.toLocaleString('pt-BR'); 
  };