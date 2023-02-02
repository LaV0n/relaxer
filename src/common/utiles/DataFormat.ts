export const DataFormat=(data:string)=>{
    const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    let result=data.split('-').reverse()
    return `${result[0]} ${months[+result[1]-1]} ${result[2]}`
}