export default function searchContactsFilter(keyword , data ,callback ){
    if(keyword.includes(":")){
        console.log("trigger regex search")
    }
    const newData = data.filter(d=> {
        if(keyword.trim() == ""){
            return data
        }
        console.log(d)
        console.log("dddddd")
        return d.customer_name.toLowerCase().includes(keyword)
    })
    callback(newData)
}