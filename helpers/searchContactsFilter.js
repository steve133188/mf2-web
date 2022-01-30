export default function searchContactsFilter(keyword , data ,callback ){
    if(keyword.includes(":")){
        console.log("trigger regex search")
    }
    const newData = data.filter(d=> {
        if(keyword.trim() == ""){
            return data
        }
        return d.customer_name.toLowerCase().includes(keyword)|| d.customer_id.toString().includes(keyword)
    })
    callback(newData)
}
